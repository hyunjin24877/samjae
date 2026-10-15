(() => {
  const icons = document.querySelectorAll('.result-method .method-deco[data-src$="/chiseong.gif"]');
  for (const icon of icons) {
    icon.setAttribute('role', 'button');
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('aria-label', '치성 점프');

    const jump = () => {
      if (icon.hidden || !icon.currentSrc || icon.classList.contains('chiseong-jumping')) return;
      icon.classList.add('chiseong-jumping');
    };

    icon.addEventListener('click', jump);
    icon.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      jump();
    });
    icon.addEventListener('animationend', event => {
      if (event.animationName === 'chiseong-jump') icon.classList.remove('chiseong-jumping');
    });
    icon.addEventListener('dragstart', event => event.preventDefault());
  }
})();
