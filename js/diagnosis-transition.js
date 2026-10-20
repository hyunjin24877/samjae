(() => {
  const paths = [sitePath('diagnosis.html'), ...[2, 3, 4, 5].map(n => sitePath(`diagnosis-${n}.html`))];
  const keys = [null, 'diagnosisMethod', 'diagnosisEnvironment', 'diagnosisBelief', 'diagnosisSubject'];
  let current = Math.max(0, paths.indexOf(location.pathname));
  let busy = false;
  let pendingPop = null;
  let stage;
  let cancelResultReveal = null;
  const ease = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = selector => stage.querySelector(selector);
  const cardSelectSound = new Audio(sitePath('sound/card_select.mp3'));
  cardSelectSound.preload = 'auto';
  cardSelectSound.volume = 0.35;
  const shamanismSound = new Audio(sitePath('sound/shamunism.mp3'));
  shamanismSound.preload = 'auto';
  shamanismSound.volume = 0.45;
  const religionSound = new Audio(sitePath('sound/pray.mp3'));
  religionSound.preload = 'auto';
  religionSound.volume = 0.55;
  const flowSound = new Audio(sitePath('sound/boat.mp3'));
  flowSound.preload = 'auto';
  flowSound.volume = 0.65;
  const obstructSound = new Audio(sitePath('sound/drop.mp3'));
  obstructSound.preload = 'auto';
  obstructSound.volume = 0.4;
  const obstructKnifeSound = new Audio(sitePath('sound/knife.mp3'));
  obstructKnifeSound.preload = 'auto';
  obstructKnifeSound.volume = 0.3;
  obstructKnifeSound.playbackRate = 2;
  const burnSound = new Audio(sitePath('sound/writer.mp3'));
  burnSound.preload = 'auto';
  burnSound.volume = 0.35;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let typingContext;
  let typingBuffer;
  let typingSampleStart = 0;
  let typingLoad;
  let lastTypingKeydown = -Infinity;
  const activeTypingSounds = new Set();
  function prepareTypingSound() {
    if (!AudioContextClass) return;
    if (typingLoad) return typingLoad;
    typingContext = new AudioContextClass();
    typingLoad = fetch(sitePath('sound/typing.mp3'))
      .then(response => {
        if (!response.ok) throw new Error(`타이핑 음원 로딩 실패: ${response.status}`);
        return response.arrayBuffer();
      })
      .then(data => typingContext.decodeAudioData(data))
      .then(buffer => {
        typingBuffer = buffer;
        // 원본 녹음에서 가장 또렷한 타건의 시작점을 골라 짧게 재생한다.
        const samples = buffer.getChannelData(0);
        const windowSize = Math.max(1, Math.round(buffer.sampleRate * 0.005));
        const limit = Math.min(samples.length, Math.round(buffer.sampleRate * 5));
        let loudest = 0;
        let loudestIndex = 0;
        const energies = [];
        for (let index = 0; index < limit; index += windowSize) {
          let energy = 0;
          for (let sample = index; sample < Math.min(index + windowSize, limit); sample++) {
            energy += samples[sample] * samples[sample];
          }
          energies.push(energy);
          if (energy > loudest) { loudest = energy; loudestIndex = index; }
        }
        let onset = Math.floor(loudestIndex / windowSize);
        const earliest = Math.max(0, onset - Math.round(0.08 * buffer.sampleRate / windowSize));
        while (onset > earliest && energies[onset - 1] > loudest * 0.2) onset--;
        typingSampleStart = Math.max(0, onset * windowSize / buffer.sampleRate - 0.002);
      })
      .catch(error => { console.warn(error); });
    return typingLoad;
  }
  function stopTypingSound() {
    activeTypingSounds.forEach(source => { try { source.stop(); } catch (_) {} });
    activeTypingSounds.clear();
  }
  function playTypingSound() {
    prepareTypingSound();
    if (!typingBuffer) return;
    typingContext.resume().catch(() => {});
    const duration = Math.min(0.12, typingBuffer.duration - typingSampleStart);
    const source = typingContext.createBufferSource();
    const gain = typingContext.createGain();
    const now = typingContext.currentTime;
    source.buffer = typingBuffer;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.005);
    gain.gain.setValueAtTime(0.5, now + Math.max(0.005, duration - 0.035));
    gain.gain.linearRampToValueAtTime(0, now + duration);
    source.connect(gain).connect(typingContext.destination);
    source.onended = () => activeTypingSounds.delete(source);
    activeTypingSounds.add(source);
    source.start(now, typingSampleStart, duration);
  }

  function normalize(root) {
    const wrap = root.querySelector('.diagnosis-open-wrap');
    wrap.id = 'diagnosisOpen';
    let motion = wrap.querySelector('.diagnosis-scroll-motion');
    if (!motion) {
      motion = document.createElement('div');
      motion.className = 'diagnosis-scroll-motion is-ready';
      motion.id = 'diagnosisScrollMotion';
      motion.innerHTML = `<div class="diagnosis-scroll-paper" aria-hidden="true"><img src="${sitePath('img/diagnosis/scroll-middle.svg')}" alt=""></div>
        <img class="diagnosis-scroll-rod diagnosis-scroll-top" src="${sitePath('img/diagnosis/scroll-top2.svg')}" alt="">
        <img class="diagnosis-scroll-rod diagnosis-scroll-bottom" src="${sitePath('img/diagnosis/scroll-dowon2.svg')}" alt="">`;
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

  let cardPlayback = 0;
  function stopCardVideos(root = stage) {
    cardPlayback++;
    shamanismSound.pause();
    shamanismSound.currentTime = 0;
    religionSound.pause();
    religionSound.currentTime = 0;
    flowSound.pause();
    flowSound.currentTime = 0;
    obstructSound.pause();
    obstructSound.currentTime = 0;
    obstructKnifeSound.pause();
    obstructKnifeSound.currentTime = 0;
    burnSound.pause();
    burnSound.currentTime = 0;
    root.querySelectorAll('.diagnosis-card-video').forEach(video => {
      video.onplaying = null;
      video.ontimeupdate = null;
      video.onended = null;
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
    const playback = cardPlayback;
    video.muted = true;
    let obstructDropPlayed = false;
    if (choice.dataset.value === 'obstruct') {
      video.ontimeupdate = () => {
        if (obstructDropPlayed || playback !== cardPlayback || video.currentTime < 0.8) return;
        obstructDropPlayed = true;
        obstructKnifeSound.pause();
        obstructKnifeSound.currentTime = 0;
        obstructSound.currentTime = 0;
        obstructSound.play().catch(() => {});
      };
    }
    video.onplaying = () => {
      if (playback === cardPlayback && choice.isConnected && choice.classList.contains('is-selected')) {
        choice.classList.add('is-video-playing');
        if (choice.dataset.value === 'shamanism') {
          // 메타데이터가 늦어도 실제 음원(2.299초)이 영상(3.003초)보다 먼저 끝나지 않게 합니다.
          const soundDuration = Number.isFinite(shamanismSound.duration) && shamanismSound.duration > 0
            ? shamanismSound.duration : 2.29875;
          const videoDuration = Number.isFinite(video.duration) && video.duration > 0
            ? video.duration : 3.003;
          shamanismSound.playbackRate = soundDuration / (videoDuration + 0.05);
          shamanismSound.currentTime = 0;
          shamanismSound.play().catch(() => {});
        } else if (choice.dataset.value === 'religion') {
          if (Number.isFinite(video.duration) && video.duration > 0 &&
              Number.isFinite(religionSound.duration) && religionSound.duration > 0) {
            religionSound.playbackRate = religionSound.duration / video.duration;
          }
          religionSound.currentTime = 0;
          religionSound.play().catch(() => {});
        } else if (choice.dataset.value === 'flow') {
          flowSound.currentTime = 0;
          flowSound.play().catch(() => {});
        } else if (choice.dataset.value === 'obstruct') {
          obstructKnifeSound.currentTime = 0;
          obstructKnifeSound.play().catch(() => {});
        } else if (choice.dataset.value === 'burn') {
          burnSound.currentTime = 0;
          burnSound.play().catch(() => {});
        }
      }
    };
    video.onended = () => {
      if (playback !== cardPlayback) return;
      shamanismSound.pause();
      shamanismSound.currentTime = 0;
      religionSound.pause();
      religionSound.currentTime = 0;
      flowSound.pause();
      flowSound.currentTime = 0;
      obstructSound.pause();
      obstructSound.currentTime = 0;
      obstructKnifeSound.pause();
      obstructKnifeSound.currentTime = 0;
      burnSound.pause();
      burnSound.currentTime = 0;
    };
    const fallback = () => {
      if (playback === cardPlayback) choice.classList.remove('is-video-playing');
    };
    video.onerror = fallback;
    // Reset even a pending load, so selecting the same card always starts at frame one.
    video.currentTime = 0;
    video.play().catch(fallback);
  }

  function updateNext() {
    const valid = current === 0
      ? $('#diagnosisName').value.trim() && $('#diagnosisSituation').value.trim()
      : $('.is-selected[data-value]');
    $('#diagnosisNext').classList.toggle('is-disabled', !valid);
    $('#diagnosisNextImg').src = sitePath(`img/diagnosis/diagnosis-next${valid ? '' : '-disable'}.svg`);
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
  const scrollFrames = [
    ['.diagnosis-scroll-paper', { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)' }],
    ['.diagnosis-scroll-top', { top: '50%', transform: 'translateY(calc(-100% + 2px))' }, { top: '0%', transform: 'translateY(0%)' }],
    ['.diagnosis-scroll-bottom', { bottom: '50%', transform: 'translateY(calc(100% - 2px))' }, { bottom: '0%', transform: 'translateY(0%)' }]
  ];
  function setScrollState(root, open) {
    scrollFrames.forEach(([selector, closed, opened]) => {
      Object.assign(root.querySelector(selector).style, open ? opened : closed);
    });
    root.querySelector('.diagnosis-result').style.opacity = open ? '1' : '0';
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
    motion.querySelector('.diagnosis-scroll-top').src = sitePath('img/diagnosis/scroll-top2.svg');
    motion.querySelector('.diagnosis-scroll-bottom').src = sitePath('img/diagnosis/scroll-dowon2.svg');
    next.querySelector('.diagnosis-form')?.classList.add('is-visible');
    setScrollState(next, false);
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = sitePath(`css/diagnosis-${index + 1}.css?v=20261003-pages`); link.media = 'not all';
    let cssTimeout;
    const loaded = new Promise((resolve, reject) => {
      cssTimeout = setTimeout(() => reject(new Error('질문 스타일 로딩 시간 초과')), 8000);
      link.onload = resolve;
      link.onerror = () => reject(new Error('질문 스타일 로딩 실패'));
    });
    document.head.append(link);
    try {
      await Promise.all([
        loaded,
        Promise.all([...motion.querySelectorAll('img')].map(img => img.decode().catch(() => {}))),
        window.waitForSiteAssets(Promise.all([...next.querySelectorAll('img')].map(img => img.decode().catch(() => {}))))
      ]);
    } catch (error) { link.remove(); throw error; }
    finally { clearTimeout(cssTimeout); link.onload = link.onerror = null; }
    return { next, link };
  }
  async function fold(open) {
    const duration = open ? 950 : 850;
    window.playDiagnosisScrollPaper?.(open, duration);
    const animations = scrollFrames.map(([selector, closed, opened]) =>
      animate($(selector), open ? [closed, opened] : [opened, closed], duration));
    if (open) animations.push(animate($('.diagnosis-result'), [{ opacity: 0 }, { opacity: 1 }], 400, duration * 0.82));
    await Promise.all(animations.map(a => a.finished));
    // 종료 스타일을 먼저 고정하고 애니메이션을 제거한다.
    setScrollState(stage, open);
    animations.forEach(a => a.cancel());
  }
  async function go(index, push = true) {
    if (busy || index === current || index < 0 || index > 4) return;
    stopTypingSound();
    if (index === 0 || index === 4) prepareTypingSound();
    busy = true; stage.inert = true; stage.setAttribute('aria-busy', 'true');
    let prepared;
    let swapped = false;
    // 다음 질문을 받는 동안 현재 족자를 닫아 네트워크 대기와 모션을 겹친다.
    const preparing = prepare(index).then(value => ({ value }), error => ({ error }));
    try {
      const fade = animate($('.diagnosis-result'), [{ opacity: 1 }, { opacity: 0 }], 250);
      await fade.finished;
      $('.diagnosis-result').style.opacity = '0'; fade.cancel();
      await fold(false);
      const result = await preparing;
      if (result.error) throw result.error;
      prepared = result.value;
      const oldStyles = [...document.querySelectorAll('link[rel="stylesheet"]')].filter(link => /\/diagnosis-[1-5]\.css$/.test(new URL(link.href).pathname) && link !== prepared.link);
      const old = stage;
      stopCardVideos(old);
      stage = prepared.next;
      stage.inert = true;
      // 닫힌 족자와 숨겨진 질문을 준비한 뒤 DOM을 한 번에 교체한다.
      setScrollState(stage, false);
      prepared.link.media = 'all';
      oldStyles.forEach(link => link.remove());
      old.replaceWith(stage);
      current = index; swapped = true;
      restore();
      document.querySelector('.gnb')?.classList.add('is-intro-hidden');
      if (push && pendingPop === null) history.pushState({ diagnosis: index }, '', paths[index]);
      await new Promise(resolve => requestAnimationFrame(resolve));
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
      sitePath("diagnosis-result/diagnosis-result-05.html"),

    "mountain-shamanism-individual":
      sitePath("diagnosis-result/diagnosis-result-02.html"),

    "mountain-religion-community": sitePath("diagnosis-result/diagnosis-result-03.html"),

    "mountain-religion-individual":
      sitePath("diagnosis-result/diagnosis-result-04.html"),

    /* 해안 */

    "ocean-shamanism-community": sitePath("diagnosis-result/diagnosis-result-01.html"),

    "ocean-shamanism-individual": sitePath("diagnosis-result/diagnosis-result-06.html"),

    "ocean-religion-community": sitePath("diagnosis-result/diagnosis-result-07.html"),

    "ocean-religion-individual": sitePath("diagnosis-result/diagnosis-result-08.html"),

    /* 평지 */

    "flat-shamanism-community": sitePath("diagnosis-result/diagnosis-result-09.html"),

    "flat-shamanism-individual": sitePath("diagnosis-result/diagnosis-result-10.html"),

    "flat-religion-community": sitePath("diagnosis-result/diagnosis-result-11.html"),

    "flat-religion-individual": sitePath("diagnosis-result/diagnosis-result-12.html"),
  };

  async function revealResult(url) {
    if (busy) return;
    // 원판의 맨 위 칸부터 시계 방향 순서 (도감과 동일).
    const wheelResults = ['05', '12', '01', '08', '09', '04', '06', '11', '02', '07', '10', '03'];
    const number = url.match(/-(\d{2})\.html$/)?.[1];
    const section = wheelResults.indexOf(number);
    if (section < 0) return;
    const timings = { hold: 1000, extinguish: 550, reveal: 500, spin: 6500, settle: 800 };
    const rotationSound = createWheelRotationSound();
    const fireSound = new Audio(sitePath('sound/fire.mp3'));
    fireSound.preload = 'auto';
    fireSound.loop = true;
    fireSound.volume = 0.4;
    if (!reduced()) rotationSound.prime();
    const overlay = document.createElement('section');
    overlay.className = 'diagnosis-result-reveal';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.innerHTML = `
      <div class="result-reveal-black"></div>
      <div class="result-reveal-loading">
        <div class="result-reveal-fires" aria-hidden="true">
          ${Array.from({ length: 3 }, () => `<img src="${sitePath('img/diagnosis/fire2.webp')}" alt="">`).join('')}
        </div>
        <p class="body2">당신에게 맞는 삼재풀이 방식을 점지하고 있습니다.<br>조금만 기다려주세요.</p>
      </div>
      <div class="result-reveal-wheel-wrap" aria-hidden="true">
        <img class="result-reveal-wheel" src="${sitePath('img/gather/gather.svg')}" alt="">
        <img class="result-reveal-arrow" src="${sitePath('img/gather/arrow.svg')}" alt="">
      </div>`;
    const loadingText = overlay.querySelector('.result-reveal-loading p');
    loadingText.setAttribute('aria-label', '당신에게 맞는 삼재풀이 방식을 점지하고 있습니다. 조금만 기다려주세요.');
    const letters = [];
    for (const node of [...loadingText.childNodes]) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const fragment = document.createDocumentFragment();
      for (const character of node.textContent) {
        const letter = document.createElement('span');
        letter.textContent = character;
        letter.style.visibility = 'hidden';
        fragment.append(letter);
        letters.push({ letter, character });
      }
      node.replaceWith(fragment);
    }
    const typingReady = prepareTypingSound();
    typingContext?.resume().catch(() => {});
    const animations = [];
    let cancelled = false;
    const typeLoadingText = async () => {
      if (!reduced()) {
        await Promise.race([typingReady, new Promise(resolve => setTimeout(resolve, 300))]);
      }
      for (const { letter, character } of letters) {
        if (cancelled) return;
        letter.style.visibility = 'visible';
        if (!reduced() && character.trim()) playTypingSound();
        if (!reduced()) await new Promise(resolve => setTimeout(resolve, 55));
      }
    };
    const run = (el, frames, duration, easing = ease, onStart) => {
      const animation = el.animate(frames, { duration: reduced() ? 1 : duration, easing, fill: 'forwards' });
      animations.push(animation);
      onStart?.(animation);
      return animation.finished;
    };
    const cancel = () => {
      cancelled = true;
      fireSound.pause();
      rotationSound.stop();
      stopTypingSound();
      animations.forEach(animation => animation.cancel());
    };
    cancelResultReveal = cancel;
    busy = true;
    stage.inert = true;
    document.body.classList.add('is-revealing-result');
    document.body.append(overlay);
    if (!reduced()) fireSound.play().catch(() => {});
    try {
      await window.waitForSiteAssets(Promise.all([...overlay.querySelectorAll('img')].map(img => img.decode().catch(() => {}))));
      if (cancelled) return;
      const loading = overlay.querySelector('.result-reveal-loading');
      const typingFinished = typeLoadingText();
      await run(loading, [{ opacity: 1 }, { opacity: 1 }], timings.hold);
      await typingFinished;
      if (cancelled) return;
      for (const fire of [...overlay.querySelectorAll('.result-reveal-fires img')].reverse()) {
        await run(fire, [
          { opacity: 1, transform: 'scale(1)', filter: 'brightness(1)' },
          { opacity: 0.6, transform: 'scale(0.8, 0.65)', filter: 'brightness(0.6)', offset: 0.6 },
          { opacity: 0, transform: 'scale(0.4, 0)', filter: 'brightness(0.2)' }
        ], timings.extinguish);
      }
      fireSound.pause();
      fireSound.currentTime = 0;
      const wheelWrap = overlay.querySelector('.result-reveal-wheel-wrap');
      await Promise.all([
        run(loading, [{ opacity: 1 }, { opacity: 0 }], timings.reveal),
        run(overlay.querySelector('.result-reveal-black'), [{ opacity: 1 }, { opacity: 0 }], timings.reveal),
        run(wheelWrap, [{ opacity: 0 }, { opacity: 1 }], timings.reveal)
      ]);
      const wheel = overlay.querySelector('.result-reveal-wheel');
      await run(wheel, [{ transform: 'rotate(0deg)' }, { transform: `rotate(${360 * 5 - section * 30}deg)` }], timings.spin, 'cubic-bezier(0.65, 0, 0.25, 1)', animation => {
        if (!reduced()) rotationSound.start(wheel, animation);
      });
      await run(wheelWrap, [{ opacity: 1 }, { opacity: 1 }], timings.settle);
      if (!cancelled) location.href = url;
    } catch (error) {
      if (!cancelled) {
        console.error('결과 전환 오류:', error);
        location.href = url;
      }
    } finally {
      fireSound.pause();
      rotationSound.stop();
      stopTypingSound();
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
        cardSelectSound.currentTime = 0;
        cardSelectSound.play().catch(() => {});
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
  document.addEventListener('keydown', event => {
    if (!stage.contains(event.target) || !event.target.matches('.diagnosis-input')) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key.length !== 1 && !['Backspace', 'Delete', 'Process'].includes(event.key) && !event.isComposing) return;
    lastTypingKeydown = performance.now();
    playTypingSound();
  });
  document.addEventListener('input', event => {
    if (!stage.contains(event.target) || !event.target.matches('.diagnosis-input')) return;
    if (performance.now() - lastTypingKeydown > 160 &&
        (!event.inputType || /^(insertText|insertCompositionText|insertFromComposition|deleteContentBackward|deleteContentForward)$/.test(event.inputType))) {
      playTypingSound();
    }
    event.target.closest('.diagnosis-input-wrap').classList.toggle('is-filled', !!event.target.value.trim());
    sessionStorage.setItem(event.target.id, event.target.value);
    updateNext();
  });
  document.addEventListener('focusout', event => {
    if (event.target.matches('.diagnosis-input')) stopTypingSound();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTypingSound();
  });
  window.addEventListener('pagehide', stopTypingSound);
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
  if (current === 0 || current === 4) prepareTypingSound();
  restore();
  if (current > 0 && !reduced()) {
    const motion = $('.diagnosis-scroll-motion');
    setScrollState(stage, false);
    motion.setAttribute('aria-busy', 'true');
    busy = true;
    stage.inert = true;
    Promise.all([...motion.querySelectorAll('img')].map(img => img.decode().catch(() => {})))
      .then(() => new Promise(resolve => requestAnimationFrame(resolve)))
      .then(() => fold(true))
      .catch(error => {
        console.error('진단 족자 펼침 오류:', error);
        setScrollState(stage, true);
      })
      .finally(() => {
        motion.removeAttribute('aria-busy');
        stage.inert = false;
        busy = false;
      });
  }
})();
