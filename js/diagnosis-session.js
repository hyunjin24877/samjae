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
