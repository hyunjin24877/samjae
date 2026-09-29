/* =========================
   Q5 요소
========================= */

const choices = document.querySelectorAll(".choice-button");

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
  /* 카드 클릭 제외 */

  if (event.target.closest(".choice-button")) {
    return;
  }

  /* 하단 컨트롤 클릭 제외 */

  if (event.target.closest(".diagnosis-controls")) {
    return;
  }

  /* 선택된 게 없으면 종료 */

  if (!selectedChoice) {
    return;
  }

  /* 선택값 초기화 */

  selectedChoice = null;

  /* 선택 클래스 제거 */

  choices.forEach((choice) => {
    choice.classList.remove("is-selected");
  });

  /* 전체 선택 상태 제거 */

  choicesWrap.classList.remove("has-selection");

  /* 저장값 제거 */

  sessionStorage.removeItem("diagnosisSubject");

  /* 다음 버튼 비활성 */

  nextButton.classList.add("is-disabled");

  nextImg.src = "/img/diagnosis/diagnosis-next-disable.svg";
});

/* =========================
   다음 버튼 → 12개 결과 분기
========================= */

nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  /* 선택하지 않았을 때 */

  if (!selectedChoice) {
    if (popup) {
      popup.classList.remove("is-show");

      void popup.offsetWidth;

      popup.classList.add("is-show");
    }

    return;
  }

  /* =========================
     Q5 선택값 저장
  ========================= */

  sessionStorage.setItem("diagnosisSubject", selectedChoice);

  /* =========================
     Q3 / Q4 / Q5 값 가져오기
  ========================= */

  const environment = sessionStorage.getItem("diagnosisEnvironment");

  const belief = sessionStorage.getItem("diagnosisBelief");

  const subject = sessionStorage.getItem("diagnosisSubject");

  /* =========================
     이전 질문 데이터 확인
  ========================= */

  if (!environment || !belief || !subject) {
    console.error("Q3/Q4/Q5 데이터 누락", {
      environment,
      belief,
      subject,
    });

    alert("이전 질문의 선택값이 없습니다.");

    return;
  }

  /* =========================
     결과 조합
  ========================= */

  const resultKey = `${environment}-${belief}-${subject}`;

  console.log("Q3:", environment);

  console.log("Q4:", belief);

  console.log("Q5:", subject);

  console.log("최종 조합:", resultKey);

  /* =========================
     12개 결과 페이지
  ========================= */

  const resultPages = {
    /* 산지 */

    "mountain-shamanism-community":
      "/diagnosis-result/diagnosis-result-05.html",

    "mountain-shamanism-individual":
      "/diagnosis-result/diagnosis-result-02.html",

    "mountain-religion-community": "/diagnosis-result/diagnosis-result-03.html",

    "mountain-religion-individual":
      "/diagnosis-result/diagnosis-result-04.html",

    /* 해안 */

    "ocean-shamanism-community": "/diagnosis-result/diagnosis-result-01.html",

    "ocean-shamanism-individual": "/diagnosis-result/diagnosis-result-06.html",

    "ocean-religion-community": "/diagnosis-result/diagnosis-result-07.html",

    "ocean-religion-individual": "/diagnosis-result/diagnosis-result-08.html",

    /* 평지 */

    "flat-shamanism-community": "/diagnosis-result/diagnosis-result-09.html",

    "flat-shamanism-individual": "/diagnosis-result/diagnosis-result-10.html",

    "flat-religion-community": "/diagnosis-result/diagnosis-result-11.html",

    "flat-religion-individual": "/diagnosis-result/diagnosis-result-12.html",
  };

  /* =========================
     결과 페이지 찾기
  ========================= */

  const resultPage = resultPages[resultKey];

  /* =========================
     결과 페이지 이동
  ========================= */

  if (resultPage) {
    location.href = resultPage;
  } else {
    console.error("결과를 찾을 수 없음:", resultKey);

    alert(`결과 조합 오류: ${resultKey}`);
  }
});

/* =========================
   이전 버튼
========================= */

prevButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  location.href = "diagnosis-4.html";
});
