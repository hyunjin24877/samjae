# 진단 족자 애니메이션 전체 수정본

낙하 700ms → 흔들림 650ms → 축소 500ms → 펼침 950ms. 질문은 펼침 시작 779ms 후 400ms 동안 표시됩니다.

## diagnosis.html

```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>당신의 삼재를 진단해드립니다.</title>

  <!-- CSS -->
  <link rel="stylesheet" href="/css/font.css">
  <link rel="stylesheet" href="/css/header.css">
  <link rel="stylesheet" href="/css/background.css">
  <link rel="stylesheet" href="/css/diagnosis-common.css">
  <link rel="stylesheet" href="/css/diagnosis-1.css">
</head>


<body>

  <!-- =====================
       배경
  ====================== -->

  <img
    src="/img/back/back-dote.webp"
    class="back-dote"
    alt=""
  >

   <img src="/img/back/back2-all.gif" class="back2" alt="">

  <img
    src="/img/back/back-grey-gradient.webp"
    class="back-grey-gradient"
    alt=""
  >

  <div class="black-overlay"></div>


  <!-- =====================
       옆 문
  ====================== -->

  <div class="doors">

    <img
      src="/img/door.svg"
      class="door door-left"
      alt=""
    >

    <img
      src="/img/door.svg"
      class="door door-right"
      alt=""
    >

  </div>


  <!-- =====================
       헤더
  ====================== -->

  <header class="header">

    <!-- 왼쪽 원형 버튼 -->

    <div class="header-controls">

      <!-- 홈 -->

      <button
        type="button"
        class="circle-btn"
        onclick="location.href='landing.html'"
      >
        <span class="inner-circle">
          <img
            src="/img/home.svg"
            alt="홈"
          >
        </span>
      </button>


      <!-- 이전 -->

      <button
        type="button"
        class="circle-btn"
        onclick="history.back()"
      >
        <span class="inner-circle">
          <img
            src="/img/prev.svg"
            alt="이전"
          >
        </span>
      </button>


      <!-- 다음 -->

      <button
        type="button"
        class="circle-btn"
        onclick="history.forward()"
      >
        <span class="inner-circle">
          <img
            src="/img/next.svg"
            alt="다음"
          >
        </span>
      </button>

    </div>


    <!-- =====================
         GNB
    ====================== -->

    <nav class="gnb">

      <!-- 인삿말 -->

      <a
        href="welcome.html"
        class="gnb-button"
      >
        <img
          class="menu-default"
          src="/img/header-menu-welcome.svg"
          alt="인삿말"
        >

        <img
          class="menu-hover"
          src="/img/header-menu-welcome-hover.svg"
          alt=""
        >
      </a>


      <!-- 진단 -->

      <a
        href="diagnosis.html"
        class="gnb-button current"
      >
        <img
          class="menu-default"
          src="/img/header-menu-diagnosis-select.svg"
          alt="진단"
        >

        <img
          class="menu-hover"
          src="/img/header-menu-diagnosis-hover.svg"
          alt=""
        >
      </a>


      <!-- 도감 -->

      <a
        href="gather.html"
        class="gnb-button"
      >
        <img
          class="menu-default"
          src="/img/header-menu-gather.svg"
          alt="도감"
        >

        <img
          class="menu-hover"
          src="/img/header-menu-gather-hover.svg"
          alt=""
        >
      </a>


      <!-- 증언 -->

      <a
        href="testimony.html"
        class="gnb-button"
      >
        <img
          class="menu-default"
          src="/img/header-menu-testimony.svg"
          alt="증언"
        >

        <img
          class="menu-hover"
          src="/img/header-menu-testimony-hover.svg"
          alt=""
        >
      </a>


      <!-- 사례 -->

      <a
        href="example.html"
        class="gnb-button"
      >
        <img
          class="menu-default"
          src="/img/header-menu-example.svg"
          alt="사례"
        >

        <img
          class="menu-hover"
          src="/img/header-menu-example-hover.svg"
          alt=""
        >
      </a>


      <!-- 삼재록 -->

      <a
        href="samjaerok.html"
        class="gnb-button"
      >
        <img
          class="menu-default"
          src="/img/header-menu-samjaerok.svg"
          alt="삼재록"
        >

        <img
          class="menu-hover"
          src="/img/header-menu-samjaerok-hover.svg"
          alt=""
        >
      </a>

    </nav>

  </header>





      <!-- =====================
           공통 열린 족자
      ====================== -->

      <div
        class="diagnosis-open-wrap white-glow"
        id="diagnosisOpen"
      >

        <div class="diagnosis-scroll-motion" id="diagnosisScrollMotion" aria-busy="true">
          <div class="diagnosis-scroll-paper" aria-hidden="true">
            <img src="/img/diagnosis/scroll-middle.svg" alt="">
          </div>
          <img class="diagnosis-scroll-rod diagnosis-scroll-top" src="/img/diagnosis/scroll-top.svg" alt="">
          <img class="diagnosis-scroll-rod diagnosis-scroll-bottom" src="/img/diagnosis/scroll-dowon.svg" alt="">

        <!-- =====================
             공통 질문 영역
        ====================== -->

        <div class="diagnosis-result">


          <!-- 질문 번호 -->

          <div class="diagnosis-result-number">
            1
          </div>


          <!-- 진행 불 -->

          <div class="diagnosis-result-drops">

            <img
              src="/img/diagnosis/diagnosis-fire.svg"
              class="diagnosis-fire active"
              alt=""
            >

            <img
              src="/img/diagnosis/diagnosis-fire.svg"
              class="diagnosis-fire"
              alt=""
            >

            <img
              src="/img/diagnosis/diagnosis-fire.svg"
              class="diagnosis-fire"
              alt=""
            >

            <img
              src="/img/diagnosis/diagnosis-fire.svg"
              class="diagnosis-fire"
              alt=""
            >

            <img
              src="/img/diagnosis/diagnosis-fire.svg"
              class="diagnosis-fire"
              alt=""
            >

          </div>


          <!-- 질문 -->

          <p class="diagnosis-result-text body2">
            당신의 이름과 최근 당신을 가장 불안하게<br>
            만들었던 일 또는 상황을 적어주세요.
          </p>


        </div>


        </div><!-- diagnosis-scroll-motion -->

        <!-- =====================
             Q1 전용 입력창
        ====================== -->

        <div class="diagnosis-form">


          <!-- 이름 -->

          <div class="diagnosis-input-wrap">

            <img
              src="/img/diagnosis/diagnosis-input-before.svg"
              class="diagnosis-input-img input-before"
              alt=""
            >

            <img
              src="/img/diagnosis/diagnosis-input-after.svg"
              class="diagnosis-input-img input-after"
              alt=""
            >

            <input
              type="text"
              id="diagnosisName"
              class="diagnosis-input body1-left"
              placeholder="이름을 입력해주세요."
            >

          </div>


          <!-- 상황 -->

          <div class="diagnosis-input-wrap">

            <img
              src="/img/diagnosis/diagnosis-input-before.svg"
              class="diagnosis-input-img input-before"
              alt=""
            >

            <img
              src="/img/diagnosis/diagnosis-input-after.svg"
              class="diagnosis-input-img input-after"
              alt=""
            >

            <input
              type="text"
              id="diagnosisSituation"
              class="diagnosis-input body1-left"
              placeholder="상황을 입력해주세요."
            >

          </div>


        </div>

      </div>

    </div>


    <!-- =====================
         공통 하단 컨트롤
    ====================== -->

    <div class="diagnosis-controls">


      <!-- 미완료 팝업 -->

      <img
        src="/img/diagnosis/diagnosis-popup.svg"
        class="diagnosis-popup"
        id="diagnosisPopup"
        alt=""
      >


      <!-- 이전 + 다음 -->

      <div class="diagnosis-button-row">


        <!-- 이전 -->

        <button
          type="button"
          class="diagnosis-btn"
          id="diagnosisPrev"
        >
          <img
            src="/img/diagnosis/diagnosis-pre.svg"
            class="diagnosis-btn-img"
            alt="이전"
          >
        </button>


        <!-- 다음 -->

        <button
          type="button"
          class="diagnosis-btn is-disabled"
          id="diagnosisNext"
        >
          <img
            src="/img/diagnosis/diagnosis-next-disable.svg"
            class="diagnosis-btn-img"
            id="diagnosisNextImg"
            alt="다음"
          >
        </button>


      </div>


      <!-- 다시 하기 -->

      <button
        type="button"
        class="diagnosis-reset button-filter"
        id="diagnosisReset"
      >
        다시하기
      </button>


    </div>

  </main>


  <!-- =====================
       JS
  ====================== -->
<script src="/js/diagnosis-common.js"></script>
  <script src="/js/diagnosis.js"></script>

</body>

</html>
```

