(() => {
  const pray = document.querySelector('.result-method .method-deco[data-src$="/pray.gif"]');
  const method = pray?.closest('.result-method');
  if (!pray || !method) return;

  method.classList.add('has-pray-halo');
  const halo = document.createElement('span');
  halo.className = 'pray-halo';
  halo.setAttribute('aria-hidden', 'true');
  halo.hidden = true;
  const wave = document.createElement('span');
  wave.className = 'pray-halo-wave';
  wave.setAttribute('aria-hidden', 'true');
  wave.hidden = true;
  method.append(halo, wave);

  pray.setAttribute('role', 'button');
  pray.setAttribute('tabindex', '0');
  pray.setAttribute('aria-label', '간절한 기도');

  let active = false;
  let pressing = false;
  let completed = false;
  let pointerId = null;
  let holdTimer;
  let fadeTimer;
  let resetTimer;
  let holdAnimation;
  let waveAnimation;
  let fadeAnimation;

  function placeHalo() {
    const prayRect = pray.getBoundingClientRect();
    const methodRect = method.getBoundingClientRect();
    const scaleX = methodRect.width / method.clientWidth;
    const scaleY = methodRect.height / method.clientHeight;
    if (!(scaleX > 0 && scaleY > 0)) return;
    const centerX = (prayRect.left + prayRect.width / 2 - methodRect.left) / scaleX;
    const centerY = (prayRect.top + prayRect.height / 2 - methodRect.top) / scaleY;
    const size = Math.max(pray.offsetWidth, pray.offsetHeight) * 3.1;
    for (const layer of [halo, wave]) {
      layer.style.left = `${centerX}px`;
      layer.style.top = `${centerY}px`;
      layer.style.setProperty('--pray-halo-size', `${size}px`);
    }
  }

  function reset() {
    const resumeOriginalTiming = !completed;
    clearTimeout(holdTimer);
    clearTimeout(fadeTimer);
    clearTimeout(resetTimer);
    holdAnimation?.cancel();
    waveAnimation?.cancel();
    fadeAnimation?.cancel();
    halo.hidden = true;
    wave.hidden = true;
    halo.style.removeProperty('opacity');
    halo.style.removeProperty('transform');
    active = false;
    pressing = false;
    completed = false;
    pointerId = null;
    if (resumeOriginalTiming) {
      delete pray.dataset.prayInteractive;
      pray.dispatchEvent(new Event('result-pray-resume'));
    }
  }

  function fadeHalo(delay) {
    fadeTimer = setTimeout(() => {
      fadeAnimation = halo.animate([
        { opacity: getComputedStyle(halo).opacity, transform: getComputedStyle(halo).transform },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(1.08)' }
      ], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      resetTimer = setTimeout(reset, 700);
    }, delay);
  }

  function finishHold() {
    if (!pressing || !active) return;
    completed = true;
    holdAnimation?.cancel();
    halo.style.opacity = '.88';
    halo.style.transform = 'translate(-50%, -50%) scale(1)';
    wave.hidden = false;
    waveAnimation = wave.animate([
      { opacity: .6, transform: 'translate(-50%, -50%) scale(.65)' },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.55)' }
    ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });
  }

  function start(event) {
    if (active || pray.hidden || !pray.currentSrc) return;
    if (event?.type === 'pointerdown' && event.button !== 0) return;
    event?.preventDefault();
    active = true;
    pressing = true;
    pray.dataset.prayInteractive = 'true';
    pray.classList.remove('is-fading');
    pointerId = event?.pointerId ?? null;
    if (pointerId !== null) {
      try { pray.setPointerCapture(pointerId); } catch (_) { /* Pointer capture is unavailable. */ }
    }
    placeHalo();
    halo.hidden = false;
    holdAnimation = halo.animate([
      { opacity: .14, transform: 'translate(-50%, -50%) scale(.55)' },
      { opacity: .88, transform: 'translate(-50%, -50%) scale(1)' }
    ], { duration: 3000, easing: 'ease-in-out', fill: 'forwards' });
    holdTimer = setTimeout(finishHold, 3000);
  }

  function release(event) {
    if (!active || !pressing) return;
    if (pointerId !== null && event?.pointerId != null && event.pointerId !== pointerId) return;
    pressing = false;
    if (!completed) {
      clearTimeout(holdTimer);
      const opacity = getComputedStyle(halo).opacity;
      const transform = getComputedStyle(halo).transform;
      holdAnimation?.cancel();
      halo.style.opacity = opacity;
      halo.style.transform = transform;
      fadeHalo(0);
      return;
    }
    fadeHalo(1000);
  }

  pray.addEventListener('pointerdown', start);
  pray.addEventListener('pointerup', release);
  pray.addEventListener('pointercancel', release);
  pray.addEventListener('lostpointercapture', release);
  pray.addEventListener('dragstart', event => event.preventDefault());
  pray.addEventListener('contextmenu', event => event.preventDefault());
  pray.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') start(event);
  });
  pray.addEventListener('keyup', event => {
    if (event.key === 'Enter' || event.key === ' ') release(event);
  });
  window.addEventListener('blur', () => release());
  window.addEventListener('resize', () => { if (active) placeHalo(); });
})();
