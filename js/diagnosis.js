/* =========================
   Q1 요소
========================= */

const diagnosisName = document.getElementById("diagnosisName");

const diagnosisSituation = document.getElementById("diagnosisSituation");

const diagnosisInputs = document.querySelectorAll(".diagnosis-input");

/* =========================
   초기 다음 버튼 비활성
========================= */

setNextButton(false);

/* 족자만 순차 재생. 레이아웃 중앙 정렬(translate)은 회전과 분리한다. */
async function playDiagnosisEntrance() {
  const motion = document.getElementById("diagnosisScrollMotion");
  if (!motion) return;
  const menu = document.querySelector(".gnb");
  const form = document.querySelector(".diagnosis-form");
  const paper = motion.querySelector(".diagnosis-scroll-paper");
  const top = motion.querySelector(".diagnosis-scroll-top");
  const bottom = motion.querySelector(".diagnosis-scroll-bottom");
  const question = motion.querySelector(".diagnosis-result");
  const openedRodSources = ["/img/diagnosis/scroll-top2.svg", "/img/diagnosis/scroll-dowon2.svg"];
  const openedRodsReady = Promise.all(openedRodSources.map(src => {
    const image = new Image();
    image.src = src;
    return image.decode().catch(() => {});
  }));
  function useOpenedRods() {
    [top, bottom].forEach((rod, index) => { rod.src = openedRodSources[index]; });
  }
  const introStyle = getComputedStyle(motion);
  const introWidth = introStyle.getPropertyValue("--scroll-intro-width").trim();
  const introRodHeight = introStyle.getPropertyValue("--scroll-intro-rod-height").trim();
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = [];
  const rodOverlays = [];
  let stopped = false;
  const timings = { drop: 1100, bounce: 1050, shrink: 850, unfold: 950, question: 400 };
  const easing = "cubic-bezier(0.22, 0.61, 0.36, 1)";
  function animate(element, frames, duration, extra = {}) {
    const animation = element.animate(frames, { easing, fill: "both", ...extra, duration: duration * 0.4, delay: (extra.delay || 0) * 0.4 });
    animations.push(animation);
    return animation.finished;
  }
  function finish() {
    stopped = true;
    useOpenedRods();
    rodOverlays.forEach(rod => rod.remove());
    menu?.classList.add("is-intro-hidden");
    motion.classList.add("is-ready");
    motion.removeAttribute("aria-busy");
    question.removeAttribute("aria-hidden");
    form.classList.add("is-visible");
    animations.forEach(animation => animation.cancel());
  }
  function onPreference() { if (preference.matches) finish(); }
  preference.addEventListener("change", onPreference);
  question.setAttribute("aria-hidden", "true");
  try {
    if (preference.matches) return;
    // 디코딩 전에 빈 막대가 보이지 않도록 필요한 세 이미지가 준비된 후 시작.
    await window.waitForSiteAssets(Promise.all([openedRodsReady, ...[...motion.querySelectorAll("img")].map(image => image.decode().catch(() => {}))]));
    if (stopped) return;
    // 메뉴 페이드의 마지막 100ms와 낙하 시작을 겹쳐 한 흐름으로 연결.
    const menuExit = menu ? animate(menu, [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-8px)" }
    ], 650, { delay: 150 }) : Promise.resolve();
    await Promise.all([menuExit, animate(motion, [
      { opacity: 0, transform: "translateY(-110vh) rotate(0deg)" },
      { opacity: 1, transform: "translateY(170px) rotate(0deg)" }
    ], timings.drop, { delay: menu ? 700 : 0, easing: "cubic-bezier(0.42, 0, 0.85, 0.65)" })]);
    menu?.classList.add("is-intro-hidden");
    // 착지 → 반동으로 42px 상승하며 살짝 회전 → 내려앉으며 수평 복귀.
    await animate(motion, [
      { transform: "translateY(170px) rotate(0deg)", offset: 0,
        easing: "cubic-bezier(0.16, 0.7, 0.3, 1)" },
      { transform: "translateY(128px) rotate(6deg)", offset: 0.42,
        easing: "cubic-bezier(0.42, 0, 0.65, 1)" },
      { transform: "translateY(170px) rotate(-1deg)", offset: 0.85,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
      { transform: "translateY(170px) rotate(0deg)", offset: 1 }
    ], timings.bounce, { easing: "linear" });
    // 축소하는 동안 새 막대를 겹쳐 서서히 표시해 이미지 교체가 튀지 않게 한다.
    [top, bottom].forEach((rod, index) => {
      const overlay = rod.cloneNode(false);
      overlay.src = openedRodSources[index];
      overlay.style.opacity = "0";
      overlay.style.zIndex = "3";
      overlay.setAttribute("aria-hidden", "true");
      motion.append(overlay);
      rodOverlays.push(overlay);
    });
    await Promise.all([
      animate(motion, [
        { width: introWidth, transform: "translateY(170px) rotate(0deg)" },
        { width: "857px", transform: "translateY(0) rotate(0deg)" }
      ], timings.shrink),
      ...[top, bottom, ...rodOverlays].map(rod => animate(rod, [
        { height: introRodHeight },
        { height: `${48.92 / 372.99 * 100}%` }
      ], timings.shrink)),
      ...rodOverlays.map(rod => animate(rod, [
        { opacity: 0 }, { opacity: 1 }
      ], timings.shrink)),
      animate(form, [
        { opacity: 0, visibility: "visible", transform: "translate(-50%, 12px)" },
        { opacity: 1, visibility: "visible", transform: "translate(-50%, 0)" }
      ], timings.shrink)
    ]);
    form.classList.add("is-visible");
    if (stopped) return;
    useOpenedRods();
    rodOverlays.forEach(rod => rod.remove());
    const unfolding = [
      animate(paper, [{ clipPath: "inset(50% 0 50% 0)" }, { clipPath: "inset(0% 0 0% 0)" }], timings.unfold),
      animate(top, [{ top: "50%", transform: "translateY(calc(-100% + 2px))" }, { top: "0%", transform: "translateY(0%)" }], timings.unfold),
      animate(bottom, [{ bottom: "50%", transform: "translateY(calc(100% - 2px))" }, { bottom: "0%", transform: "translateY(0%)" }], timings.unfold)
    ];
    // 펼침 후반에만 질문 표시. delay도 같은 애니메이션 타임라인을 사용한다.
    question.removeAttribute("aria-hidden");
    unfolding.push(animate(question, [
      { opacity: 0, visibility: "visible", transform: "translate(-50%, 10px)" },
      { opacity: 1, visibility: "visible", transform: "translate(-50%, 0)" }
    ], timings.question, { delay: timings.unfold * 0.82 }));
    await Promise.all(unfolding);
  } catch (error) {
    if (error.name !== "AbortError") console.error("족자 애니메이션 오류:", error);
  } finally {
    finish();
    preference.removeEventListener("change", onPreference);
  }
}
playDiagnosisEntrance();

