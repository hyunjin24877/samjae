(() => {
  const cake = document.querySelector('.result-method .method-deco[data-src$="/sirutdeok.webp"]');
  const method = cake?.closest('.result-method');
  if (!cake || !method) return;

  const stack = document.createElement('span');
  stack.className = 'siru-stack-layer';
  method.append(stack);
  stack.append(cake);

  // This still is taken from the finished frame of the existing WebP.
  const layerSource = '../img/result/sirutdeok-layer.png';
  const preloadedLayer = new Image();
  preloadedLayer.src = layerSource;
  const added = [];
  let pointerId = null;
  let startY = 0;
  let handled = false;
  let resetting = false;
  let wobble;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  cake.setAttribute('role', 'button');
  cake.setAttribute('tabindex', '0');
  cake.setAttribute('aria-label', '시루떡을 위로 드래그해 쌓기');

  async function resetAfterFifth(entrance) {
    try {
      await entrance.finished;
      await wait(2000);
      while (added.length) {
        const topLayer = added.pop();
        const exit = topLayer.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-8px)' }
        ], { duration: 180, easing: 'ease-in', fill: 'forwards' });
        await exit.finished;
        topLayer.remove();
      }
    } finally {
      added.splice(0).forEach(layer => layer.remove());
      resetting = false;
    }
  }

  function addLayer() {
    if (resetting || added.length >= 5 || cake.hidden || !cake.currentSrc) return;
    cake.dataset.siruStack = 'true';
    cake.classList.remove('is-fading');

    const step = cake.offsetWidth * .2;
    const level = added.length + 1;
    const newLayer = document.createElement('img');
    newLayer.className = 'siru-added-layer';
    newLayer.src = preloadedLayer.src;
    newLayer.alt = '';
    newLayer.setAttribute('aria-hidden', 'true');
    newLayer.style.left = `${cake.offsetLeft}px`;
    newLayer.style.top = `${cake.offsetTop - step * level}px`;
    newLayer.style.width = `${cake.offsetWidth}px`;
    newLayer.style.height = `${cake.offsetHeight}px`;
    stack.append(newLayer);
    added.push(newLayer);

    const entrance = newLayer.animate([
      { opacity: 0, transform: `translateY(${step * .55}px)` },
      { opacity: 1, transform: 'translateY(-3px)', offset: .75 },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 300, easing: 'ease-out' });

    stack.style.transformOrigin = `${cake.offsetLeft + cake.offsetWidth / 2}px ${cake.offsetTop + cake.offsetHeight / 2}px`;
    wobble?.cancel();
    wobble = stack.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(-.7deg)' },
      { transform: 'rotate(.5deg)' },
      { transform: 'rotate(0deg)' }
    ], { duration: 220, easing: 'ease-in-out' });

    if (level === 5) {
      resetting = true;
      resetAfterFifth(entrance).catch(error => console.error('시루떡 초기화 오류:', error));
    }
  }

  cake.addEventListener('pointerdown', event => {
    if (event.button !== 0 || pointerId !== null || resetting || cake.hidden || !cake.currentSrc) return;
    event.preventDefault();
    pointerId = event.pointerId;
    startY = event.clientY;
    handled = false;
    try { cake.setPointerCapture(pointerId); } catch (_) { /* Capture may be unavailable. */ }
  });
  cake.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId || handled || resetting) return;
    if (startY - event.clientY < 20) return;
    handled = true;
    addLayer();
  });
  function endDrag(event) {
    if (event.pointerId !== pointerId) return;
    if (event.type === 'pointerup' && !handled && startY - event.clientY >= 20) addLayer();
    pointerId = null;
    handled = false;
  }
  cake.addEventListener('pointerup', endDrag);
  cake.addEventListener('pointercancel', endDrag);
  cake.addEventListener('lostpointercapture', endDrag);
  cake.addEventListener('keydown', event => {
    if (event.repeat || !['ArrowUp', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    addLayer();
  });
  cake.addEventListener('dragstart', event => event.preventDefault());
})();
