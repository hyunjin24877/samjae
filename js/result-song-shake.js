(() => {
  document.querySelectorAll('.result-method .method-deco[data-src$="/song.gif"]').forEach(song => {
    const method = song.closest('.result-method');
    const layer = document.createElement('span');
    layer.className = 'song-shake-layer';
    method.append(layer);
    layer.append(song);
    song.setAttribute('role', 'button');
    song.setAttribute('tabindex', '0');
    song.setAttribute('aria-label', '독경문 흔들기');

    let shaking = false;
    function shake() {
      if (shaking || song.hidden || !song.currentSrc) return;
      shaking = true;
      layer.style.transformOrigin = `${song.offsetLeft + song.offsetWidth / 2}px ${song.offsetTop + song.offsetHeight / 2}px`;
      const zoom = layer.getBoundingClientRect().width / layer.offsetWidth || 1;
      const maxShift = 4 / zoom;
      const beats = [
        [0, 0], [140, -.12], [300, .15],
        [350, -.3], [400, .4], [450, -.5], [490, .55],
        [530, -.6], [565, .7], [600, -.75],
        [625, .8], [650, -.85], [675, .9], [700, -1],
        [725, 1], [750, -1], [775, 1], [800, -1]
      ];
      const frames = beats.map(([time, amount]) => ({
        offset: time / 800,
        transform: `translateX(${(amount * maxShift).toFixed(3)}px) rotate(${amount * 2}deg)`
      }));
      const animation = layer.animate(frames, { duration: 800, easing: 'linear' });
      animation.addEventListener('finish', () => {
        animation.cancel();
        shaking = false;
      }, { once: true });
    }

    song.addEventListener('click', shake);
    song.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      shake();
    });
    song.addEventListener('dragstart', event => event.preventDefault());
  });
})();
