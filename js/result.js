(() => {
  const method = document.querySelector('.result-method');
  const icons = [...(method?.querySelectorAll('.method-deco[data-src]') || [])];
  const details = method?.querySelector('.result-details');
  if (method && details && icons.length) {
    icons.forEach(icon => method.append(icon));

    function visibleBounds(width, height) {
      if (document.hidden) return null;
      const rect = method.getBoundingClientRect();
      const area = details.getBoundingClientRect();
      const scaleX = rect.width / method.clientWidth;
      const scaleY = rect.height / method.clientHeight;
      if (!(scaleX > 0 && scaleY > 0)) return null;
      const left = (Math.max(area.left, 16) - rect.left) / scaleX;
      const right = (Math.min(area.right, innerWidth - 16) - rect.left) / scaleX;
      const top = (Math.max(area.top, 16) - rect.top) / scaleY;
      const bottom = (Math.min(area.bottom, innerHeight - 16) - rect.top) / scaleY;
      if (right - left < width || bottom - top < height) return null;
      return { left, right: right - width, top, bottom: bottom - height };
    }

    function waitForVisibleSpace(width, height, icon) {
      return new Promise(resolve => {
        function check() {
          const inFlow = getComputedStyle(icon).position === 'static';
          const target = inFlow ? icon.getBoundingClientRect() : null;
          const bounds = inFlow
            ? (target.top >= 0 && target.bottom <= innerHeight ? { left: 0, right: 0, top: 0, bottom: 0 } : null)
            : visibleBounds(width, height);
          if (!bounds) return;
          window.removeEventListener('scroll', check);
          window.removeEventListener('resize', check);
          document.removeEventListener('visibilitychange', check);
          resolve(bounds);
        }
        window.addEventListener('scroll', check, { passive: true });
        window.addEventListener('resize', check);
        document.addEventListener('visibilitychange', check);
        check();
      });
    }

    function loadImage(image, source) {
      return new Promise(resolve => {
        const finish = success => {
          clearTimeout(timer);
          image.onload = image.onerror = null;
          resolve(success);
        };
        const timer = setTimeout(() => finish(false), 15000);
        image.onload = () => finish(image.naturalWidth > 0);
        image.onerror = () => finish(false);
        image.src = source;
      });
    }

    async function prepareIcon(icon) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let previewURL;
      try {
        const response = await fetch(icon.dataset.src, { signal: controller.signal });
        if (!response.ok) throw new Error(`아이콘 로딩 실패: ${response.status}`);
        const blob = await response.blob();
        const preview = new Image();
        previewURL = URL.createObjectURL(blob);
        if (!(await loadImage(preview, previewURL))) return null;
        return { icon, blob, width: preview.naturalWidth, height: preview.naturalHeight };
      } catch (error) {
        console.error('아이콘 준비 오류:', error);
        return null;
      } finally {
        clearTimeout(timeout);
        if (previewURL) URL.revokeObjectURL(previewURL);
      }
    }

    function showIcon(asset, bounds) {
      const { icon, blob } = asset;
      // A fresh resource starts GIF/WebP at frame one instead of revealing
      // an animation that was already running while hidden during preload.
      const source = URL.createObjectURL(blob);
      // Random defaults remain available; each result's CSS can override placement.
      icon.style.setProperty('--motion-random-left', `${bounds.left + Math.random() * (bounds.right - bounds.left)}px`);
      icon.style.setProperty('--motion-random-top', `${bounds.top + Math.random() * (bounds.bottom - bounds.top)}px`);
      icon.removeAttribute('hidden');
      const hide = () => {
        icon.hidden = true;
        icon.removeAttribute('src');
        URL.revokeObjectURL(source);
      };
      loadImage(icon, source).then(loaded => {
        if (!loaded) { hide(); return; }
        const loopMs = Number(icon.dataset.loopMs);
        const fadeMs = Math.min(800, loopMs);
        icon.style.setProperty('--motion-fade-duration', `${fadeMs}ms`);
        setTimeout(() => {
          icon.classList.add('is-fading');
          setTimeout(async () => {
            hide();
            if (!icon.dataset.afterSrc) return;
            icon.classList.remove('is-fading');
            icon.classList.add('is-after');
            if (!(await loadImage(icon, icon.dataset.afterSrc))) {
              icon.removeAttribute('src');
              return;
            }
            icon.removeAttribute('hidden');
            setTimeout(() => {
              icon.classList.add('is-fading');
              setTimeout(() => {
                icon.hidden = true;
                icon.removeAttribute('src');
              }, fadeMs);
            }, Number(icon.dataset.afterMs) || 5000);
          }, fadeMs);
        }, loopMs - fadeMs);
      });
    }

    async function playIconsOnce() {
      // Finish network loading before starting the one-second launch schedule.
      const prepared = await Promise.all(icons.map(prepareIcon));
      for (const asset of prepared) {
        if (!asset) continue;
        const style = getComputedStyle(asset.icon);
        const width = Math.min(parseFloat(style.width) || 80,
          parseFloat(style.maxWidth) || Infinity, method.clientWidth);
        const height = parseFloat(style.height) || width * asset.height / asset.width;
        const bounds = await waitForVisibleSpace(width, Math.max(height, Math.min(120, details.clientHeight)), asset.icon);
        // Recalculate for the actual icon height once there is enough visible space.
        showIcon(asset, visibleBounds(width, height) || bounds);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    playIconsOnce().catch(error => console.error('아이콘 재생 오류:', error));
  }

  // 점지법 이름과 실제 영수증 PNG 경로를 연결합니다.
  const receipts = {
    "해안무속공동체": sitePath("img/result/paper/ocean-shamanism-community.png"),
    "산지무속개인": sitePath("img/result/paper/mountain-shamanism-individual.png"),
    "산지종교공동체": sitePath("img/result/paper/mountain-religion-community.png"),
    "산지종교개인": sitePath("img/result/paper/mountain-religion-individual.png"),
    "산지무속공동체": sitePath("img/result/paper/mountain-shamanism-community.png"),
    "해안무속개인": sitePath("img/result/paper/ocean-shamanism-individual.png"),
    "해안종교공동체": sitePath("img/result/paper/ocean-religion-community.png"),
    "해안종교개인": sitePath("img/result/paper/ocean-religion-individual.png"),
    "내륙무속공동체": sitePath("img/result/paper/inland-shamanism-community.png"),
    "내륙무속개인": sitePath("img/result/paper/inland-shamanism-individual.png"),
    "내륙종교공동체": sitePath("img/result/paper/inland-religion-community.png"),
    "내륙종교개인": sitePath("img/result/paper/inland-religion-individual.png")
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
    location.href = sitePath('diagnosis.html');
  });
})();
