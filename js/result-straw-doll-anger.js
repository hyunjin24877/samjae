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
  let escapeTimer;
  let shakeAnimation;
  let angerAnimation;
  let escapeAnimation;
  let escapeFade;
  let returnAnimation;
  const runSound = new Audio(sitePath('sound/run.mp3'));
  runSound.preload = 'auto';
  runSound.volume = 0.4;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const runContext = AudioContextClass ? new AudioContextClass() : null;
  let runBuffer;
  let runSource;
  if (runContext) {
    fetch(sitePath('sound/run.mp3'))
      .then(response => response.arrayBuffer())
      .then(data => runContext.decodeAudioData(data))
      .then(buffer => { runBuffer = buffer; })
      .catch(() => {});
  }
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  function playRunSound() {
    if (runBuffer && runContext.state === 'running') {
      runSource = runContext.createBufferSource();
      const gain = runContext.createGain();
      runSource.buffer = runBuffer;
      gain.gain.value = 0.4;
      runSource.connect(gain).connect(runContext.destination);
      runSource.start();
    } else {
      runSound.currentTime = 0;
      runSound.play().catch(() => {});
    }
  }

  function stopRunSound() {
    try { runSource?.stop(); } catch (_) {}
    runSource = undefined;
    runSound.pause();
    runSound.currentTime = 0;
  }

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
    clearTimeout(escapeTimer);
    angerAnimation?.cancel();
    escapeAnimation?.cancel();
    escapeFade?.cancel();
    returnAnimation?.cancel();
    angerAnimation = undefined;
    anger.hidden = true;
    stopRunSound();
    doll.style.removeProperty('visibility');
    doll.style.removeProperty('opacity');
    doll.style.removeProperty('pointer-events');
    clicks = 0;
    lastClick = 0;
    angry = false;
  }

  async function escape() {
    if (!angry || doll.hidden) return;
    angerAnimation?.cancel();
    anger.hidden = true;
    doll.style.pointerEvents = 'none';
    const rect = doll.getBoundingClientRect();
    const methodScale = method.getBoundingClientRect().width / method.clientWidth || 1;
    const distance = Math.max(0, (innerWidth - rect.left + rect.width + 48) / methodScale);
    try {
      doll.dispatchEvent(new Event('result-straw-escape'));
      playRunSound();
      escapeAnimation = doll.animate([
        { offset: 0, translate: '0 0' },
        { offset: .18, translate: `${distance * .14}px -5px` },
        { offset: .4, translate: `${distance * .38}px 0` },
        { offset: .62, translate: `${distance * .64}px -5px` },
        { offset: .82, translate: `${distance * .84}px 0` },
        { offset: 1, translate: `${distance}px -4px` }
      ], { duration: 1300, easing: 'ease-in', fill: 'forwards' });
      escapeFade = doll.animate([
        { offset: 0, opacity: 1 },
        { offset: .6, opacity: 1 },
        { offset: .8, opacity: .5 },
        { offset: 1, opacity: 0 }
      ], { duration: 1300, easing: 'linear', fill: 'forwards' });
      await Promise.all([escapeAnimation.finished, escapeFade.finished]);
      stopRunSound();
      doll.style.visibility = 'hidden';
      escapeAnimation.cancel();
      escapeFade.cancel();

      await wait(2000);
      if (!angry || doll.hidden) return;
      doll.style.opacity = '0';
      doll.style.visibility = '';
      returnAnimation = doll.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500, easing: 'ease-out', fill: 'forwards'
      });
      await returnAnimation.finished;
    } catch (error) {
      if (error.name !== 'AbortError') console.error('짚신 인형 도망 모션 오류:', error);
    } finally {
      reset();
    }
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
    escapeTimer = setTimeout(escape, 1500);
  }

  function react() {
    if (doll.hidden || angry) return;
    const now = performance.now();
    if (now - lastClick >= 2000) clicks = 0;
    lastClick = now;
    clicks += 1;
    doll.dataset.strawReplay = 'true';
    doll.classList.remove('is-fading');
    doll.dispatchEvent(new Event('result-straw-react'));

    if (clicks === 3) {
      runContext?.resume().catch(() => {});
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
  window.addEventListener('pagehide', reset);
})();
