(() => {
  const landing = document.querySelector(".landing");
  const enterButton = document.getElementById("landingEnter");
  const door = document.getElementById("landingDoor");
  const leaf = door?.querySelector(".door-leaf-left");

  if (!landing || !enterButton || !door || !leaf) return;

  let isEntering = false;
  let zoomStarted = false;
  let openingFallback;
  let navigationFallback;

  const navigate = () => {
    clearTimeout(navigationFallback);
    location.href = "/welcome.html";
  };

  const startZoom = () => {
    if (zoomStarted) return;
    zoomStarted = true;
    clearTimeout(openingFallback);
    landing.classList.add("is-zooming");
    navigationFallback = setTimeout(navigate, 1800);
  };

  enterButton.addEventListener("click", () => {
    if (isEntering) return;
    isEntering = true;
    enterButton.disabled = true;
    landing.classList.add("is-entering");
    openingFallback = setTimeout(startZoom, 2200);
  });

  leaf.addEventListener("transitionend", (event) => {
    if (isEntering && event.target === leaf && event.propertyName === "transform") {
      startZoom();
    }
  });

  door.addEventListener("transitionend", (event) => {
    if (zoomStarted && event.target === door && event.propertyName === "transform") {
      navigate();
    }
  });
})();
