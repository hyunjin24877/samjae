(() => {
  const brush = document.querySelector('.result-method .method-deco[data-src$="/pen.gif"]');
  const paper = document.querySelector('.result-paper');
  if (!brush || !paper) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'result-brush-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  paper.append(canvas);
  const context = canvas.getContext('2d');
  let pixelRatio = 1;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let activePointer = null;
  let originalTranslate = '';
  let originalTip = null;
  let points = [];
  let finishedStrokes = [];
  let renderFrame = 0;
  const fadeDelay = 500;
  const fadeDuration = 1100;

  function resizeCanvas() {
    const width = paper.clientWidth;
    const height = paper.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const nextWidth = Math.max(1, Math.round(width * ratio));
    const nextHeight = Math.max(1, Math.round(height * ratio));
    if (canvas.width === nextWidth && canvas.height === nextHeight) return;

    if (canvasWidth && canvasHeight) {
      const scaleX = width / canvasWidth;
      const scaleY = height / canvasHeight;
      for (const stroke of [...finishedStrokes, { points }]) {
        for (const point of stroke.points) {
          point.x *= scaleX;
          point.y *= scaleY;
        }
      }
    }
    canvas.width = nextWidth;
    canvas.height = nextHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvasWidth = width;
    canvasHeight = height;
    pixelRatio = ratio;
    scheduleRender();
  }

  function paperPoint(event) {
    const rect = paper.getBoundingClientRect();
    const x = event.clientX - rect.left - paper.clientLeft;
    const y = event.clientY - rect.top - paper.clientTop;
    if (x < 0 || y < 0 || x > paper.clientWidth || y > paper.clientHeight) return null;
    return { x, y, time: event.timeStamp || performance.now() };
  }

  function brushTip() {
    const rect = brush.getBoundingClientRect();
    const naturalWidth = brush.naturalWidth || 268;
    const naturalHeight = brush.naturalHeight || 500;
    const scale = Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
    const imageWidth = naturalWidth * scale;
    const imageHeight = naturalHeight * scale;
    // pen.gif의 붓끝: 원본 268×500 프레임 기준 약 (111, 421).
    return {
      x: rect.left + (rect.width - imageWidth) / 2 + imageWidth * (111 / 268),
      y: rect.top + (rect.height - imageHeight) / 2 + imageHeight * (421 / 500)
    };
  }

  function isBrushVisible() {
    return !brush.hidden && !!brush.getAttribute('src') &&
      !brush.classList.contains('is-fading') && getComputedStyle(brush).visibility !== 'hidden';
  }

  function dab(x, y, radius, index) {
    context.fillStyle = 'rgba(14, 13, 12, .86)';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();

    // 가장자리에 아주 옅은 먹 번짐을 남깁니다. 좌표 기반이라 다시 그려도 흔들리지 않습니다.
    const offset = Math.sin(index * 4.73) * radius * .65;
    context.fillStyle = 'rgba(12, 12, 12, .07)';
    context.beginPath();
    context.arc(x + offset, y - radius * .3, radius * 1.28, 0, Math.PI * 2);
    context.fill();
  }

  function drawStroke(strokePoints, opacity) {
    if (!strokePoints.length) return;
    context.globalAlpha = opacity;
    context.shadowColor = 'rgba(0, 0, 0, .18)';
    context.shadowBlur = 1.4;

    let totalLength = 0;
    const lengths = [0];
    for (let i = 1; i < strokePoints.length; i++) {
      totalLength += Math.hypot(strokePoints[i].x - strokePoints[i - 1].x, strokePoints[i].y - strokePoints[i - 1].y);
      lengths.push(totalLength);
    }
    if (strokePoints.length === 1) {
      dab(strokePoints[0].x, strokePoints[0].y, 1.1, 0);
    } else {
      let dabIndex = 0;
      for (let i = 1; i < strokePoints.length; i++) {
        const a = strokePoints[i - 1];
        const b = strokePoints[i];
        const distance = lengths[i] - lengths[i - 1];
        const elapsed = Math.max(1, b.time - a.time);
        const speed = distance / elapsed;
        const normalWidth = Math.max(1.8, Math.min(7, 6.8 - speed * 3.2));
        const steps = Math.max(1, Math.ceil(distance / 1.4));
        for (let step = 0; step <= steps; step++) {
          const fraction = step / steps;
          const traveled = lengths[i - 1] + distance * fraction;
          const taper = Math.min(1, traveled / 8, (totalLength - traveled + .8) / 12);
          const radius = Math.max(.35, normalWidth * taper / 2);
          dab(a.x + (b.x - a.x) * fraction, a.y + (b.y - a.y) * fraction, radius, dabIndex++);
        }
      }
    }
    context.shadowBlur = 0;
    context.globalAlpha = 1;
  }

  function render(now = performance.now()) {
    renderFrame = 0;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    finishedStrokes = finishedStrokes.filter(stroke => now - stroke.endedAt < fadeDelay + fadeDuration);
    for (const stroke of finishedStrokes) {
      const age = now - stroke.endedAt;
      const opacity = age <= fadeDelay ? 1 : 1 - (age - fadeDelay) / fadeDuration;
      drawStroke(stroke.points, opacity);
    }
    drawStroke(points, 1);
    if (finishedStrokes.length) scheduleRender();
  }

  function scheduleRender() {
    if (!renderFrame) renderFrame = requestAnimationFrame(render);
  }

  function move(event) {
    if (event.pointerId !== activePointer) return;
    if (!isBrushVisible()) { finish(); return; }
    event.preventDefault();
    brush.style.translate = `${event.clientX - originalTip.x}px ${event.clientY - originalTip.y}px`;
    const point = paperPoint(event);
    if (point) {
      if (!points.length || Math.hypot(point.x - points.at(-1).x, point.y - points.at(-1).y) >= .5) {
        points.push(point);
        scheduleRender();
      }
    } else if (points.length) {
      finishedStrokes.push({ points, endedAt: performance.now() });
      points = [];
      scheduleRender();
    }
  }

  function finish(event) {
    if (activePointer === null || (event && event.pointerId !== activePointer)) return;
    if (points.length) finishedStrokes.push({ points, endedAt: performance.now() });
    points = [];
    scheduleRender();
    activePointer = null;
    brush.style.translate = originalTranslate;
    document.documentElement.classList.remove('is-brush-writing');
  }

  brush.addEventListener('pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0) || !isBrushVisible()) return;
    event.preventDefault();
    resizeCanvas();
    originalTranslate = brush.style.translate;
    originalTip = brushTip();
    activePointer = event.pointerId;
    brush.setPointerCapture(event.pointerId);
    document.documentElement.classList.add('is-brush-writing');
    move(event);
  });
  brush.addEventListener('pointermove', move);
  brush.addEventListener('pointerup', finish);
  brush.addEventListener('pointercancel', finish);
  brush.addEventListener('lostpointercapture', finish);
  document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
  new MutationObserver(() => { if (activePointer !== null && !isBrushVisible()) finish(); })
    .observe(brush, { attributes: true, attributeFilter: ['hidden', 'src', 'class'] });
  new ResizeObserver(resizeCanvas).observe(paper);
  resizeCanvas();
})();
