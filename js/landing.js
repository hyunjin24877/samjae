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

  const doorOpenSound = new Audio("sound/door_open.mp3");
  doorOpenSound.preload = "auto";
  const clickSound = new Audio(sitePath("sound/click.mp3"));
  clickSound.preload = "auto";
  clickSound.volume = 1;
  const fireSound = new Audio(sitePath("sound/fire.mp3"));
  fireSound.preload = "auto";
  fireSound.loop = true;
  fireSound.volume = 0.2;
  const bellSound = new Audio(sitePath("sound/background_bell.mp3"));
  bellSound.preload = "auto";
  bellSound.loop = true;
  bellSound.volume = 0.45;
  const dropSound = new Audio(sitePath("sound/drop.mp3"));
  dropSound.preload = "auto";
  dropSound.volume = 0.3;

  const startAmbient = () => {
    if (document.hidden || isEntering) return;
    fireSound.play().catch(() => {});
    bellSound.play().catch(() => {});
  };
  document.addEventListener("pointerdown", startAmbient, true);
  document.addEventListener("keydown", startAmbient, true);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      fireSound.pause();
      bellSound.pause();
    } else {
      startAmbient();
    }
  });
  startAmbient();

  const updateScale = () => {
    landing.style.setProperty(
      "--landing-scale",
      Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
    );
  };
  updateScale();
  window.addEventListener("resize", updateScale);

  // The three bamboo sticks land at 12%, 24%, and 36% of their 5-second CSS cycle.
  const bamboo = landing.querySelector(".book-wood-left .book-wood-stick-1");
  let landingTimers = [];
  const scheduleBambooDrops = () => {
    landingTimers.forEach(clearTimeout);
    landingTimers = [];
    if (document.hidden || isEntering || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = bamboo?.getAnimations().find(item => item.animationName === "book-wood-jump-1");
    if (!animation) return;
    const duration = animation.effect.getComputedTiming().duration;
    if (!(duration > 0)) return;
    const phase = (animation.currentTime || 0) % duration;
    for (const fraction of [0.12, 0.24, 0.36]) {
      const landingTime = duration * fraction;
      const delay = (landingTime - phase + duration) % duration;
      landingTimers.push(setTimeout(() => {
        if (document.hidden || isEntering) return;
        dropSound.currentTime = 0;
        dropSound.play().catch(() => {});
      }, delay));
    }
  };
  bamboo?.addEventListener("animationiteration", scheduleBambooDrops);
  document.addEventListener("visibilitychange", scheduleBambooDrops);
  requestAnimationFrame(scheduleBambooDrops);

  enterButton.addEventListener("pointerenter", event => {
    if (isEntering || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
    landing.classList.add("is-enter-hovered");
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  });
  enterButton.addEventListener("pointerleave", () => landing.classList.remove("is-enter-hovered"));
  enterButton.addEventListener("focus", () => landing.classList.add("is-enter-hovered"));
  enterButton.addEventListener("blur", () => landing.classList.remove("is-enter-hovered"));

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
    landing.classList.remove("is-enter-hovered");
    enterButton.disabled = true;
    landingTimers.forEach(clearTimeout);
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
