(() => {
  document.querySelectorAll('.result-method .method-deco[data-src$="/fire.webp"]').forEach(fire => {
    const method = fire.closest('.result-method');
    method.classList.add('has-fire-glow');
    const glow = document.createElement('span');
    glow.className = 'fire-click-glow';
    glow.setAttribute('aria-hidden', 'true');
    glow.hidden = true;
    method.append(glow);

    let flicker;
    let glowAnimation;

    function placeGlow() {
      const fireRect = fire.getBoundingClientRect();
      const methodRect = method.getBoundingClientRect();
      const scaleX = methodRect.width / method.clientWidth;
      const scaleY = methodRect.height / method.clientHeight;
      if (!(scaleX > 0 && scaleY > 0)) return false;
      glow.style.left = `${(fireRect.left + fireRect.width / 2 - methodRect.left) / scaleX}px`;
      glow.style.top = `${(fireRect.top + fireRect.height / 2 - methodRect.top) / scaleY}px`;
      glow.style.setProperty('--fire-glow-size', `${Math.max(fire.offsetWidth, fire.offsetHeight) * 2}px`);
      return true;
    }

    function flash() {
      if (fire.hidden || !fire.currentSrc) return;
      flicker?.cancel();
      const opacity = Number.parseFloat(getComputedStyle(fire).opacity);
      const original = Number.isFinite(opacity) ? opacity : 1;
      flicker = fire.animate([
        { opacity: original },
        { opacity: original * .65, offset: .5 },
        { opacity: original }
      ], { duration: 150, easing: 'ease-in-out' });
      const current = flicker;
      current.addEventListener('finish', () => {
        current.cancel();
        if (flicker === current) flicker = undefined;
      }, { once: true });

      glowAnimation?.cancel();
      if (!placeGlow()) return;
      glow.hidden = false;
      glowAnimation = glow.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(.65)' },
        { opacity: .8, transform: 'translate(-50%, -50%) scale(.9)', offset: .2 },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(1.15)' }
      ], { duration: 650, easing: 'ease-out' });
      const currentGlow = glowAnimation;
      currentGlow.addEventListener('finish', () => {
        if (glowAnimation !== currentGlow) return;
        glow.hidden = true;
        glowAnimation = undefined;
      }, { once: true });
    }

    fire.addEventListener('click', flash);
  });
})();
