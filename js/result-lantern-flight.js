(() => {
  const lantern = document.querySelector('.result-method .method-deco[data-src$="/light.webp"]');
  const method = lantern?.closest('.result-method');
  if (!lantern || !method) return;

  const layer = document.createElement('span');
  layer.className = 'result-lantern-flight-layer';
  method.append(layer);
  layer.append(lantern);

  lantern.setAttribute('role', 'button');
  lantern.setAttribute('tabindex', '0');
  lantern.setAttribute('aria-label', '연등 날리기');

  let flying = false;
  let flightAnimation;
  let fadeAnimation;

  function launch() {
    if (flying || lantern.hidden || !lantern.currentSrc) return;
    flying = true;
    lantern.dataset.lanternReplay = 'true';
    lantern.classList.remove('is-fading');
    lantern.style.pointerEvents = 'none';

    const lanternRect = lantern.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const zoom = layer.offsetHeight ? layerRect.height / layer.offsetHeight : 1;
    const travel = (lanternRect.bottom + 40) / (zoom || 1);
    const drift = Math.max(lantern.offsetWidth * .2, 24);
    const dip = lantern.offsetHeight * .12;
    layer.style.transformOrigin = `${lantern.offsetLeft + lantern.offsetWidth / 2}px ${lantern.offsetTop + lantern.offsetHeight / 2}px`;

    flightAnimation = layer.animate([
      { offset: 0, transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1, easing: 'ease-in' },
      { offset: .1, transform: `translate3d(${drift * .15}px, ${dip}px, 0) scale(1)`, opacity: 1, easing: 'ease-in' },
      { offset: .27, transform: `translate3d(${drift}px, ${-travel * .12}px, 0) scale(.96)`, opacity: 1, easing: 'ease-in-out' },
      { offset: .5, transform: `translate3d(${-drift}px, ${-travel * .43}px, 0) scale(.86)`, opacity: 1, easing: 'ease-in-out' },
      { offset: .73, transform: `translate3d(${drift * .8}px, ${-travel * .75}px, 0) scale(.72)`, opacity: .9, easing: 'ease-in-out' },
      { offset: .88, transform: `translate3d(${-drift * .45}px, ${-travel * .9}px, 0) scale(.65)`, opacity: .5, easing: 'ease-in-out' },
      { offset: 1, transform: `translate3d(${drift * .2}px, ${-travel}px, 0) scale(.6)`, opacity: 0 }
    ], { duration: 2800, fill: 'forwards' });

    setTimeout(() => {
      layer.style.opacity = '0';
      flightAnimation.cancel();
      setTimeout(() => {
        fadeAnimation = layer.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600,
          easing: 'ease-out',
          fill: 'forwards'
        });
        setTimeout(() => {
          layer.style.opacity = '1';
          fadeAnimation.cancel();
          lantern.style.removeProperty('pointer-events');
          flying = false;
        }, 600);
      }, 2000);
    }, 2800);
  }

  lantern.addEventListener('click', launch);
  lantern.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    launch();
  });
})();
