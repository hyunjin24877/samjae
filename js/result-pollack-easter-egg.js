(() => {
  const fish = document.querySelectorAll(
    '.result-method .method-deco[data-src$="/pollack.webp"]'
  );
  if (!fish.length) return;

  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  fish.forEach(image => {
    const method = image.closest('.result-method');
    if (!method) return;

    // result.js가 북어를 method의 직접 자식으로 옮긴 뒤 실행됩니다.
    const layer = document.createElement('span');
    layer.className = 'pollack-easter-egg-layer';
    layer.style.setProperty('--pollack-mobile-width',
      getComputedStyle(image).getPropertyValue('--motion-mobile-width').trim());
    image.before(layer);
    layer.append(image);

    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    image.setAttribute('aria-label', '북어를 클릭해 살려내기');

    let clicks = 0;
    let busy = false;
    let engaged = false;

    // 기존 5.32초 모션은 그대로 재생합니다. 클릭한 뒤 자동 숨김이 오면
    // 같은 북어 요소에 원래 소스를 다시 연결해 반복 인터랙션을 유지합니다.
    const observer = new MutationObserver(() => {
      if (!engaged || (!image.hidden && image.hasAttribute('src'))) return;
      image.hidden = false;
      image.classList.remove('is-fading');
      if (!image.hasAttribute('src')) image.src = image.dataset.src;
    });
    observer.observe(image, { attributes: true, attributeFilter: ['hidden', 'src'] });

    function setPivot() {
      const fishRect = image.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();
      layer.style.transformOrigin = `${fishRect.left - layerRect.left + fishRect.width / 2}px ${fishRect.top - layerRect.top + fishRect.height / 2}px`;
      return fishRect;
    }

    async function flap(degrees, duration) {
      const animation = layer.animate([
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${-degrees}deg)` },
        { transform: `rotate(${degrees}deg)` },
        { transform: `rotate(${-degrees * 0.7}deg)` },
        { transform: `rotate(${degrees * 0.5}deg)` },
        { transform: 'rotate(0deg)' }
      ], { duration, easing: 'ease-in-out' });
      await animation.finished;
    }

    async function escape(fishRect) {
      const distance = Math.max(0, window.innerWidth - fishRect.left + fishRect.width + 80);
      const animation = layer.animate([
        { transform: 'translateX(0) rotate(0deg)', offset: 0 },
        { transform: `translateX(${distance * 0.14}px) rotate(-15deg)`, offset: 0.18 },
        { transform: `translateX(${distance * 0.36}px) rotate(14deg)`, offset: 0.38 },
        { transform: `translateX(${distance * 0.61}px) rotate(-12deg)`, offset: 0.61 },
        { transform: `translateX(${distance * 0.83}px) rotate(10deg)`, offset: 0.82 },
        { transform: `translateX(${distance}px) rotate(0deg)`, offset: 1 }
      ], { duration: 1300, easing: 'ease-in', fill: 'forwards' });
      await animation.finished;
      layer.style.visibility = 'hidden';
      layer.style.opacity = '0';
      animation.cancel();
      await wait(2000);
      layer.style.visibility = '';
      requestAnimationFrame(() => { layer.style.opacity = '1'; });
      clicks = 0;
    }

    async function activate() {
      if (busy || image.hidden || !image.hasAttribute('src')) return;
      busy = true;
      engaged = true;
      layer.classList.add('is-engaged');
      clicks += 1;
      const fishRect = setPivot();
      try {
        if (clicks === 1) await flap(12, 400);
        else if (clicks === 2) await flap(20, 600);
        else await escape(fishRect);
      } catch (error) {
        if (error.name !== 'AbortError') console.error('북어 모션 오류:', error);
      } finally {
        busy = false;
      }
    }

    image.addEventListener('click', activate);
    image.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate();
    });
  });
})();
