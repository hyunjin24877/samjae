(() => {
  const area = document.querySelector(".gather-main");
  const cursor = document.getElementById("gatherCursor");
  const wrap = document.querySelector(".gather-wrap");
  const wheel = document.querySelector(".gather-wheel");

  if (!area || !cursor || !wrap || !wheel) return;

  document.documentElement.append(cursor);

  /*
   * 맨 위 칸부터 시계 방향.
   * 첨부 시안의 칸 순서를 기준으로 연결했습니다.
   */
  const resultNumbers = [
    "01", // 해안 + 무속 + 공동체
    "12", // 평지 + 종교 + 개인
    "05", // 산지 + 무속 + 공동체
    "08", // 해안 + 종교 + 개인
    "09", // 평지 + 무속 + 공동체
    "04", // 산지 + 종교 + 개인
    "06", // 해안 + 무속 + 개인
    "11", // 평지 + 종교 + 공동체
    "02", // 산지 + 무속 + 개인
    "07", // 해안 + 종교 + 공동체
    "10", // 평지 + 무속 + 개인
    "03", // 산지 + 종교 + 공동체
  ];

  let frame = 0;
  let rotateTimer;
  let x = 0;
  let y = 0;
  let spinning = false;
  let spinAnimation = null;
  let navigationTimer;

  function updatePosition() {
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  }

  function hideCursor() {
    cancelAnimationFrame(frame);
    clearTimeout(rotateTimer);
    frame = 0;
    cursor.hidden = true;
    cursor.style.transform = "rotate(0deg)";
    area.classList.remove("has-custom-cursor");
  }

  // bfcache로 복원되어도 클릭 잠금과 이전 회전/이동 작업을 남기지 않습니다.
  function resetInteraction() {
    clearTimeout(navigationTimer);
    navigationTimer = undefined;
    const previousAnimation = spinAnimation;
    spinAnimation = null;
    previousAnimation?.cancel();
    spinning = false;
    wrap.classList.remove("is-spinning");
    hideCursor();
  }

  window.addEventListener("pagehide", resetInteraction);
  window.addEventListener("pageshow", resetInteraction);

  // 방울 커서 이동
  area.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    if (!cursor.complete || cursor.naturalWidth === 0) return;

    x = event.clientX;
    y = event.clientY;

    if (frame) return;

    frame = requestAnimationFrame(() => {
      updatePosition();
      cursor.hidden = false;
      area.classList.add("has-custom-cursor");
      frame = 0;
    });
  });

  // 방울 클릭 모션
  area.addEventListener("click", (event) => {
    if (cursor.hidden) return;

    cancelAnimationFrame(frame);
    frame = 0;

    x = event.clientX;
    y = event.clientY;
    updatePosition();

    clearTimeout(rotateTimer);
    cursor.style.transform = "rotate(-34deg)";

    rotateTimer = setTimeout(() => {
      cursor.style.transform = "rotate(0deg)";
    }, 200);
  });

  // 원판 칸 선택
  wheel.addEventListener("click", (event) => {
    if (spinning) return;

    const rect = wheel.getBoundingClientRect();

    // 원판 중심 기준 좌표
    const dx = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const distance = Math.hypot(dx, dy);

    // 가운데 장식과 원판 바깥은 제외
    if (distance < 0.45 || distance > 1) return;

    // 맨 위 0도, 시계 방향으로 각도 계산
    const angle = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;

    const section = Math.floor((angle + 15) / 30) % 12;

    // 여러 바퀴 회전한 뒤 선택 칸을 맨 위에 정렬
    const finalRotation = 360 * 5 - section * 30;

    spinning = true;
    wrap.classList.add("is-spinning");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animation = wheel.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: `rotate(${finalRotation}deg)` },
      ],
      {
        duration: reducedMotion ? 1 : 6500,
        easing: "cubic-bezier(0.65, 0, 0.25, 1)",
        fill: "forwards",
      },
    );

    spinAnimation = animation;

    animation.finished
      .then(() => {
        if (spinAnimation !== animation) return;
        // 멈춘 칸을 잠깐 보여준 후 이동
        navigationTimer = setTimeout(() => {
          if (spinAnimation !== animation) return;
          window.location.href = `diagnosis-result/diagnosis-result-${resultNumbers[section]}.html`;
        }, 600);
      })
      .catch(() => {
        // 취소된 이전 애니메이션이 새 클릭의 잠금을 풀지 않도록 합니다.
        if (spinAnimation === animation) resetInteraction();
      });
  });

  area.addEventListener("pointerleave", hideCursor);
  window.addEventListener("blur", hideCursor);
})();
