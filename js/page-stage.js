(function () {
  function resizeStage() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1);
    document.documentElement.style.setProperty('--page-scale', scale);
  }

  document.body.classList.add('site-stage');
  resizeStage();
  window.addEventListener('resize', resizeStage);
})();
