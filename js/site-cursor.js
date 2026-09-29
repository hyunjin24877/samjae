(() => {
  if (document.documentElement.classList.contains("custom-cursor-page")) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const cursor = document.createElement("img");
  cursor.src = "/samjae/img/cussot-red.svg";
  cursor.className = "site-cursor";
  cursor.alt = "";
  cursor.setAttribute("aria-hidden", "true");
  cursor.hidden = true;
  // Keep the cursor outside the scaled page canvas so clientX/clientY stay
  // in viewport coordinates.
  document.documentElement.append(cursor);

  cursor.addEventListener("load", () => {
    document.documentElement.classList.add("site-cursor-active");
  });

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.hidden = false;
  });

  document.addEventListener("pointerdown", () => {
    cursor.classList.add("is-pressed");
  });

  const release = () => cursor.classList.remove("is-pressed");
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
  window.addEventListener("blur", release);
  document.addEventListener("mouseleave", () => {
    cursor.hidden = true;
    release();
  });
})();
