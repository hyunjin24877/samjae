(() => {
  const gosire = document.querySelector('.result-method .method-deco[data-src$="/gosire.webp"]');
  const method = gosire?.closest('.result-method');
  if (!gosire || !method) return;

  const layer = document.createElement('span');
  layer.className = 'gosire-tilt-layer';
  method.append(layer);
  layer.append(gosire);

  // The bottle points left; pivot near its lower-right body so the mouth dips.
  const placePivot = () => {
    layer.style.transformOrigin = `${gosire.offsetLeft + gosire.offsetWidth * .78}px ${gosire.offsetTop + gosire.offsetHeight * .68}px`;
  };

  gosire.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse' || gosire.hidden || !gosire.currentSrc) return;
    placePivot();
    layer.classList.add('is-hovered');
  });
  gosire.addEventListener('pointerleave', () => layer.classList.remove('is-hovered'));
  window.addEventListener('resize', () => {
    if (layer.classList.contains('is-hovered')) placePivot();
  });
})();
