/* =========================
   Q2 요소
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

    /* 선택값 */

    selectedChoice = choice.dataset.value;

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
  /* 카드 클릭은 제외 */

  if (event.target.closest(".diagnosis-choice")) {
    return;
  }

  /* 하단 버튼 클릭도 제외 */

  if (event.target.closest(".diagnosis-controls")) {
    return;
  }

  /* 선택된 카드가 없으면 종료 */

  if (!selectedChoice) {
    return;
  }

  /* 선택값 초기화 */

  selectedChoice = null;

  /* 선택 클래스 제거 */

  choices.forEach((choice) => {
    choice.classList.remove("is-selected");
  });

  /* 선택 상태 제거 */

  choicesWrap.classList.remove("has-selection");

  /* 저장값 제거 */

  sessionStorage.removeItem("diagnosisMethod");

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

  /* 선택하지 않았을 경우 */

  if (!selectedChoice) {
    if (popup) {
      popup.classList.remove("is-show");

      void popup.offsetWidth;

      popup.classList.add("is-show");
    }

    return;
  }

  /* 선택값 저장 */

  sessionStorage.setItem("diagnosisMethod", selectedChoice);

  /* 3번으로 이동 */

  location.href = "diagnosis-3.html";
});

/* =========================
   이전 버튼
========================= */

prevButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  location.href = "diagnosis.html";
});
