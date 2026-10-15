(() => {
  const chicken = document.querySelector('.result-method .method-deco[data-src$="/chicken.webp"]');
  const method = chicken?.closest('.result-method');
  if (!chicken || !method) return;

  const layer = document.createElement('span');
  layer.className = 'chicken-escape-layer';
  method.append(layer);
  layer.append(chicken);

  chicken.setAttribute('role', 'button');
  chicken.setAttribute('tabindex', '0');
  chicken.setAttribute('aria-label', '닭 깜짝 놀라 도망가기');

  let escaping = false;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function escape() {
    if (escaping || chicken.hidden || !chicken.currentSrc || chicken.classList.contains('is-after')) return;
    escaping = true;
    chicken.dataset.chickenReplay = 'true';
    chicken.classList.remove('is-fading');
    chicken.style.pointerEvents = 'none';

    const chickenRect = chicken.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const scaleX = layerRect.width / layer.offsetWidth || 1;
    const jump = (chicken.offsetHeight || chicken.offsetWidth) * .46;
    const retreat = chicken.offsetWidth * .12;
    const travel = -Math.max(0, (chickenRect.right + 40) / scaleX);
    layer.style.transformOrigin = `${chicken.offsetLeft + chicken.offsetWidth / 2}px ${chicken.offsetTop + chicken.offsetHeight / 2}px`;

    let flight;
    let fade;
    try {
      flight = layer.animate([
        { offset: 0, transform: 'translate(0, 0) scale(1)' },
        { offset: .035, transform: 'translate(-3px, 0) scale(1)' },
        { offset: .07, transform: 'translate(3px, 0) scale(1)' },
        { offset: .1, transform: 'translate(0, 0) scale(1)', easing: 'ease-out' },
        { offset: .19, transform: `translate(0, ${-jump}px) scale(1)`, easing: 'ease-in' },
        { offset: .31, transform: `translate(0, ${-jump * .38}px) scale(1)`, easing: 'ease-in' },
        { offset: .35, transform: 'translate(0, 0) scale(1.04, .92)' },
        { offset: .4, transform: 'translate(0, -3px) scale(1)' },
        { offset: .45, transform: `translate(${retreat}px, 0) scale(1)`, easing: 'ease-in' },
        { offset: .58, transform: `translate(${travel * .07}px, -5px) scale(1)` },
        { offset: .7, transform: `translate(${travel * .25}px, 0) scale(1)` },
        { offset: .82, transform: `translate(${travel * .52}px, -5px) scale(1)` },
        { offset: 1, transform: `translate(${travel}px, 0) scale(1)` }
      ], { duration: 2000, fill: 'forwards' });
      await flight.finished;
      layer.style.opacity = '0';
      flight.cancel();

      await wait(2000);
      fade = layer.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500, easing: 'ease-out', fill: 'forwards'
      });
      await fade.finished;
      layer.style.opacity = '1';
      fade.cancel();
    } catch (error) {
      if (error.name !== 'AbortError') console.error('닭 도망 모션 오류:', error);
      flight?.cancel();
      fade?.cancel();
      layer.style.opacity = '1';
    } finally {
      chicken.style.removeProperty('pointer-events');
      escaping = false;
    }
  }

  chicken.addEventListener('click', escape);
  chicken.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    escape();
  });
  chicken.addEventListener('dragstart', event => event.preventDefault());
})();
