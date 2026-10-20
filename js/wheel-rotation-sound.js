(() => {
  window.createWheelRotationSound = () => {
    const sound = new Audio(sitePath('sound/rotation.mp3'));
    sound.preload = 'auto';
    sound.loop = true;
    sound.preservesPitch = false;

    let wheel = null;
    let animation = null;
    let frame = 0;
    let lastAngle = null;
    let lastTime = 0;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      wheel = null;
      animation = null;
      lastAngle = null;
      lastTime = 0;
      sound.pause();
      sound.currentTime = 0;
      sound.playbackRate = 1;
      sound.volume = 1;
    }

    function followSpeed(time) {
      if (!wheel || !animation || animation.playState !== 'running') return;

      const transform = getComputedStyle(wheel).transform;
      if (transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(transform);
        const angle = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
        const elapsed = time - lastTime;
        if (lastAngle !== null && elapsed > 0 && elapsed < 100) {
          const delta = ((angle - lastAngle + 540) % 360) - 180;
          const degreesPerSecond = Math.abs(delta) * 1000 / elapsed;
          const targetRate = Math.min(2.5, 0.75 + degreesPerSecond / 300);
          sound.playbackRate += (targetRate - sound.playbackRate) * Math.min(1, elapsed / 90);
        }
        lastAngle = angle;
        lastTime = time;
      }
      frame = requestAnimationFrame(followSpeed);
    }

    // 긴 결과 전환 중에도 클릭 시점의 오디오 재생 권한을 유지합니다.
    function prime() {
      sound.volume = 0;
      sound.play().catch(() => {});
    }

    function start(element, wheelAnimation) {
      cancelAnimationFrame(frame);
      wheel = element;
      animation = wheelAnimation;
      lastAngle = null;
      lastTime = 0;
      sound.currentTime = 0;
      sound.playbackRate = 0.75;
      sound.volume = 1;
      sound.play().catch(() => {});
      frame = requestAnimationFrame(followSpeed);
      wheelAnimation.finished.then(() => {
        if (animation === wheelAnimation) stop();
      }).catch(() => {
        if (animation === wheelAnimation) stop();
      });
    }

    return { prime, start, stop };
  };
})();
