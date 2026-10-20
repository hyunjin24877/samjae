(() => {
  const boat = document.querySelector('.result-method .method-deco[data-src$="/boat.webp"]');
  const method = boat?.closest('.result-method');
  if (!boat || !method) return;

  const layer = document.createElement('span');
  layer.className = 'boat-sail-layer';
  method.append(layer);
  layer.append(boat);

  boat.setAttribute('role', 'button');
  boat.setAttribute('tabindex', '0');
  boat.setAttribute('aria-label', '배 띄우기');

  let pending = 0;
  let moving = false;
  let resetting = false;
  let distance = 0;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const zoom = () => layer.getBoundingClientRect().width / layer.offsetWidth || 1;
  const place = x => { layer.style.transform = `translate3d(${x}px, 0, 0)`; };

  async function sail() {
    if (boat.hidden || !boat.currentSrc || resetting) return;
    boat.dataset.boatReplay = 'true';
    boat.classList.remove('is-fading');
    pending += 1;
    if (moving) return;
    moving = true;

    try {
      while (pending && !resetting) {
        pending -= 1;
        const scale = zoom();
        const start = distance / scale;
        const end = (distance - 20) / scale;
        const bob = 4 / scale;
        layer.style.transformOrigin = `${boat.offsetLeft + boat.offsetWidth / 2}px ${boat.offsetTop + boat.offsetHeight / 2}px`;
        place(start);

        const step = layer.animate([
          { offset: 0, transform: `translate3d(${start}px, 0, 0) rotate(0deg)` },
          { offset: .3, transform: `translate3d(${start + (end - start) * .3}px, ${-bob}px, 0) rotate(-2deg)` },
          { offset: .7, transform: `translate3d(${start + (end - start) * .7}px, ${bob * .5}px, 0) rotate(2deg)` },
          { offset: 1, transform: `translate3d(${end}px, 0, 0) rotate(0deg)` }
        ], { duration: 500, easing: 'ease-in-out', fill: 'forwards' });
        await step.finished;
        distance -= 20;
        place(end);
        step.cancel();

        if (boat.getBoundingClientRect().left > 0) continue;
        resetting = true;
        pending = 0;
        boat.style.pointerEvents = 'none';
        const remaining = (boat.getBoundingClientRect().right + 30) / zoom();
        const exit = layer.animate([
          { transform: `translate3d(${end}px, 0, 0)` },
          { transform: `translate3d(${end - remaining * .5}px, ${-bob}px, 0)` },
          { transform: `translate3d(${end - remaining}px, 0, 0)` }
        ], { duration: 650, easing: 'ease-in-out', fill: 'forwards' });
        await exit.finished;
        layer.style.opacity = '0';
        exit.cancel();
        place(0);
        await wait(2000);
        const fade = layer.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 500, easing: 'ease-out', fill: 'forwards'
        });
        await fade.finished;
        layer.style.opacity = '1';
        fade.cancel();
        distance = 0;
        boat.style.removeProperty('pointer-events');
        resetting = false;
      }
    } catch (error) {
      if (error.name !== 'AbortError') console.error('배 띄우기 모션 오류:', error);
      layer.getAnimations().forEach(animation => animation.cancel());
      layer.style.opacity = '1';
      place(0);
      distance = 0;
      pending = 0;
      resetting = false;
      boat.style.removeProperty('pointer-events');
    } finally {
      moving = false;
    }
  }

  boat.addEventListener('click', sail);
  boat.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    sail();
  });
  boat.addEventListener('dragstart', event => event.preventDefault());

  window.addEventListener('resize', () => {
    if (!moving && !resetting) place(distance / zoom());
  });
})();
