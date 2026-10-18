(() => {
  const landing = document.querySelector(".landing");
  const enterButton = document.getElementById("landingEnter");
  const door = document.getElementById("landingDoor");
  const leaf = door?.querySelector(".door-leaf-left");

  if (!landing || !enterButton || !door || !leaf) return;

  const doorOpenSound = new Audio("sound/door_open.mp3");
  doorOpenSound.preload = "auto";
  const clickSound = new Audio(sitePath("sound/click.mp3"));
  clickSound.preload = "auto";
  clickSound.volume = 1;

  const updateScale = () => {
    landing.style.setProperty(
      "--landing-scale",
      Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
    );
  };
  updateScale();
  window.addEventListener("resize", updateScale);

  let isEntering = false;
  let zoomStarted = false;
  let openingFallback;
  let navigationFallback;

  enterButton.addEventListener("pointerenter", event => {
    if (isEntering || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  });

  const navigate = () => {
    clearTimeout(navigationFallback);
    location.href = sitePath("welcome.html");
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
    doorOpenSound.play().catch(() => {});
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
