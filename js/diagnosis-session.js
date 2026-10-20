(() => {
  // Resolve dynamic assets and navigation from this script's site directory.
  // This supports both localhost / and GitHub Pages /samjae/, including result pages.
  const siteRoot = new URL('../', document.currentScript.src);
  window.sitePath = path => {
    const url = new URL(path.replace(/^\/+/, ''), siteRoot);
    return url.pathname + url.search + url.hash;
  };

  // Decorative images must never indefinitely block navigation or input.
  window.waitForSiteAssets = (ready, milliseconds = 500) => new Promise(resolve => {
    const timer = setTimeout(resolve, milliseconds);
    Promise.resolve(ready).catch(() => {}).then(() => {
      clearTimeout(timer);
      resolve();
    });
  });

  const backgroundSound = new Audio(window.sitePath('sound/background.mp3'));
  backgroundSound.preload = 'auto';
  backgroundSound.loop = true;
  backgroundSound.volume = 0.22;
  const backgroundPositionKey = 'samjaeBackgroundPosition';
  const savedPosition = Number(sessionStorage.getItem(backgroundPositionKey));
  if (Number.isFinite(savedPosition) && savedPosition > 0) {
    backgroundSound.currentTime = savedPosition;
  }
  const saveBackgroundPosition = () => {
    if (Number.isFinite(backgroundSound.currentTime)) {
      sessionStorage.setItem(backgroundPositionKey, String(backgroundSound.currentTime));
    }
  };
  const startBackground = () => {
    if (document.hidden) return;
    backgroundSound.play().catch(() => {});
  };
  backgroundSound.addEventListener('timeupdate', saveBackgroundPosition);
  window.addEventListener('pagehide', saveBackgroundPosition);
  document.addEventListener('pointerdown', startBackground, true);
  document.addEventListener('keydown', startBackground, true);
  document.addEventListener('click', startBackground, true);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      backgroundSound.pause();
      saveBackgroundPosition();
    } else {
      startBackground();
    }
  });
  startBackground();

  // 상단 모빌이 있는 화면에 방울과 잔잔한 바람 소리를 더합니다.
  document.addEventListener('DOMContentLoaded', () => {
    const mobileVideo = document.querySelector('video.back2');
    if (!mobileVideo) return;

    const mobileBell = new Audio(window.sitePath('sound/background_bell.mp3'));
    mobileBell.preload = 'auto';
    mobileBell.loop = true;
    mobileBell.volume = 0.45;

    const mobileWind = new Audio(window.sitePath('sound/background_wind.mp3'));
    mobileWind.preload = 'auto';
    mobileWind.loop = true;
    mobileWind.volume = 0;
    let windFadeFrame;
    let windTarget = 0;

    const fadeWind = (target, duration, onComplete) => {
      cancelAnimationFrame(windFadeFrame);
      windTarget = target;
      const initial = mobileWind.volume;
      const start = performance.now();
      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        mobileWind.volume = initial + (target - initial) * progress;
        if (progress < 1) {
          windFadeFrame = requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };
      windFadeFrame = requestAnimationFrame(step);
    };

    const startMobileAudio = () => {
      if (document.hidden) return;
      if (mobileVideo.paused) mobileVideo.play().catch(() => {});
      mobileBell.play().catch(() => {});
      mobileWind.play().then(() => {
        if (!document.hidden && windTarget !== 0.18) fadeWind(0.18, 900);
      }).catch(() => {});
    };

    const stopMobileAudio = () => {
      mobileBell.pause();
      cancelAnimationFrame(windFadeFrame);
      mobileWind.pause();
      mobileWind.volume = 0;
      windTarget = 0;
    };

    mobileVideo.addEventListener('play', startMobileAudio);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopMobileAudio();
      else startMobileAudio();
    });
    document.addEventListener('pointerdown', startMobileAudio, true);
    document.addEventListener('click', startMobileAudio, true);
    document.addEventListener('keydown', startMobileAudio, true);
    window.addEventListener('pageshow', startMobileAudio);
    window.addEventListener('pagehide', stopMobileAudio);
    startMobileAudio();
  });

  const clickSound = new Audio(window.sitePath('sound/click.mp3'));
  clickSound.preload = 'auto';
  clickSound.volume = 1;
  const clickTargets = '.header .gnb-button:not(.current), .header .circle-btn, .result-tags .result-type-button';
  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest(clickTargets);
    if (!control || (event.relatedTarget instanceof Node && control.contains(event.relatedTarget))) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }, true);
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest('#diagnosisPrev, #diagnosisNext:not(.is-disabled), #resultPrint:not(:disabled), a.result-action[href]');
    if (!control) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    if (control.matches('a.result-action[href]') && event.button === 0 &&
        !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      setTimeout(() => { location.href = control.href; }, 220);
    }
  }, true);

  const keys = [
    'diagnosisName', 'diagnosisSituation', 'diagnosisMethod',
    'diagnosisEnvironment', 'diagnosisBelief', 'diagnosisSubject'
  ];
  const versionKey = 'diagnosisResetVersion';
  const version = () => sessionStorage.getItem(versionKey);
  let pageVersion = version();

  window.resetDiagnosisSession = () => {
    keys.forEach(key => sessionStorage.removeItem(key));
    sessionStorage.setItem(versionKey, `${Date.now()}-${Math.random()}`);
  };

  document.addEventListener('click', event => {
    const control = event.target.closest('a, button');
    if (!control) return;
    const home = control.querySelector('img[src$="/home.svg"]');
    if (home || control.matches('#diagnosisReset, .result-retry')) {
      window.resetDiagnosisSession();
    }
  }, true);

  const isHome = () => location.pathname.endsWith('/samjae/landing.html');
  if (isHome()) {
    window.resetDiagnosisSession();
    pageVersion = version();
  }
  window.addEventListener('pageshow', event => {
    if (isHome() && event.persisted) window.resetDiagnosisSession();
    // 홈이나 다시하기 이후 뒤로가기로 복원된 진단 화면에도 이전 답을 남기지 않는다.
    if (event.persisted && /\/diagnosis(?:-[2-5])?\.html$/.test(location.pathname) && pageVersion !== version()) {
      location.replace(sitePath('diagnosis.html'));
    }
  });
})();
