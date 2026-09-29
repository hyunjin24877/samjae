const filterButtons = document.querySelectorAll(".example-filter-btn");
const homes = document.querySelectorAll(".example-home");

let currentFilter = "all";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    /* =========================
       필터 버튼 이미지 변경
    ========================= */

    filterButtons.forEach((item) => {
      item.classList.remove("active");

      const img = item.querySelector("img");

      if (img) {
        img.src = item.dataset.default;
      }
    });

    button.classList.add("active");

    const selectedImg = button.querySelector("img");

    if (selectedImg) {
      selectedImg.src = button.dataset.select;
    }

    /* =========================
       집 상태 변경
    ========================= */

    homes.forEach((home) => {
      const region = home.dataset.region;

      home.classList.remove("is-highlighted");

      // 전체
      if (currentFilter === "all") {
        return;
      }

      // 선택된 타입
      if (region === currentFilter) {
        home.classList.add("is-highlighted");
      }
    });
  });
});

/* =========================
   전체 상태일 때 hover
========================= */

homes.forEach((home) => {
  home.addEventListener("mouseenter", () => {
    if (currentFilter !== "all") return;

    home.classList.add("is-hovered");
  });

  home.addEventListener("mouseleave", () => {
    home.classList.remove("is-hovered");
  });
});
