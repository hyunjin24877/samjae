(() => {
  const knife = document.querySelector('.result-method .method-deco[data-src$="/knife throwing.webp"]');
  const method = knife?.closest('.result-method');
  if (!knife || !method) return;

  const layer = document.createElement('span');
  layer.className = 'knife-throw-layer';
  method.append(layer);
  layer.append(knife);

  knife.setAttribute('role', 'button');
  knife.setAttribute('tabindex', '0');
  knife.setAttribute('aria-label', '칼 던지기');

  let throwing = false;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function throwKnife() {
    if (throwing || knife.hidden || !knife.currentSrc) return;
    throwing = true;
    knife.dataset.knifeReplay = 'true';
    knife.classList.remove('is-fading');
    knife.style.pointerEvents = 'none';

    const rect = knife.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const scaleX = layer.offsetWidth ? layerRect.width / layer.offsetWidth : 1;
    const scaleY = layer.offsetHeight ? layerRect.height / layer.offsetHeight : 1;
    const travelX = (innerWidth - rect.left + rect.width + 24) / scaleX;
    const travelY = (rect.bottom + rect.height + 24) / scaleY;
    const pull = Math.max(knife.offsetWidth * .1, 10);
    layer.style.transformOrigin = `${knife.offsetLeft + knife.offsetWidth / 2}px ${knife.offsetTop + knife.offsetHeight / 2}px`;
    const preparationMs = 150;
    const flightMs = 1200;
    const duration = preparationMs + flightMs;
    const movementStart = preparationMs / duration;
    const movementOffset = progress => movementStart + (1 - movementStart) * progress;

    let flight;
    let departureFade;
    let fade;
    try {
      flight = layer.animate([
        { offset: 0, transform: 'translate3d(0, 0, 0) rotate(0deg)', easing: 'ease-out' },
        { offset: movementStart, transform: `translate3d(${-pull}px, ${pull * .45}px, 0) rotate(-12deg)`, easing: 'ease-in' },
        { offset: movementOffset(.31), transform: `translate3d(${travelX * .14}px, ${-travelY * .14}px, 0) rotate(160deg)`, easing: 'ease-in' },
        { offset: movementOffset(.63), transform: `translate3d(${travelX * .48}px, ${-travelY * .48}px, 0) rotate(420deg)`, easing: 'ease-in' },
        { offset: 1, transform: `translate3d(${travelX}px, ${-travelY}px, 0) rotate(720deg)` }
      ], { duration, fill: 'forwards' });
      departureFade = layer.animate([
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: movementOffset(.6) },
        { opacity: .5, offset: movementOffset(.8) },
        { opacity: 0, offset: 1 }
      ], { duration, easing: 'linear', fill: 'forwards' });
      await Promise.all([flight.finished, departureFade.finished]);
      layer.style.opacity = '0';
      flight.cancel();
      departureFade.cancel();

      await wait(2000);
      fade = layer.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 250, easing: 'ease-out', fill: 'forwards'
      });
      await fade.finished;
      layer.style.opacity = '1';
      fade.cancel();
    } catch (error) {
      if (error.name !== 'AbortError') console.error('칼 투척 모션 오류:', error);
      flight?.cancel();
      departureFade?.cancel();
      fade?.cancel();
      layer.style.opacity = '1';
    } finally {
      knife.style.removeProperty('pointer-events');
      throwing = false;
    }
  }

  knife.addEventListener('click', throwKnife);
  knife.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    throwKnife();
  });
  knife.addEventListener('dragstart', event => event.preventDefault());
})();
