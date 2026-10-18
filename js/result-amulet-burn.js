(() => {
  const amulets = [...document.querySelectorAll(
    '.result-method .method-deco[data-src$="/amulet.webp"], ' +
    '.result-method .method-deco[data-src$="/burning amulet.webp"]'
  )];
  if (!amulets.length) return;

  const popupSound = new Audio(sitePath('sound/popup.mp3'));
  popupSound.preload = 'auto';

  // 채록 팝업의 마크업과 스타일을 그대로 사용합니다.
  const popup = document.createElement('dialog');
  popup.className = 'example-popup';
  popup.id = 'examplePopup';
  popup.setAttribute('aria-labelledby', 'examplePopupTitle');
  popup.innerHTML = `
    <div class="example-popup-panel">
      <h2 class="body1-center-underline" id="examplePopupTitle">소지(燒紙) 완료</h2>
      <p class="samjaerok-body-center" id="examplePopupText"></p>
    </div>
    <button type="button" class="example-popup-close" id="examplePopupClose" aria-label="팝업 닫기" autofocus>
      <img src="../img/example/x-button.svg" alt="">
    </button>`;
  document.body.append(popup);
  const panel = popup.querySelector('.example-popup-panel');
  const message = popup.querySelector('#examplePopupText');
  const burnMessages = [
    '종이에 담긴 액운을 불길에 실어 보냈습니다.\n이제 마음에 남은 근심도 함께 흘려보내세요.',
    '타버린 부적과 함께 액운도 멀어졌습니다.\n가벼워진 마음으로 오늘을 이어가세요.',
    '불길이 묵은 걱정을 가져갔습니다.\n이제 새로운 기운을 맞이해 보세요.',
    '재가 흩날리듯 근심도 흩어졌습니다.\n남은 하루에는 평온이 머물기를 바랍니다.'
  ];
  let previousMessage = -1;
  let restoreAfterClose = () => {};

  function openPopup(restore) {
    restoreAfterClose = restore;
    previousMessage = previousMessage < 0
      ? Math.floor(Math.random() * burnMessages.length)
      : (previousMessage + 1 + Math.floor(Math.random() * (burnMessages.length - 1))) % burnMessages.length;
    message.textContent = burnMessages[previousMessage];
    popup.showModal();
    popupSound.currentTime = 0;
    popupSound.play().catch(() => {});
    const cursor = document.querySelector('.site-cursor');
    if (cursor) popup.append(cursor);
  }
  popup.querySelector('.example-popup-close').addEventListener('click', () => popup.close());
  popup.addEventListener('click', event => {
    if (event.target !== popup) return;
    const rect = panel.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) popup.close();
  });
  popup.addEventListener('close', () => {
    const cursor = popup.querySelector('.site-cursor');
    if (cursor) document.documentElement.append(cursor);
    restoreAfterClose();
  });

  amulets.forEach(amulet => {
    const fireSound = new Audio(sitePath('sound/fire.mp3'));
    fireSound.preload = 'auto';
    fireSound.volume = 0.4;
    const hotspot = document.createElement('button');
    hotspot.type = 'button';
    hotspot.className = 'amulet-burn-hotspot';
    hotspot.setAttribute('aria-label', '부적을 2초 동안 눌러 액운 태우기');
    hotspot.hidden = true;
    hotspot.innerHTML = '<span class="amulet-burn-effect" aria-hidden="true"><img class="amulet-burn-fire" alt=""></span>';
    const effect = hotspot.firstElementChild;
    const fire = effect.querySelector('.amulet-burn-fire');
    const particles = [
      [18, 70, -12, 0], [33, 82, 8, 45], [48, 69, -7, 85],
      [60, 87, 14, 20], [75, 76, -10, 70], [88, 84, 5, 105]
    ];
    particles.forEach(([left, top, drift, delay]) => {
      const ash = document.createElement('span');
      ash.className = 'amulet-burn-ash';
      ash.style.setProperty('--ash-left', `${left}%`);
      ash.style.setProperty('--ash-top', `${top}%`);
      ash.style.setProperty('--ash-drift', `${drift}px`);
      ash.style.setProperty('--ash-delay', `${delay}ms`);
      effect.append(ash);
    });
    document.body.append(hotspot);

    const hint = document.createElement('span');
    hint.className = 'amulet-burn-hint';
    hint.textContent = '길게 눌러보세요.';
    hint.hidden = true;
    document.body.append(hint);

    const originalClip = amulet.style.clipPath;
    let state = 'idle';
    let pointerId = null;
    let progress = 0;
    let startedAt = 0;
    let frame = 0;
    let ashTimer = 0;

    function isVisible() {
      if (amulet.hidden || !amulet.getAttribute('src') || amulet.classList.contains('is-fading')) return false;
      const style = getComputedStyle(amulet);
      return style.display !== 'none' && style.visibility !== 'hidden' &&
        amulet.getBoundingClientRect().width > 0;
    }

    function sync() {
      if (state !== 'complete' && !isVisible()) {
        hotspot.hidden = true;
        hint.hidden = true;
        if (state === 'holding' || state === 'reversing') reset();
        return;
      }
      if (state === 'complete') return;
      const rect = amulet.getBoundingClientRect();
      hotspot.hidden = false;
      hotspot.style.left = `${rect.left}px`;
      hotspot.style.top = `${rect.top}px`;
      hotspot.style.width = `${rect.width}px`;
      hotspot.style.height = `${rect.height}px`;
      if (!hint.hidden) {
        const hintWidth = hint.getBoundingClientRect().width;
        hint.style.left = `${Math.max(8, Math.min(innerWidth - hintWidth - 8, rect.left + rect.width / 2 - hintWidth / 2))}px`;
        hint.style.top = `${rect.top > 66 ? rect.top - 62 : rect.bottom + 6}px`;
      }
    }

    function clipAt(value) {
      progress = value;
      hotspot.style.setProperty('--burn-front', `${(1 - value) * 100}%`);
      if (value <= 0) {
        amulet.style.clipPath = originalClip;
        return;
      }
      const edge = 100 * (1 - value);
      const roughness = 3.2 * Math.min(1, value * 8, (1 - value) * 8);
      const offsets = [0, 1, -1, 1.4, -1.2, .8, -1.5, 1.1, -.7, .9, 0];
      const points = offsets.map((offset, index) =>
        `${100 - index * 10}% ${Math.max(0, Math.min(100, edge + offset * roughness))}%`
      );
      amulet.style.clipPath = `polygon(0 0, 100% 0, ${points.join(', ')})`;
    }

    function reset() {
      cancelAnimationFrame(frame);
      clearTimeout(ashTimer);
      fireSound.pause();
      fireSound.currentTime = 0;
      state = 'idle';
      pointerId = null;
      progress = 0;
      amulet.style.clipPath = originalClip;
      hotspot.style.setProperty('--burn-front', '100%');
      hotspot.classList.remove('is-burning', 'is-complete');
      fire.removeAttribute('src');
      sync();
    }

    function restore() {
      if (state !== 'holding') return;
      cancelAnimationFrame(frame);
      pointerId = null;
      state = 'reversing';
      const from = progress;
      const start = performance.now();
      function reverse(now) {
        if (state !== 'reversing') return;
        const phase = Math.min(1, (now - start) / 260);
        clipAt(from * (1 - phase) * (1 - phase));
        sync();
        if (phase < 1) frame = requestAnimationFrame(reverse);
        else reset();
      }
      frame = requestAnimationFrame(reverse);
    }

    function complete() {
      state = 'complete';
      pointerId = null;
      clipAt(1);
      hint.hidden = true;
      hotspot.classList.remove('is-burning');
      hotspot.classList.add('is-complete');
      ashTimer = window.setTimeout(() => openPopup(reset),
        matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 730);
    }

    function tick(now) {
      if (state !== 'holding') return;
      clipAt(Math.min(1, (now - startedAt) / 2000));
      sync();
      if (progress >= 1) complete();
      else frame = requestAnimationFrame(tick);
    }

    function start(id) {
      if (popup.open || state === 'holding' || state === 'complete' || !isVisible()) return;
      if (state === 'reversing') reset();
      pointerId = id;
      startedAt = performance.now();
      clipAt(0);
      state = 'holding';
      hint.hidden = true;
      fire.src = '../img/result/fire.webp';
      hotspot.classList.add('is-burning');
      fireSound.currentTime = 0;
      fireSound.play().catch(() => {});
      frame = requestAnimationFrame(tick);
    }

    hotspot.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && state === 'idle') {
        hint.hidden = false;
        sync();
      }
    });
    hotspot.addEventListener('pointerleave', () => {
      hint.hidden = true;
      restore();
    });
    hotspot.addEventListener('pointerdown', event => {
      if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
      event.preventDefault();
      start(event.pointerId);
    });
    window.addEventListener('pointermove', event => {
      if (state !== 'holding' || pointerId !== event.pointerId) return;
      const rect = hotspot.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) restore();
    });
    window.addEventListener('pointerup', event => {
      if (pointerId === event.pointerId) restore();
    });
    window.addEventListener('pointercancel', event => {
      if (pointerId === event.pointerId) restore();
    });
    hotspot.addEventListener('keydown', event => {
      if (event.repeat || (event.key !== ' ' && event.key !== 'Enter')) return;
      event.preventDefault();
      start('keyboard');
    });
    hotspot.addEventListener('keyup', event => {
      if (pointerId === 'keyboard' && (event.key === ' ' || event.key === 'Enter')) restore();
    });
    hotspot.addEventListener('blur', () => { if (pointerId === 'keyboard') restore(); });
    hotspot.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('visibilitychange', () => { if (document.hidden) restore(); });
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    new ResizeObserver(sync).observe(amulet);
    new MutationObserver(sync).observe(amulet, {
      attributes: true, attributeFilter: ['hidden', 'src', 'class', 'style']
    });
    window.addEventListener('pagehide', reset);
    sync();
  });
})();