## css/diagnosis-1.css

```css
/* =========================
   Q1 입력창 전체
========================= */

.diagnosis-form {
  position: absolute;

  /* 열린 족자 아래 60px */
  top: calc(100% + 60px);
  left: 50%;

  transform: translateX(-50%);

  display: flex;
  flex-direction: column;

  gap: 25px;

  z-index: 10;
}


/* =========================
   Q1 개별 입력창
========================= */

.diagnosis-input-wrap {
  position: relative;

  width: 500px;
  height: 70px;

  flex: 0 0 auto;
}


/* =========================
   before / after 이미지
========================= */

.diagnosis-input-img {
  position: absolute;

  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: fill;

  pointer-events: none;

  z-index: 1;

  transition: opacity 0.2s ease;
}


/* 기본 이미지 */

.input-before {
  opacity: 1;
}


/* 입력 중 이미지 */

.input-after {
  opacity: 0;
}


/* =========================
   실제 input
========================= */

.diagnosis-input {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  padding: 0 29px;

  box-sizing: border-box;

  border: 0;
  outline: 0;

  background: transparent;

  font-family: inherit;

  z-index: 2;
}


/* =========================
   입력된 상태
========================= */

.diagnosis-input-wrap.is-filled .input-before {
  opacity: 0;
}

.diagnosis-input-wrap.is-filled .input-after {
  opacity: 1;
}

/* =========================
   Q1 입력창 상태
========================= */

.diagnosis-input-wrap:focus-within .input-before,
.diagnosis-input-wrap.is-filled .input-before {
  opacity: 0;
}

.diagnosis-input-wrap:focus-within .input-after,
.diagnosis-input-wrap.is-filled .input-after {
  opacity: 1;
}

/* Q1 족자 진입: 입력창을 움직이지 않도록 내부 족자만 애니메이션 */
#diagnosisOpen .diagnosis-scroll-motion {
  position: absolute;
  top: 0;
  left: 50%;
  width: 960px;
  aspect-ratio: 857.31 / 372.99;
  translate: -50% 0;
  transform-origin: 50% 12.76%;
  opacity: 0;
}

.diagnosis-scroll-paper {
  position: absolute;
  top: 12.76%;
  left: 50%;
  width: calc(777.82 / 857.31 * 100%);
  height: 74.24%;
  transform: translateX(-50%);
  clip-path: inset(50% 0 50% 0);
}

.diagnosis-scroll-paper img {
  display: block;
  width: 100%;
  height: 100%;
}

.diagnosis-scroll-rod {
  position: absolute;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
  z-index: 2;
}

.diagnosis-scroll-top { top: 50%; transform: translateY(-100%); }
.diagnosis-scroll-bottom { bottom: 50%; transform: translateY(100%); }

#diagnosisOpen .diagnosis-scroll-motion .diagnosis-result {
  opacity: 0;
  visibility: hidden;
}

#diagnosisOpen .diagnosis-scroll-motion.is-ready {
  width: 857px;
  opacity: 1;
  transform: none;
}

.diagnosis-scroll-motion.is-ready .diagnosis-scroll-paper { clip-path: inset(0); }
.diagnosis-scroll-motion.is-ready .diagnosis-scroll-top { top: 0; transform: none; }
.diagnosis-scroll-motion.is-ready .diagnosis-scroll-bottom { bottom: 0; transform: none; }
#diagnosisOpen .diagnosis-scroll-motion.is-ready .diagnosis-result {
  opacity: 1;
  visibility: visible;
}

@media (prefers-reduced-motion: reduce) {
  #diagnosisOpen .diagnosis-scroll-motion { width: 857px; opacity: 1; }
  .diagnosis-scroll-paper { clip-path: inset(0); }
  .diagnosis-scroll-top { top: 0; transform: none; }
  .diagnosis-scroll-bottom { bottom: 0; transform: none; }
  #diagnosisOpen .diagnosis-scroll-motion .diagnosis-result { opacity: 1; visibility: visible; }
}

```

