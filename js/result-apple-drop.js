(() => {
  const apple = document.querySelector('.result-method .method-deco[data-src$="/apple.webp"]');
  const method = apple?.closest('.result-method');
  if (!apple || !method) return;

  const layer = document.createElement('span');
  layer.className = 'apple-drop-layer';
  method.append(layer);
  layer.append(apple);

  apple.setAttribute('role', 'button');
  apple.setAttribute('tabindex', '0');
  apple.setAttribute('aria-label', '사과를 누르고 있다가 놓기');

  let busy = false;
  let holding = false;
  let pointerId = null;
  let startedAt = 0;
  let maximum = 0;
  let riseFrame;
  let fallAnimation;

  function liftAt(elapsed) {
    if (elapsed < 2000) {
      const progress = Math.max(0, elapsed / 2000);
      return maximum * (1 - (1 - progress) ** 2);
    }
    return maximum * (.985 + .015 * Math.cos((elapsed - 2000) / 320));
  }

  function rise(now) {
    if (!holding) return;
    layer.style.transform = `translate3d(0, ${-liftAt(now - startedAt)}px, 0)`;
    riseFrame = requestAnimationFrame(rise);
  }

  function start(event) {
    if (busy || apple.hidden || !apple.currentSrc || apple.classList.contains('is-after')) return;
    if (event?.type === 'pointerdown' && event.button !== 0) return;
    event?.preventDefault();
    busy = true;
    holding = true;
    pointerId = event?.pointerId ?? null;
    apple.dataset.appleReplay = 'true';
    apple.classList.remove('is-fading');
    maximum = Math.max(1, apple.offsetHeight || apple.offsetWidth);
    startedAt = performance.now();
    layer.style.transformOrigin = `${apple.offsetLeft + apple.offsetWidth / 2}px ${apple.offsetTop + apple.offsetHeight}px`;
    if (pointerId !== null) {
      try { apple.setPointerCapture(pointerId); } catch (_) { /* Capture may be unavailable. */ }
    }
    riseFrame = requestAnimationFrame(rise);
  }

  async function release(event) {
    if (!holding || (pointerId !== null && event?.pointerId != null && event.pointerId !== pointerId)) return;
    holding = false;
    pointerId = null;
    cancelAnimationFrame(riseFrame);
    const lift = liftAt(performance.now() - startedAt);
    if (lift < .5) {
      layer.style.removeProperty('transform');
      busy = false;
      return;
    }

    const fallDuration = Math.round(120 + Math.sqrt(lift / maximum) * 300);
    const duration = fallDuration + 230;
    try {
      fallAnimation = layer.animate([
        { offset: 0, transform: `translate3d(0, ${-lift}px, 0) scale(1)`, easing: 'ease-in' },
        { offset: fallDuration / duration, transform: 'translate3d(0, 0, 0) scale(1.04, .9)' },
        { offset: (fallDuration + 60) / duration, transform: `translate3d(0, ${-maximum * .12}px, 0) scale(1)` },
        { offset: (fallDuration + 120) / duration, transform: 'translate3d(0, 0, 0) scale(1, .97)' },
        { offset: (fallDuration + 175) / duration, transform: `translate3d(0, ${-maximum * .04}px, 0) scale(1)` },
        { offset: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
      ], { duration, fill: 'forwards' });
      await fallAnimation.finished;
    } catch (error) {
      if (error.name !== 'AbortError') console.error('사과 낙하 모션 오류:', error);
    } finally {
      layer.style.removeProperty('transform');
      fallAnimation?.cancel();
      busy = false;
    }
  }

  apple.addEventListener('pointerdown', start);
  apple.addEventListener('pointerup', release);
  apple.addEventListener('pointercancel', release);
  apple.addEventListener('lostpointercapture', release);
  apple.addEventListener('dragstart', event => event.preventDefault());
  apple.addEventListener('contextmenu', event => event.preventDefault());
  apple.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') start(event);
  });
  apple.addEventListener('keyup', event => {
    if (event.key === 'Enter' || event.key === ' ') release(event);
  });
  window.addEventListener('blur', () => release());
})();