/* =========================
   입력 상태 확인
========================= */

function checkInputs() {
  diagnosisInputs.forEach((input) => {
    const wrap = input.closest(".diagnosis-input-wrap");

    if (!wrap) {
      return;
    }

    if (input.value.trim() !== "") {
      wrap.classList.add("is-filled");
    } else {
      wrap.classList.remove("is-filled");
    }
  });

  const nameFilled = diagnosisName.value.trim() !== "";

  const situationFilled = diagnosisSituation.value.trim() !== "";

  /* 둘 다 입력해야 활성화 */

  setNextButton(nameFilled && situationFilled);
}

/* =========================
   입력 이벤트
========================= */

diagnosisInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputs();
  });
});

/* =========================
   다음 버튼
========================= */

diagnosisNext.addEventListener("click", (event) => {
  event.stopPropagation();

  const nameValue = diagnosisName.value.trim();

  const situationValue = diagnosisSituation.value.trim();

  /* 하나라도 비어 있으면 팝업 */

  if (nameValue === "" || situationValue === "") {
    showIncompletePopup();

    return;
  }

  /* 값 저장 */

  sessionStorage.setItem("diagnosisName", nameValue);

  sessionStorage.setItem("diagnosisSituation", situationValue);

  /* Q2 이동 */

  location.href = "diagnosis-2.html";
});

/* =========================
   이전
========================= */

if (diagnosisPrev) {
  diagnosisPrev.addEventListener("click", (event) => {
    event.stopPropagation();

    history.back();
  });
}

/* =========================
   최초 체크
========================= */

checkInputs();
