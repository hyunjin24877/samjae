(() => {
  const tags = document.querySelectorAll('.example-filter-btn, .samjaerok-tab');
  if (!tags.length) return;

  const sound = new Audio(sitePath('sound/click2.mp3'));
  sound.preload = 'auto';
  sound.volume = 0.45;

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    });
  });
})();
