(() => {
  const paths = ['/samjae/diagnosis.html', ...[2, 3, 4, 5].map(n => `/samjae/diagnosis-${n}.html`)];
  const keys = [null, 'diagnosisMethod', 'diagnosisEnvironment', 'diagnosisBelief', 'diagnosisSubject'];
  let current = Math.max(0, paths.indexOf(location.pathname));
  let busy = false;
  let pendingPop = null;
  let stage;
  let cancelResultReveal = null;
  const ease = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = selector => stage.querySelector(selector);

  function normalize(root) {
    const wrap = root.querySelector('.diagnosis-open-wrap');
    wrap.id = 'diagnosisOpen';
    let motion = wrap.querySelector('.diagnosis-scroll-motion');
    if (!motion) {
      motion = document.createElement('div');
      motion.className = 'diagnosis-scroll-motion is-ready';
      motion.id = 'diagnosisScrollMotion';
      motion.innerHTML = `<div class="diagnosis-scroll-paper" aria-hidden="true"><img src="/samjae/img/diagnosis/scroll-middle.svg" alt=""></div>
        <img class="diagnosis-scroll-rod diagnosis-scroll-top" src="/samjae/img/diagnosis/scroll-top2.svg" alt="">
        <img class="diagnosis-scroll-rod diagnosis-scroll-bottom" src="/samjae/img/diagnosis/scroll-dowon2.svg" alt="">`;
      motion.append(wrap.querySelector('.diagnosis-result'));
      wrap.querySelector('.diagnosis-open')?.remove();
      wrap.prepend(motion);
    }
    return wrap;
  }
  function extract(root) {
    const main = document.createElement('main');
    main.className = 'diagnosis-main';
    main.id = 'diagnosisQuestionStage';
    main.append(normalize(root));
    const choices = root.querySelector('.diagnosis-choices');
    if (choices) main.append(choices);
    main.append(root.querySelector('.diagnosis-controls'));
    return main;
  }
  // Q1 기존 노드를 이동해 최초 진입 애니메이션과 입력 이벤트를 유지한다.
  const oldMain = document.querySelector('.diagnosis-main');
  stage = extract(document);
  if (oldMain) oldMain.replaceWith(stage); else document.body.append(stage);

  function stopCardVideos(root = stage) {
    root.querySelectorAll('.diagnosis-card-video').forEach(video => {
      video.onplaying = null;
      video.onerror = null;
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
      video.closest('[data-value]').classList.remove('is-video-playing');
    });
  }
  function playCardVideo(choice) {
    stopCardVideos();
    const video = choice.querySelector('.diagnosis-card-video');
    if (!video) return;
    video.muted = true;
    video.onplaying = () => {
      if (choice.isConnected && choice.classList.contains('is-selected')) {
        choice.classList.add('is-video-playing');
      }
    };
    video.onerror = () => choice.classList.remove('is-video-playing');
    video.play().catch(() => choice.classList.remove('is-video-playing'));
  }

  function updateNext() {
    const valid = current === 0
      ? $('#diagnosisName').value.trim() && $('#diagnosisSituation').value.trim()
      : $('.is-selected[data-value]');
    $('#diagnosisNext').classList.toggle('is-disabled', !valid);
    $('#diagnosisNextImg').src = `/samjae/img/diagnosis/diagnosis-next${valid ? '' : '-disable'}.svg`;
  }
  function restore() {
    if (current === 0) {
      for (const id of ['diagnosisName', 'diagnosisSituation']) {
        const input = $(`#${id}`);
        input.value = sessionStorage.getItem(id) || '';
        if (input.maxLength >= 0) {
          input.value = input.value.slice(0, input.maxLength);
          sessionStorage.setItem(id, input.value);
        }
        input.closest('.diagnosis-input-wrap').classList.toggle('is-filled', !!input.value.trim());
      }
    } else {
      const saved = sessionStorage.getItem(keys[current]);
      let selected = false;
      stage.querySelectorAll('[data-value]').forEach(choice => {
        const active = choice.dataset.value === saved;
        choice.classList.toggle('is-selected', active);
        selected ||= active;
      });
      $('.diagnosis-choices')?.classList.toggle('has-selection', selected);
    }
    updateNext();
  }
  function popup() {
    showIncompletePopup($('#diagnosisPopup'));
  }
  function save() {
    if (current === 0) {
      const name = $('#diagnosisName').value.trim();
      const situation = $('#diagnosisSituation').value.trim();
      sessionStorage.setItem('diagnosisName', name);
      sessionStorage.setItem('diagnosisSituation', situation);
      return !!(name && situation);
    }
    const selected = $('.is-selected[data-value]');
    if (!selected) return false;
    sessionStorage.setItem(keys[current], selected.dataset.value);
    return true;
  }
  function animate(el, frames, duration, delay = 0) {
    const animation = el.animate(frames, { duration: reduced() ? 1 : duration, delay: reduced() ? 0 : delay, easing: ease, fill: 'forwards' });
    return animation;
  }
  async function prepare(index) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let html;
    try {
      const response = await fetch(paths[index], { signal: controller.signal });
      if (!response.ok) throw new Error(`질문 로딩 실패: ${response.status}`);
      html = await response.text();
    } finally { clearTimeout(timeout); }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const next = extract(doc);
    const motion = next.querySelector('.diagnosis-scroll-motion');
    motion.classList.add('is-ready'); motion.removeAttribute('aria-busy');
    motion.querySelector('.diagnosis-scroll-top').src = '/samjae/img/diagnosis/scroll-top2.svg';
    motion.querySelector('.diagnosis-scroll-bottom').src = '/samjae/img/diagnosis/scroll-dowon2.svg';
    next.querySelector('.diagnosis-form')?.classList.add('is-visible');
    next.querySelector('.diagnosis-result').style.opacity = '0';
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = `/samjae/css/diagnosis-${index + 1}.css`; link.media = 'not all';
    let cssTimeout;
    const loaded = new Promise((resolve, reject) => {
      cssTimeout = setTimeout(() => reject(new Error('질문 스타일 로딩 시간 초과')), 8000);
      link.onload = resolve;
      link.onerror = () => reject(new Error('질문 스타일 로딩 실패'));
    });
    document.head.append(link);
    try {
      await Promise.all([loaded, window.waitForSiteAssets(Promise.all([...next.querySelectorAll('img')].map(img => img.decode().catch(() => {}))))]);
    } catch (error) { link.remove(); throw error; }
    finally { clearTimeout(cssTimeout); link.onload = link.onerror = null; }
    return { next, link };
  }
  async function fold(open) {
    const frames = [
      [$('.diagnosis-scroll-paper'), { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)' }],
      [$('.diagnosis-scroll-top'), { top: '50%', transform: 'translateY(-100%)' }, { top: '0%', transform: 'translateY(0%)' }],
      [$('.diagnosis-scroll-bottom'), { bottom: '50%', transform: 'translateY(100%)' }, { bottom: '0%', transform: 'translateY(0%)' }]
    ];
    const animations = frames.map(([el, closed, opened]) => animate(el, open ? [closed, opened] : [opened, closed], 280));
    if (open) animations.push(animate($('.diagnosis-result'), [{ opacity: 0 }, { opacity: 1 }], 120, 220));
    await Promise.all(animations.map(a => a.finished));
    // 종료 스타일을 먼저 고정하고 애니메이션을 제거한다.
    frames.forEach(([el, closed, opened]) => Object.assign(el.style, open ? opened : closed));
    if (open) $('.diagnosis-result').style.opacity = '1';
    animations.forEach(a => a.cancel());
  }
  async function go(index, push = true) {
    if (busy || index === current || index < 0 || index > 4) return;
    busy = true; stage.inert = true; stage.setAttribute('aria-busy', 'true');
    let prepared;
    let swapped = false;
    try {
      // 새 질문을 준비하는 동안 현재 질문을 유지한다.
      prepared = await prepare(index);
      const fade = animate($('.diagnosis-result'), [{ opacity: 1 }, { opacity: 0 }], 100);
      await fade.finished;
      $('.diagnosis-result').style.opacity = '0'; fade.cancel();
      await fold(false);
      const oldStyles = [...document.querySelectorAll('link[rel="stylesheet"]')].filter(link => /\/diagnosis-[1-5]\.css$/.test(new URL(link.href).pathname) && link !== prepared.link);
      const old = stage;
      stopCardVideos(old);
      stage = prepared.next;
      stage.inert = true;
      // 닫힌 족자와 숨겨진 질문을 준비한 뒤 DOM을 한 번에 교체한다.
      Object.assign($('.diagnosis-scroll-paper').style, { clipPath: 'inset(50% 0 50% 0)' });
      Object.assign($('.diagnosis-scroll-top').style, { top: '50%', transform: 'translateY(-100%)' });
      Object.assign($('.diagnosis-scroll-bottom').style, { bottom: '50%', transform: 'translateY(100%)' });
      prepared.link.media = 'all';
      oldStyles.forEach(link => link.remove());
      old.replaceWith(stage);
      current = index; swapped = true;
      restore();
      document.querySelector('.gnb')?.classList.add('is-intro-hidden');
      if (push && pendingPop === null) history.pushState({ diagnosis: index }, '', paths[index]);
      await fold(true);
    } catch (error) {
      console.error(error);
      if (!swapped) prepared?.link.remove();
      // A regular navigation is a reliable fallback when partial loading fails.
      location.assign(paths[index]);
    } finally {
      busy = false; stage.inert = false; stage.removeAttribute('aria-busy');
      if (pendingPop !== null) {
        const index = pendingPop; pendingPop = null;
        go(index, false);
      }
    }
  }
  const resultPages = {
    /* 산지 */

    "mountain-shamanism-community":
      "/samjae/diagnosis-result/diagnosis-result-05.html",

    "mountain-shamanism-individual":
      "/samjae/diagnosis-result/diagnosis-result-02.html",

    "mountain-religion-community": "/samjae/diagnosis-result/diagnosis-result-03.html",

    "mountain-religion-individual":
      "/samjae/diagnosis-result/diagnosis-result-04.html",

    /* 해안 */

    "ocean-shamanism-community": "/samjae/diagnosis-result/diagnosis-result-01.html",

    "ocean-shamanism-individual": "/samjae/diagnosis-result/diagnosis-result-06.html",

    "ocean-religion-community": "/samjae/diagnosis-result/diagnosis-result-07.html",

    "ocean-religion-individual": "/samjae/diagnosis-result/diagnosis-result-08.html",

    /* 평지 */

    "flat-shamanism-community": "/samjae/diagnosis-result/diagnosis-result-09.html",

    "flat-shamanism-individual": "/samjae/diagnosis-result/diagnosis-result-10.html",

    "flat-religion-community": "/samjae/diagnosis-result/diagnosis-result-11.html",

    "flat-religion-individual": "/samjae/diagnosis-result/diagnosis-result-12.html",
  };

  async function revealResult(url) {
    if (busy) return;
    // 원판의 맨 위 칸부터 시계 방향 순서 (도감과 동일).
    const wheelResults = ['05', '12', '01', '08', '09', '04', '06', '11', '02', '07', '10', '03'];
    const number = url.match(/-(\d{2})\.html$/)?.[1];
    const section = wheelResults.indexOf(number);
    if (section < 0) return;
    const timings = { hold: 250, extinguish: 160, reveal: 200, spin: 1800, settle: 250 };
    const overlay = document.createElement('section');
    overlay.className = 'diagnosis-result-reveal';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.innerHTML = `
      <div class="result-reveal-black"></div>
      <div class="result-reveal-loading">
        <div class="result-reveal-fires" aria-hidden="true">
          ${Array.from({ length: 3 }, () => '<img src="/samjae/img/diagnosis/fire2.webp" alt="">').join('')}
        </div>
        <p class="body2">당신에게 맞는 삼재풀이 방식을 점지하고 있습니다.<br>조금만 기다려주세요.</p>
      </div>
      <div class="result-reveal-wheel-wrap" aria-hidden="true">
        <img class="result-reveal-wheel" src="/samjae/img/gather/gather.svg" alt="">
        <img class="result-reveal-arrow" src="/samjae/img/gather/arrow.svg" alt="">
      </div>`;
    const animations = [];
    let cancelled = false;
    const run = (el, frames, duration, easing = ease) => {
      const animation = el.animate(frames, { duration: reduced() ? 1 : duration, easing, fill: 'forwards' });
      animations.push(animation);
      return animation.finished;
    };
    const cancel = () => {
      cancelled = true;
      animations.forEach(animation => animation.cancel());
    };
    cancelResultReveal = cancel;
    busy = true;
    stage.inert = true;
    document.body.classList.add('is-revealing-result');
    document.body.append(overlay);
    try {
      await window.waitForSiteAssets(Promise.all([...overlay.querySelectorAll('img')].map(img => img.decode().catch(() => {}))));
      if (cancelled) return;
      const loading = overlay.querySelector('.result-reveal-loading');
      await run(loading, [{ opacity: 1 }, { opacity: 1 }], timings.hold);
      for (const fire of [...overlay.querySelectorAll('.result-reveal-fires img')].reverse()) {
        await run(fire, [
          { opacity: 1, transform: 'scale(1)', filter: 'brightness(1)' },
          { opacity: 0.6, transform: 'scale(0.8, 0.65)', filter: 'brightness(0.6)', offset: 0.6 },
          { opacity: 0, transform: 'scale(0.4, 0)', filter: 'brightness(0.2)' }
        ], timings.extinguish);
      }
      const wheelWrap = overlay.querySelector('.result-reveal-wheel-wrap');
      await Promise.all([
        run(loading, [{ opacity: 1 }, { opacity: 0 }], timings.reveal),
        run(overlay.querySelector('.result-reveal-black'), [{ opacity: 1 }, { opacity: 0 }], timings.reveal),
        run(wheelWrap, [{ opacity: 0 }, { opacity: 1 }], timings.reveal)
      ]);
      const wheel = overlay.querySelector('.result-reveal-wheel');
      await run(wheel, [{ transform: 'rotate(0deg)' }, { transform: `rotate(${360 * 5 - section * 30}deg)` }], timings.spin, 'cubic-bezier(0.65, 0, 0.25, 1)');
      await run(wheelWrap, [{ opacity: 1 }, { opacity: 1 }], timings.settle);
      if (!cancelled) location.href = url;
    } catch (error) {
      if (!cancelled) {
        console.error('결과 전환 오류:', error);
        location.href = url;
      }
    } finally {
      if (cancelled) {
        overlay.remove();
        document.body.classList.remove('is-revealing-result');
        stage.inert = false;
        busy = false;
      }
      cancelResultReveal = null;
    }
  }

  document.addEventListener('click', event => {
    const target = event.target;
    if (!stage.contains(target)) return;
    const entering = $('.diagnosis-scroll-motion')?.hasAttribute('aria-busy');
    if (busy || entering) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    const next = target.closest('#diagnosisNext');
    const prev = target.closest('#diagnosisPrev');
    const reset = target.closest('#diagnosisReset');
    const choice = target.closest('[data-value]');
    if (next || prev || reset || choice) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (reset) {
        window.resetDiagnosisSession();
        location.href = paths[0]; return;
      }
      if (choice) {
        stage.querySelectorAll('[data-value]').forEach(item => item.classList.toggle('is-selected', item === choice));
        $('.diagnosis-choices').classList.add('has-selection');
        playCardVideo(choice);
        sessionStorage.setItem(keys[current], choice.dataset.value);
        $('#diagnosisPopup').classList.remove('is-show'); updateNext(); return;
      }
      if (prev) { save(); if (current > 0) go(current - 1); else history.back(); return; }
      if (!save()) { popup(); return; }
      if (current < 4) go(current + 1);
      else {
        const key = ['diagnosisEnvironment', 'diagnosisBelief', 'diagnosisSubject'].map(k => sessionStorage.getItem(k)).join('-');
        if (resultPages[key]) revealResult(resultPages[key]);
        else alert('이전 질문의 선택값이 없습니다. 이전 버튼으로 확인해주세요.');
      }
    }
  }, true);
  // 질문 사이를 이동한 뒤에도 현재 화면의 선택만 해제한다.
  document.addEventListener('click', event => {
    if (busy || current === 0 || $('.diagnosis-scroll-motion')?.hasAttribute('aria-busy')) return;
    if (event.target.closest('[data-value], .diagnosis-controls, .header, .gnb, a, button, input, textarea, select, label, [role="button"]')) return;
    const selected = stage.querySelectorAll('.is-selected[data-value]');
    if (!selected.length) return;
    stopCardVideos();
    selected.forEach(choice => choice.classList.remove('is-selected'));
    $('.diagnosis-choices')?.classList.remove('has-selection');
    sessionStorage.removeItem(keys[current]);
    $('#diagnosisPopup')?.classList.remove('is-show');
    updateNext();
  });
  document.addEventListener('input', event => {
    if (!stage.contains(event.target) || !event.target.matches('.diagnosis-input')) return;
    event.target.closest('.diagnosis-input-wrap').classList.toggle('is-filled', !!event.target.value.trim());
    sessionStorage.setItem(event.target.id, event.target.value);
    updateNext();
  });
  history.replaceState({ diagnosis: current }, '', location.href);
  window.addEventListener('popstate', () => {
    if (cancelResultReveal) {
      cancelResultReveal();
      location.reload();
      return;
    }
    const index = paths.indexOf(location.pathname);
    if (index < 0) { location.reload(); return; }
    if (busy) { pendingPop = index; return; }
    go(index, false);
  });
  restore();
})();
