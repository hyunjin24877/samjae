(() => {
  const coins = [...document.querySelectorAll(
    '.result-method .method-deco[data-src$="/money1.gif"], .result-method .method-deco[data-src$="/money2.webp"]'
  )];
  if (!coins.length) return;

  const fortunes = [
    '오늘의 불운은 내일의 이야깃거리가 될지도 모릅니다.',
    '길을 잘못 들었다면, 새로운 길을 발견한 셈입니다.',
    '나쁜 징조도 해석하기 나름입니다.',
    '오늘은 작은 우연을 좋은 징조로 여겨보세요.',
    '걱정하던 일은 생각보다 별일 아닐 수 있습니다.',
    '액운이 찾아왔다면, 잠시 쉬어가라는 신호일지도 모릅니다.',
    '모든 징조에 의미를 부여할 필요는 없습니다.',
    '운명을 바꾸는 것은 징조가 아니라 당신의 선택입니다.',
    '꽝! 더 해보세요~'
  ];

  // 채록 페이지의 dialog 구조와 클래스, 배경과 닫기 아이콘을 재사용합니다.
  const popup = document.createElement('dialog');
  popup.className = 'example-popup';
  popup.id = 'examplePopup';
  popup.setAttribute('aria-labelledby', 'examplePopupTitle');
  popup.innerHTML = `
    <div class="example-popup-panel">
      <h2 class="body1-center-underline" id="examplePopupTitle">오늘의 점괘</h2>
      <p class="samjaerok-body-center" id="examplePopupText"></p>
    </div>
    <button type="button" class="example-popup-close" id="examplePopupClose" aria-label="팝업 닫기" autofocus>
      <img src="../img/example/x-button.svg" alt="">
    </button>`;
  document.body.append(popup);

  const panel = popup.querySelector('.example-popup-panel');
  const message = popup.querySelector('#examplePopupText');
  let previousIndex = -1;
  let lastTrigger = null;
  let spinning = false;

  function showFortune() {
    previousIndex = previousIndex < 0
      ? Math.floor(Math.random() * fortunes.length)
      : (previousIndex + 1 + Math.floor(Math.random() * (fortunes.length - 1))) % fortunes.length;
    message.textContent = fortunes[previousIndex];
    popup.showModal();
    const cursor = document.querySelector('.site-cursor');
    if (cursor) popup.append(cursor);
  }

  function activate(target) {
    if (target.hidden || popup.open || spinning) return;
    lastTrigger = target;
    if (!target.dataset.src.endsWith('/money2.webp') ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showFortune();
      return;
    }

    spinning = true;
    let finished = false;
    let fallback;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      target.removeEventListener('animationend', onAnimationEnd);
      target.classList.remove('fortune-coin-spinning');
      spinning = false;
      showFortune();
    };
    const onAnimationEnd = event => {
      if (event.target === target && event.animationName === 'fortuneCoinTurn') finish();
    };
    target.addEventListener('animationend', onAnimationEnd);
    target.classList.add('fortune-coin-spinning');
    fallback = window.setTimeout(finish, 600);
  }

  coins.forEach(image => {
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    image.setAttribute('aria-label', '동전을 눌러 오늘의 점괘 보기');
    image.addEventListener('click', () => activate(image));
    image.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate(image);
    });
  });

  popup.querySelector('.example-popup-close').addEventListener('click', () => popup.close());
  popup.addEventListener('click', event => {
    if (event.target !== popup) return;
    const rect = panel.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) popup.close();
  });
  popup.addEventListener('close', () => {
    const cursor = popup.querySelector('.site-cursor');
    if (cursor) document.documentElement.append(cursor);
    if (lastTrigger && !lastTrigger.hidden) lastTrigger.focus({ preventScroll: true });
  });
})();
