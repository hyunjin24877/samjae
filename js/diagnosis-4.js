/* =========================
   Q4 요소
========================= */

const choices = document.querySelectorAll(".diagnosis-choice");

const choicesWrap = document.querySelector(".diagnosis-choices");

const nextButton = document.getElementById("diagnosisNext");

const nextImg = document.getElementById("diagnosisNextImg");

const prevButton = document.getElementById("diagnosisPrev");

const popup = document.getElementById("diagnosisPopup");

let selectedChoice = null;

/* =========================
   처음 다음 버튼 비활성
========================= */

nextButton.classList.add("is-disabled");

nextImg.src = "/img/diagnosis/diagnosis-next-disable.svg";

/* =========================
   Q4 이전 저장값 제거
========================= */

sessionStorage.removeItem("diagnosisBelief");

/* =========================
   카드 클릭
========================= */

choices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    /* 기존 선택 제거 */

    choices.forEach((item) => {
      item.classList.remove("is-selected");
    });

    /* 클릭한 카드 선택 */

    choice.classList.add("is-selected");

    /* 전체 선택 상태 */

    choicesWrap.classList.add("has-selection");

    /* HTML의 data-value 가져오기 */

    selectedChoice = choice.dataset.value;

    /* Q4 선택값 바로 저장 */

    sessionStorage.setItem("diagnosisBelief", selectedChoice);

    /* 확인용 */

    console.log("Q4 저장값:", selectedChoice);

    /* 다음 버튼 활성 */

    nextButton.classList.remove("is-disabled");

    nextImg.src = "/img/diagnosis/diagnosis-next.svg";

    /* 팝업 제거 */

    if (popup) {
      popup.classList.remove("is-show");
    }
  });
});

/* =========================
   카드 바깥 클릭 → 선택 해제
========================= */

document.addEventListener("click", (event) => {
  /* 카드 클릭 제외 */

  if (event.target.closest(".diagnosis-choice")) {
    return;
  }

  /* 하단 버튼 클릭 제외 */

  if (event.target.closest(".diagnosis-controls")) {
    return;
  }

  if (!selectedChoice) {
    return;
  }

  /* 선택 초기화 */

  selectedChoice = null;

  choices.forEach((choice) => {
    choice.classList.remove("is-selected");
  });

  choicesWrap.classList.remove("has-selection");

  /* 저장값 삭제 */

  sessionStorage.removeItem("diagnosisBelief");

  /* 다음 버튼 비활성 */

  nextButton.classList.add("is-disabled");

  nextImg.src = "/img/diagnosis/diagnosis-next-disable.svg";
});

/* =========================
   다음 버튼
========================= */

nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  /* 선택 안 했을 때 */

  if (!selectedChoice) {
    if (popup) {
      popup.classList.remove("is-show");

      void popup.offsetWidth;

      popup.classList.add("is-show");
    }

    return;
  }

  /* Q4 값 확실하게 저장 */

  sessionStorage.setItem("diagnosisBelief", selectedChoice);

  console.log("Q4 최종 저장값:", sessionStorage.getItem("diagnosisBelief"));

  /* Q5 이동 */

  location.href = "diagnosis-5.html";
});

/* =========================
   이전 버튼
========================= */

prevButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  location.href = "diagnosis-3.html";
});
