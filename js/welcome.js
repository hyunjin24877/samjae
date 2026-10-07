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
  const timings = { enter: 700, hold: 450, lower: 1000, open: 1100, letter: 1800 };
  // letter-1 첫 등장 위치: 값을 키우면 더 아래에서 나타난다.
  const closedStartOffsetY = 80;
  function animate(element, frames, duration, delay = 0) {
    const animation = element.animate(frames, {
      duration, delay, fill: 'both', easing: 'cubic-bezier(0.33, 0, 0.2, 1)'
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
        - (closedRect.top + closedRect.height / 2) + closedStartOffsetY;
      await animate(closed, [
        { opacity: 0, transform: `translateY(${centerOffset + 18}px)` },
        { opacity: 1, transform: `translateY(${centerOffset}px)` }
      ], timings.enter);
      await animate(closed, [{ opacity: 1 }, { opacity: 1 }], timings.hold);
      await animate(closed, [
        { transform: `translateY(${centerOffset}px)` },
        { transform: 'translateY(0)' }
      ], timings.lower);
      // 열린 봉투는 닫힌 봉투가 내려온 자리에서 그대로 열린다.
      await Promise.all([
        animate(closed, [{ opacity: 1 }, { opacity: 0 }], timings.open),
        animate(front, [{ opacity: 0 }, { opacity: 1 }], timings.open),
        animate(back, [{ opacity: 0 }, { opacity: 1 }], timings.open),
        animate(letter, [
          { opacity: 0, transform: 'translateY(200px)', clipPath: 'inset(0 0 20% 0)' },
          { opacity: 1, transform: 'translateY(60px)', clipPath: 'inset(0 0 0% 0)', offset: 0.4 },
          { opacity: 1, transform: 'translateY(-20px)', clipPath: 'inset(0 0 0% 0)' }
        ], timings.letter, 450)
      ]);
      letter.classList.add('is-over-envelope');
    } catch (error) {
      if (error.name !== 'AbortError') console.error('인삿말 봉투 모션 오류:', error);
    } finally {
      finish();
      preference.removeEventListener('change', onPreference);
    }
  }
  play();
})();