## js/diagnosis.js

```javascript
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
  const paper = motion.querySelector(".diagnosis-scroll-paper");
  const top = motion.querySelector(".diagnosis-scroll-top");
  const bottom = motion.querySelector(".diagnosis-scroll-bottom");
  const question = motion.querySelector(".diagnosis-result");
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = [];
  let stopped = false;
  const timings = { drop: 700, sway: 650, shrink: 500, unfold: 950, question: 400 };
  const easing = "cubic-bezier(0.22, 0.61, 0.36, 1)";
  function animate(element, frames, duration, extra = {}) {
    const animation = element.animate(frames, { duration, easing, fill: "both", ...extra });
    animations.push(animation);
    return animation.finished;
  }
  function finish() {
    stopped = true;
    motion.classList.add("is-ready");
    motion.removeAttribute("aria-busy");
    question.removeAttribute("aria-hidden");
    animations.forEach(animation => animation.cancel());
  }
  function onPreference() { if (preference.matches) finish(); }
  preference.addEventListener("change", onPreference);
  question.setAttribute("aria-hidden", "true");
  try {
    if (preference.matches) return;
    // 디코딩 전에 빈 막대가 보이지 않도록 필요한 세 이미지가 준비된 후 시작.
    await Promise.all([...motion.querySelectorAll("img")].map(image => image.decode().catch(() => {})));
    if (stopped) return;
    await animate(motion, [
      { opacity: 0, transform: "translateY(-110vh) rotate(0deg)" },
      { opacity: 1, transform: "translateY(170px) rotate(0deg)" }
    ], timings.drop);
    await animate(motion, [
      { transform: "translateY(170px) rotate(0deg)" },
      { transform: "translateY(170px) rotate(12deg)", offset: 0.4 },
      { transform: "translateY(170px) rotate(0deg)" }
    ], timings.sway, { easing: "cubic-bezier(0.37, 0, 0.25, 1)" });
    await animate(motion, [
      { width: "960px", transform: "translateY(170px) rotate(0deg)" },
      { width: "857px", transform: "translateY(0) rotate(0deg)" }
    ], timings.shrink);
    const unfolding = [
      animate(paper, [{ clipPath: "inset(50% 0 50% 0)" }, { clipPath: "inset(0% 0 0% 0)" }], timings.unfold),
      animate(top, [{ top: "50%", transform: "translateY(-100%)" }, { top: "0%", transform: "translateY(0%)" }], timings.unfold),
      animate(bottom, [{ bottom: "50%", transform: "translateY(100%)" }, { bottom: "0%", transform: "translateY(0%)" }], timings.unfold)
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

```