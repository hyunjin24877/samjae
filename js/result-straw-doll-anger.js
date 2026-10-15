(() => {
  const doll = document.querySelector('.result-method .method-deco[data-src$="straw doll.webp"]');
  const method = doll?.closest('.result-method');
  if (!doll || !method) return;

  const anger = document.createElement('span');
  anger.className = 'result-straw-doll-anger';
  anger.setAttribute('aria-hidden', 'true');
  anger.hidden = true;
  method.append(anger);

  doll.setAttribute('role', 'button');
  doll.setAttribute('tabindex', '0');
  doll.setAttribute('aria-label', '짚신 인형 반응 보기');

  let clicks = 0;
  let lastClick = 0;
  let angry = false;
  let gapTimer;
  let angerTimer;
  let shakeAnimation;
  let angerAnimation;

  function placeAnger() {
    const dollRect = doll.getBoundingClientRect();
    const methodRect = method.getBoundingClientRect();
    const scaleX = methodRect.width / method.clientWidth;
    const scaleY = methodRect.height / method.clientHeight;
    if (!(scaleX > 0 && scaleY > 0)) return;

    anger.style.left = `${(dollRect.left - methodRect.left) / scaleX + doll.offsetWidth * .69}px`;
    anger.style.top = `${(dollRect.top - methodRect.top) / scaleY + doll.offsetHeight * .035}px`;
    anger.style.width = `${doll.offsetWidth * .27}px`;
  }

  function shake(level) {
    shakeAnimation?.cancel();
    const distance = level === 1 ? 2 : level === 2 ? 4 : 6;
    const offsets = level === 3
      ? [0, -1, 1, -1, 1, -1, 1, 0]
      : [0, -1, 1, -1, 1, 0];
    shakeAnimation = doll.animate(
      offsets.map(value => ({ translate: `${value * distance}% 0` })),
      { duration: level === 1 ? 200 : level === 2 ? 260 : 380, easing: 'ease-in-out' }
    );
  }

  function reset() {
    clearTimeout(gapTimer);
    clearTimeout(angerTimer);
    angerAnimation?.cancel();
    angerAnimation = undefined;
    anger.hidden = true;
    clicks = 0;
    lastClick = 0;
    angry = false;
  }

  function showAnger() {
    angry = true;
    clearTimeout(gapTimer);
    placeAnger();
    anger.hidden = false;
    angerAnimation = anger.animate([
      { offset: 0,    transform: 'scale(0)', opacity: 0 },
      { offset: .07,  transform: 'scale(1.25)', opacity: 1 },
      { offset: .10,  transform: 'scale(1)', opacity: 1 },
      { offset: .13,  transform: 'translateX(-7%) rotate(-7deg) scale(1)', opacity: 1 },
      { offset: .16,  transform: 'translateX(7%) rotate(7deg) scale(1)', opacity: 1 },
      { offset: .19,  transform: 'translateX(-6%) rotate(-6deg) scale(1)', opacity: 1 },
      { offset: .22,  transform: 'translateX(6%) rotate(6deg) scale(1)', opacity: 1 },
      { offset: .25,  transform: 'translateX(-4%) rotate(-4deg) scale(1)', opacity: 1 },
      { offset: .28,  transform: 'scale(1)', opacity: 1 },
      { offset: .82,  transform: 'scale(1)', opacity: 1 },
      { offset: 1,    transform: 'scale(.9)', opacity: 0 }
    ], { duration: 2050, easing: 'ease-out', fill: 'forwards' });
    angerTimer = setTimeout(reset, 2050);
  }

  function react() {
    if (doll.hidden || angry) return;
    const now = performance.now();
    if (now - lastClick >= 2000) clicks = 0;
    lastClick = now;
    clicks += 1;

    if (clicks === 3) {
      shake(3);
      showAnger();
      return;
    }

    shake(clicks);
    clearTimeout(gapTimer);
    gapTimer = setTimeout(() => { clicks = 0; }, 2000);
  }

  doll.addEventListener('click', react);
  doll.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    react();
  });
  window.addEventListener('resize', () => {
    if (!anger.hidden) placeAnger();
  });
  new MutationObserver(() => {
    if (doll.hidden) reset();
  }).observe(doll, { attributes: true, attributeFilter: ['hidden'] });
})();
