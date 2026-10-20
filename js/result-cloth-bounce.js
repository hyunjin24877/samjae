(() => {
  document.querySelectorAll('.result-method .method-deco[data-src$="/cloth.webp"]').forEach(cloth => {
    const method = cloth.closest('.result-method');
    const layer = document.createElement('span');
    layer.className = 'cloth-bounce-layer';
    method.append(layer);
    layer.append(cloth);
    cloth.setAttribute('role', 'button');
    cloth.setAttribute('tabindex', '0');
    cloth.setAttribute('aria-label', '옷 튕기기');

    let bounce;
    function play() {
      if (cloth.hidden || !cloth.currentSrc) return;
      bounce?.cancel();
      layer.style.transformOrigin = `${cloth.offsetLeft + cloth.offsetWidth / 2}px ${cloth.offsetTop + cloth.offsetHeight / 2}px`;
      bounce = layer.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], { duration: 400, easing: 'ease-in-out' });
    }

    cloth.addEventListener('click', play);
    cloth.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      play();
    });
    cloth.addEventListener('dragstart', event => event.preventDefault());
  });
})();
