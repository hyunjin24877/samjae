(() => {
  const assets = [
    ['writer', 'writer.webp'],
    ['paper', 'paper.webp'],
    ['knife', 'cutting the bottom of a knife.gif'],
    ['knife', 'knife.webp']
  ];

  assets.forEach(([kind, filename]) => {
    const image = document.querySelector(`.result-method .method-deco[data-src$="/${filename}"]`);
    const method = image?.closest('.result-method');
    if (!image || !method) return;

    const layer = document.createElement('span');
    layer.className = 'result-simple-motion-layer';
    layer.dataset.motion = kind;
    method.append(layer);
    layer.append(image);

    const setPivot = () => {
      layer.style.transformOrigin = `${image.offsetLeft + image.offsetWidth / 2}px ${image.offsetTop + image.offsetHeight / 2}px`;
    };

    if (kind === 'writer') {
      let pop;
      image.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse' || image.hidden || !image.currentSrc) return;
        setPivot();
        layer.classList.add('is-hovered');
        pop?.cancel();
        pop = layer.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.08)' },
          { transform: 'scale(1)' }
        ], { duration: 500, easing: 'ease-in-out' });
      });
      image.addEventListener('pointerleave', () => layer.classList.remove('is-hovered'));
    }

    if (kind === 'paper') {
      image.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse' || image.hidden || !image.currentSrc) return;
        setPivot();
        layer.classList.add('is-hovered');
      });
      image.addEventListener('pointerleave', () => layer.classList.remove('is-hovered'));
    }

    if (kind === 'knife') {
      image.setAttribute('role', 'button');
      image.setAttribute('tabindex', '0');
      image.setAttribute('aria-label', '칼 흔들기');
      let shake;
      const play = () => {
        if (image.hidden || !image.currentSrc) return;
        setPivot();
        shake?.cancel();
        shake = layer.animate([
          { offset: 0, transform: 'translateX(0) rotate(0deg)' },
          { offset: .1, transform: 'translateX(8px) rotate(3deg)' },
          { offset: .22, transform: 'translateX(-8px) rotate(-3deg)' },
          { offset: .34, transform: 'translateX(7px) rotate(2.5deg)' },
          { offset: .46, transform: 'translateX(-6px) rotate(-2deg)' },
          { offset: .58, transform: 'translateX(5px) rotate(1.5deg)' },
          { offset: .7, transform: 'translateX(-4px) rotate(-1deg)' },
          { offset: .82, transform: 'translateX(2px) rotate(.5deg)' },
          { offset: 1, transform: 'translateX(0) rotate(0deg)' }
        ], { duration: 500, easing: 'ease-out' });
      };
      image.addEventListener('click', play);
      image.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        play();
      });
      image.addEventListener('dragstart', event => event.preventDefault());
    }
  });
})();
