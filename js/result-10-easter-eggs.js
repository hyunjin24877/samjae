(() => {
  const icons = document.querySelectorAll(
    '.result-method .result-10-motion-panttie-1[data-src$="panttie.webp"], ' +
    '.result-method .result-10-motion-house-1[data-src$="house.webp"]'
  );

  for (const icon of icons) {
    icon.setAttribute('role', 'button');
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('aria-label', icon.classList.contains('result-10-motion-house-1')
      ? '집 커졌다 작아지기' : '불타는 속옷 커졌다 작아지기');

    const pop = () => {
      if (icon.hidden || !icon.currentSrc || icon.classList.contains('result-10-pop')) return;
      icon.classList.add('result-10-pop');
    };

    icon.addEventListener('click', pop);
    icon.addEventListener('animationend', event => {
      if (event.animationName === 'result-10-pop') icon.classList.remove('result-10-pop');
    });
    icon.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      pop();
    });
    icon.addEventListener('dragstart', event => event.preventDefault());
  }
})();
