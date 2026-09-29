/* =========================
   공통 요소
========================= */

const diagnosisNext =
  document.getElementById("diagnosisNext");

const diagnosisNextImg =
  document.getElementById("diagnosisNextImg");

const diagnosisPrev =
  document.getElementById("diagnosisPrev");

const diagnosisReset =
  document.getElementById("diagnosisReset");

const diagnosisPopup =
  document.getElementById("diagnosisPopup");


let popupTimer;


/* =========================
   다음 버튼 활성 / 비활성
========================= */

function setNextButton(active) {

  if (!diagnosisNext || !diagnosisNextImg) {
    return;
  }


  if (active) {

    diagnosisNext.classList.remove("is-disabled");

    diagnosisNextImg.src =
      "/samjae/img/diagnosis/diagnosis-next.svg";

  } else {

    diagnosisNext.classList.add("is-disabled");

    diagnosisNextImg.src =
      "/samjae/img/diagnosis/diagnosis-next-disable.svg";

  }

}


/* =========================
   미완료 팝업
========================= */

function showIncompletePopup(popup = document.getElementById("diagnosisPopup")) {
  if (!popup || popup.classList.contains("is-show")) return;
  // 재생 중 추가 클릭은 무시하여 세 번의 페이드를 중간에 재시작하지 않는다.
  popup.classList.add("is-show");
}

// 질문 DOM이 교체되어도 동작하며, 세 번째 반복 완료 후 display:none으로 돌아간다.
document.addEventListener("animationend", event => {
  if (event.animationName === "diagnosisPopupFade" && event.target.matches(".diagnosis-popup")) {
    event.target.classList.remove("is-show");
  }
});

/* =========================
   다시 하기
========================= */

if (diagnosisReset) {

  diagnosisReset.addEventListener("click", (event) => {

    event.stopPropagation();

    window.resetDiagnosisSession();

    location.href = "diagnosis.html";

  });

}


/* =========================
   선택형 질문 공통
   Q2 이후에서 사용
========================= */

function initChoiceQuestion({
  storageKey,
  prevPage,
  nextPage
}) {

  const choices =
    document.querySelectorAll(".choice-button");

  const choicesWrap =
    document.querySelector(".diagnosis-choices");


  if (!choices.length || !choicesWrap) {
    return;
  }


  let selectedChoice = null;


  setNextButton(false);


  /* =========================
     선택
  ========================= */

  choices.forEach((choice) => {

    choice.addEventListener("click", (event) => {

      event.stopPropagation();


      selectedChoice =
        choice.dataset.value;


      choices.forEach((item) => {

        item.classList.remove("is-selected");

      });


      choice.classList.add("is-selected");

      choicesWrap.classList.add("has-selection");


      sessionStorage.setItem(
        storageKey,
        selectedChoice
      );


      setNextButton(true);


      if (diagnosisPopup) {
        diagnosisPopup.classList.remove("is-show");
      }


      clearTimeout(popupTimer);

    });

  });


  /* =========================
     바깥 클릭 → 선택 해제
  ========================= */

  document.addEventListener("click", (event) => {

    if (event.target.closest(".choice-button")) {
      return;
    }


    if (!selectedChoice) {
      return;
    }


    selectedChoice = null;


    choices.forEach((choice) => {

      choice.classList.remove("is-selected");

    });


    choicesWrap.classList.remove("has-selection");


    sessionStorage.removeItem(storageKey);


    setNextButton(false);

  });


  /* =========================
     다음
  ========================= */

  if (diagnosisNext) {

    diagnosisNext.addEventListener("click", (event) => {

      event.stopPropagation();


      if (!selectedChoice) {

        showIncompletePopup();

        return;

      }


      sessionStorage.setItem(
        storageKey,
        selectedChoice
      );


      location.href = nextPage;

    });

  }


  /* =========================
     이전
  ========================= */

  if (diagnosisPrev) {

    diagnosisPrev.addEventListener("click", (event) => {

      event.stopPropagation();

      location.href = prevPage;

    });

  }

}
