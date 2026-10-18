(() => {
  const riceImages = document.querySelectorAll('.result-method .method-deco[data-src$="/rice2.gif"]');
  if (!riceImages.length) return;
  const plusOneSource = '../img/result/+1.svg';
  const preload = new Image();
  preload.src = plusOneSource;
  const plusOneSound = new Audio(sitePath('sound/+1.mp3'));
  plusOneSound.preload = 'auto';
  let plusOneSoundTimer;

  riceImages.forEach(rice => {
    rice.addEventListener('click', event => {
      if (rice.hidden || !rice.getAttribute('src')) return;

      const plusOne = document.createElement('img');
      plusOne.className = 'rice-plus-one';
      plusOne.src = plusOneSource;
      plusOne.alt = '';
      plusOne.setAttribute('aria-hidden', 'true');
      plusOne.style.left = `${event.clientX}px`;
      plusOne.style.top = `${event.clientY - 4}px`;
      document.body.append(plusOne);
      clearTimeout(plusOneSoundTimer);
      plusOneSound.pause();
      plusOneSound.currentTime = 0;
      plusOneSound.play().catch(() => {});
      plusOneSoundTimer = setTimeout(() => {
        plusOneSound.pause();
        plusOneSound.currentTime = 0;
      }, 500);
      plusOne.addEventListener('animationend', () => plusOne.remove(), { once: true });
      window.setTimeout(() => plusOne.remove(), 1000);
    });
  });
})();
