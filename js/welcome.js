(() => {
  const scene = document.querySelector('.welcome-intro');
  if (!scene) return;
  const letter = scene.querySelector('.modal');
  const closed = scene.querySelector('.welcome-envelope-closed');
  const front = scene.querySelector('.welcome-envelope-front');
  const back = scene.querySelector('.welcome-envelope-back');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];
  let stopped = false;
  // 등장 → 짧은 정지 → 봉투 열림과 편지 상승을 겹쳐서 연결.
  const timings = { enter: 700, hold: 450, lower: 1000, open: 1100, letter: 1800, settle: 1200 };
  function animate(element, frames, duration, delay = 0) {
    const animation = element.animate(frames, {
      duration: duration * 0.4, delay: delay * 0.4, fill: 'both', easing: 'cubic-bezier(0.33, 0, 0.2, 1)'
    });
    animations.push(animation);
    return animation.finished;
  }
  function finish() {
    stopped = true;
    scene.classList.add('is-complete');
    scene.removeAttribute('aria-busy');
    animations.forEach(animation => animation.cancel());
  }
  const onPreference = () => { if (preference.matches) finish(); };
  preference.addEventListener('change', onPreference);
  async function play() {
    try {
      if (preference.matches) return;
      await window.waitForSiteAssets(Promise.all([...scene.querySelectorAll('img')].map(img => img.decode().catch(() => {}))));
      if (stopped) return;
      const sceneRect = scene.getBoundingClientRect();
      const closedRect = closed.getBoundingClientRect();
      const centerOffset = sceneRect.top + sceneRect.height / 2
        - (closedRect.top + closedRect.height / 2);
      await animate(closed, [
        { opacity: 0, transform: `translateY(${centerOffset + 18}px)` },
        { opacity: 1, transform: `translateY(${centerOffset}px)` }
      ], timings.enter);
      await animate(closed, [{ opacity: 1 }, { opacity: 1 }], timings.hold);
      await animate(closed, [
        { transform: `translateY(${centerOffset}px)` },
        { transform: 'translateY(0)' }
      ], timings.lower);
      // 메뉴 아래에 여유를 남기고 최대 80px만 올린 뒤 봉투 앞으로 옮긴다.
      const headerBottom = document.querySelector('.header')?.getBoundingClientRect().bottom ?? 0;
      const letterTop = letter.getBoundingClientRect().top;
      // 회전하면서 올라가는 모서리 높이도 포함한다.
      const safeTop = headerBottom + 32 + letter.offsetWidth / 2 * Math.sin(4 * Math.PI / 180);
      const lift = Math.max(-80, safeTop - letterTop);
      await Promise.all([
        animate(closed, [{ opacity: 1 }, { opacity: 0 }], timings.open),
        animate(front, [{ opacity: 0 }, { opacity: 1 }], timings.open),
        animate(back, [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], timings.open),
        animate(letter, [
          { opacity: 0, transform: 'translateY(120px)', clipPath: 'inset(0 0 20% 0)' },
          { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0% 0)', offset: 0.4 },
          { opacity: 1, transform: `translateY(${lift}px)`, clipPath: 'inset(0 0 0% 0)' }
        ], timings.letter, 450)
      ]);
      letter.classList.add('is-over-envelope');
      await animate(letter, [
        { transform: `translateY(${lift}px) rotate(0deg)` },
        { transform: `translateY(${lift * 0.45}px) rotate(-4deg)`, offset: 0.5 },
        { transform: 'translateY(30px) rotate(-3deg)' }
      ], timings.settle);
    } catch (error) {
      if (error.name !== 'AbortError') console.error('인삿말 봉투 모션 오류:', error);
    } finally {
      finish();
      preference.removeEventListener('change', onPreference);
    }
  }
  play();
})();
