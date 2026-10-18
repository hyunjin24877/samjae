(() => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const clipSeconds = 0.95;
  let clipsReady;
  let activeSource;

  function loadClips() {
    if (!clipsReady) {
      clipsReady = fetch(sitePath('sound/paper2.mp3'))
        .then(response => {
          if (!response.ok) throw new Error('족자 소리를 불러오지 못했습니다.');
          return response.arrayBuffer();
        })
        .then(data => context.decodeAudioData(data))
        .then(audio => {
          const length = Math.min(audio.length, Math.round(audio.sampleRate * clipSeconds));
          const forward = context.createBuffer(audio.numberOfChannels, length, audio.sampleRate);
          const reverse = context.createBuffer(audio.numberOfChannels, length, audio.sampleRate);
          for (let channel = 0; channel < audio.numberOfChannels; channel++) {
            const original = audio.getChannelData(channel);
            const normal = forward.getChannelData(channel);
            const backward = reverse.getChannelData(channel);
            for (let index = 0; index < length; index++) {
              normal[index] = original[index];
              backward[index] = original[length - 1 - index];
            }
          }
          return { forward, reverse };
        })
        .catch(() => null);
    }
    return clipsReady;
  }

  window.playDiagnosisScrollPaper = (opening, durationMs) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const startedAt = performance.now();
    const duration = durationMs / 1000;
    Promise.all([loadClips(), context.resume().catch(() => {})]).then(([clips]) => {
      const elapsed = (performance.now() - startedAt) / 1000;
      if (!clips || elapsed >= duration - 0.08) return;

      try { activeSource?.stop(); } catch (_) {}
      const source = context.createBufferSource();
      source.buffer = opening ? clips.forward : clips.reverse;
      source.playbackRate.value = clipSeconds / duration;
      const gain = context.createGain();
      const remaining = duration - elapsed;
      const now = context.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(1, now + Math.min(0.025, remaining / 3));
      gain.gain.setValueAtTime(1, now + Math.max(0, remaining - 0.05));
      gain.gain.linearRampToValueAtTime(0, now + remaining);
      source.connect(gain).connect(context.destination);
      source.start(now, elapsed * source.playbackRate.value);
      source.stop(now + remaining);
      activeSource = source;
      source.onended = () => { if (activeSource === source) activeSource = null; };
    });
  };

  loadClips();
})();
