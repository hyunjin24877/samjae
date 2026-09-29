(() => {
  const method = document.querySelector('.result-method');
  const icons = [...(method?.querySelectorAll('.method-deco[data-src]') || [])];
  if (method && icons.length) {
    // DOM order follows the steps from top to bottom. Move only decorative
    // images so their random positions use the whole method section.
    icons.forEach(icon => method.append(icon));

    async function playIconsOnce() {
      for (const icon of icons) {
        const loaded = new Promise(resolve => {
          const timer = setTimeout(() => resolve(false), 15000);
          icon.onload = () => { clearTimeout(timer); resolve(true); };
          icon.onerror = () => { clearTimeout(timer); resolve(false); };
        });
        icon.src = icon.dataset.src;
        if (!(await loaded)) {
          icon.hidden = true;
          icon.removeAttribute('src');
          continue;
        }

        const style = getComputedStyle(icon);
        const maxWidth = parseFloat(style.maxWidth) || Infinity;
        const width = Math.min(parseFloat(style.width) || 80, maxWidth, method.clientWidth);
        const height = width * icon.naturalHeight / icon.naturalWidth;
        const rect = method.getBoundingClientRect();
        const heading = method.querySelector('h2');
        const minTop = Math.min(method.clientHeight - height,
          Math.max(heading.offsetTop + heading.offsetHeight, -rect.top + 12, 0));
        const maxTop = Math.max(minTop,
          Math.min(method.clientHeight - height, innerHeight - rect.top - height - 12));
        icon.style.left = `${Math.round(Math.random() * Math.max(0, method.clientWidth - width))}px`;
        icon.style.top = `${Math.round(minTop + Math.random() * (maxTop - minTop))}px`;
        icon.style.right = 'auto';
        icon.style.bottom = 'auto';
        icon.hidden = false;

        // Start the clock after the first frame has a chance to paint.
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => setTimeout(resolve, Number(icon.dataset.loopMs)));
        icon.hidden = true;
        icon.removeAttribute('src');
      }
    }

    const details = method.querySelector('.result-details');
    if ('IntersectionObserver' in window && details) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        playIconsOnce();
      }, { threshold: 0.1 });
      observer.observe(details);
    } else {
      playIconsOnce();
    }
  }

  // 점지법 이름과 실제 영수증 PNG 경로를 연결합니다.
  const receipts = {
    "해안무속공동체": "/samjae/img/result/paper/ocean-shamanism-community.png",
    "산지무속개인": "/samjae/img/result/paper/mountain-shamanism-individual.png",
    "산지종교공동체": "/samjae/img/result/paper/mountain-religion-community.png",
    "산지종교개인": "/samjae/img/result/paper/mountain-religion-individual.png",
    "산지무속공동체": "/samjae/img/result/paper/mountain-shamanism-community.png",
    "해안무속개인": "/samjae/img/result/paper/ocean-shamanism-individual.png",
    "해안종교공동체": "/samjae/img/result/paper/ocean-religion-community.png",
    "해안종교개인": "/samjae/img/result/paper/ocean-religion-individual.png",
    "내륙무속공동체": "/samjae/img/result/paper/inland-shamanism-community.png",
    "내륙무속개인": "/samjae/img/result/paper/inland-shamanism-individual.png",
    "내륙종교공동체": "/samjae/img/result/paper/inland-religion-community.png",
    "내륙종교개인": "/samjae/img/result/paper/inland-religion-individual.png"
};
  const printButton = document.getElementById('resultPrint');
  const type = document.body.dataset.receiptType;
  const source = receipts[type];
  let receipt;
  let receiptReady;
  if (source) {
    receipt = new Image();
    receiptReady = new Promise((resolve) => {
      receipt.onload = () => resolve(true);
      receipt.onerror = () => resolve(false);
    });
    receipt.src = source;
  }

  function rasterize(image) {
    const width = 576;
    const imageWidth = 540;
    const leftCorrectionDots = 12;
    const offsetX = (width - imageWidth) / 2 - leftCorrectionDots;
    const height = Math.round(image.naturalHeight * imageWidth / image.naturalWidth);
    // 작은 스트립으로 처리하여 브라우저의 긴 캔버스 높이 제한을 피합니다.
    const canvas = document.createElement('canvas');
    canvas.width = width;
    const raster = new Uint8Array(72 * height);
    for (let top = 0; top < height; top += 128) {
      const rows = Math.min(128, height - top);
      canvas.height = rows;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.fillStyle = '#fff';
      context.fillRect(0, 0, width, rows);
      // 실제 출력의 오른쪽 치우침 보정: 래스터 자체에 왼쪽 6dots, 오른쪽 30dots 여백.
      context.drawImage(image, offsetX, -top, imageWidth, height);
      const pixels = context.getImageData(0, 0, width, rows).data;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          if (0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2] < 128) {
            raster[(top + y) * 72 + (x >> 3)] |= 0x80 >> (x & 7);
          }
        }
      }
    }
    // 상단의 완전히 빈 행만 생략합니다. 첫 인쇄 행부터 하단까지는 그대로 전송합니다.
    let firstContentRow = 0;
    while (firstContentRow < height) {
      const start = firstContentRow * 72;
      if (raster.subarray(start, start + 72).some(byte => byte !== 0)) break;
      firstContentRow++;
    }
    return firstContentRow < height ? raster.subarray(firstContentRow * 72) : raster;
  }

  printButton?.addEventListener('click', async () => {
    if (printButton.disabled) return;
    printButton.disabled = true;
    printButton.setAttribute('aria-busy', 'true');
    try {
      if (!source || !(await receiptReady)) {
        alert('영수증 이미지를 불러오지 못했습니다. 페이지를 새로고침한 뒤 다시 출력해 주세요.');
        return;
      }
      const response = await fetch('http://127.0.0.1:8765/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: rasterize(receipt)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '출력 작업 접수 실패');
    } catch (error) {
      console.error('영수증 출력 실패:', error);
      alert('출력 접수를 확인하지 못했습니다. 로컬 출력 서버와 프린터 연결을 확인해 주세요. 중복 출력을 피하려면 프린터 대기열도 확인해 주세요.');
    } finally {
      printButton.disabled = false;
      printButton.removeAttribute('aria-busy');
    }
  });

  document.getElementById('resultRetry')?.addEventListener('click', () => {
    window.resetDiagnosisSession?.();
    location.href = '/samjae/diagnosis.html';
  });
})();
