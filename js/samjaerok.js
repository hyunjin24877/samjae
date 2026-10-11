// 문장부호와 괄호 바깥쪽 여백만 보정합니다. 원문 공백은 유지합니다.
document.querySelectorAll(".samjaerok-open .page-content").forEach(section => {
  const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const value = node.nodeValue;
    const punctuation = /[,<〈.()\[\]]/g;
    if (!punctuation.test(value)) return;
    punctuation.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let start = 0;
    for (const match of value.matchAll(punctuation)) {
      fragment.append(document.createTextNode(value.slice(start, match.index)));
      const span = document.createElement("span");
      if (match[0] === "(" || match[0] === "[") {
        span.className = "samjaerok-bracket-open";
      } else if (match[0] === ")" || match[0] === "]") {
        span.className = "samjaerok-bracket-close";
      } else {
        span.className = "samjaerok-punctuation-gap";
        if (match[0] === ",") span.classList.add("samjaerok-comma");
        if (match[0] === ".") span.classList.add("samjaerok-period");
      }
      span.textContent = match[0];
      fragment.append(span);
      start = match.index + match[0].length;
    }
    fragment.append(document.createTextNode(value.slice(start)));
    node.replaceWith(fragment);
  });
});

const cursor = document.getElementById("cursor");
if (cursor) document.documentElement.append(cursor);
const cover = document.getElementById("samjaerokCover");
const openBook = document.getElementById("samjaerokOpen");
const openTabs = [...document.querySelectorAll(".samjaerok-open-tabs .samjaerok-tab")];
const spreads = [...document.querySelectorAll(".samjaerok-spread")];
const sheet = document.getElementById("pageTurnSheet");
const stationary = document.getElementById("pageTurnStationary");
const castShadow = document.getElementById("pageTurnCastShadow");
const front = sheet.querySelector(".page-turn-face-front");
const back = sheet.querySelector(".page-turn-face-back");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentPage = spreads.findIndex(page => page.classList.contains("active"));
let runningTurn = null;
let openingTextAnimations = [];

function fadePageText(container, timing, opening = false) {
  const frames = opening
    ? [{ opacity: 0 }, { opacity: 1 }]
    : [{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }];
  return [...container.querySelectorAll(".page-title, .page-body")]
    .map(element => element.animate(frames, timing));
}

function stopOpeningTextFade() {
  openingTextAnimations.forEach(animation => animation.cancel());
  openingTextAnimations = [];
}

// 기존 페이지와 같은 크기로 종이와 내용을 복제한다.
function fillPage(container, spread, side, withShade = false) {
  const paper = openBook.querySelector(`:scope > .samjaerok-page-${side}`).cloneNode(true);
  paper.removeAttribute("class");
  const content = spread.querySelector(`.page-content-${side}`).cloneNode(true);
  content.removeAttribute("id");
  content.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
  container.replaceChildren(paper, content);
  if (withShade) {
    const shade = document.createElement("span");
    shade.className = "page-turn-shade";
    container.append(shade);
  }
}

function selectPage(index) {
  spreads.forEach((spread, i) => spread.classList.toggle("active", i === index));
  openTabs.forEach(tab => {
    const selected = tab.dataset.page === spreads[index].id;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-pressed", String(selected));
    tab.querySelector("img").src = selected ? tab.dataset.select : tab.dataset.default;
  });
  currentPage = index;
}

function finishTurn() {
  if (!runningTurn) return;
  const turn = runningTurn;
  runningTurn = null;
  // 다음 장은 이미 뒤에 배치되어 있으므로 같은 프레임에 복제본만 제거한다.
  sheet.classList.remove("is-turning", "is-backward");
  stationary.className = "page-turn-stationary";
  castShadow.classList.remove("is-backward");
  turn.animations.forEach(animation => animation.cancel());
  front.replaceChildren();
  back.replaceChildren();
  stationary.replaceChildren();
  openBook.removeAttribute("aria-busy");
}

function turnTo(index) {
  if (runningTurn || index === currentPage || index < 0) return;
  stopOpeningTextFade();
  if (reducedMotion.matches) {
    selectPage(index);
    return;
  }
  const forward = index > currentPage;
  const movingSide = forward ? "right" : "left";
  const restingSide = forward ? "left" : "right";
  const previous = spreads[currentPage];
  const next = spreads[index];
  fillPage(front, previous, movingSide, true);
  fillPage(back, next, restingSide, true);
  fillPage(stationary, previous, restingSide);
  stationary.className = `page-turn-stationary is-visible on-${restingSide}`;
  sheet.classList.toggle("is-backward", !forward);
  sheet.classList.add("is-turning");
  openBook.setAttribute("aria-busy", "true");
  // 현재 면은 복제본으로 유지하고 다음 펼침면을 아래에 배치한다.
  selectPage(index);

  const timing = { duration: 1800, easing: "cubic-bezier(0.32, 0.08, 0.22, 1)", fill: "both" };
  const rotation = sheet.animate([
    { transform: "rotateY(0deg)" },
    { transform: `rotateY(${forward ? -180 : 180}deg)` }
  ], timing);
  const shadow = sheet.animate([
    { boxShadow: "0 0 0 rgba(0, 0, 0, 0)" },
    { boxShadow: `${forward ? -18 : 18}px 12px 28px rgba(0, 0, 0, 0.22)`, offset: 0.5 },
    { boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }
  ], timing);
  const shades = [...sheet.querySelectorAll(".page-turn-shade")].map(shade => shade.animate([
    { opacity: 0 }, { opacity: 0.85, offset: 0.5 }, { opacity: 0 }
  ], timing));
  castShadow.classList.toggle("is-backward", !forward);
  const cast = castShadow.animate([
    { opacity: 0, transform: "scaleX(0.08)" },
    { opacity: 0.65, transform: "scaleX(0.65)", offset: 0.25 },
    { opacity: 1, transform: "scaleX(1)", offset: 0.5 },
    { opacity: 0.4, transform: "scaleX(0.5)", offset: 0.8 },
    { opacity: 0, transform: "scaleX(0.08)" }
  ], timing);
  const textFades = [
    ...fadePageText(next, timing),
    ...fadePageText(back, timing)
  ];
  const turn = { animations: [rotation, shadow, cast, ...shades, ...textFades] };
  runningTurn = turn;
  rotation.finished.then(() => {
    if (runningTurn === turn) finishTurn();
  }).catch(() => {
    if (runningTurn === turn) finishTurn();
  });
}

document.addEventListener("mousemove", event => {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY - 10}px`;
});

cover.addEventListener("click", event => {
  event.stopPropagation();
  const tab = event.target.closest(".samjaerok-tab[data-page]");
  if (tab) {
    const index = spreads.findIndex(spread => spread.id === tab.dataset.page);
    if (index >= 0) selectPage(index);
  }
  cover.style.display = "none";
  openBook.style.display = "block";
  if (!reducedMotion.matches) {
    stopOpeningTextFade();
    openingTextAnimations = fadePageText(spreads[currentPage], {
      duration: 500, easing: "ease-out", fill: "both"
    }, true);
  }
});
openBook.addEventListener("click", event => event.stopPropagation());
document.addEventListener("click", event => {
  if (openBook.style.display !== "block" || event.target.closest(".header")) return;
  finishTurn();
  stopOpeningTextFade();
  openBook.style.display = "none";
  cover.style.display = "block";
});
openTabs.forEach(tab => tab.addEventListener("click", event => {
  event.stopPropagation();
  turnTo(spreads.findIndex(spread => spread.id === tab.dataset.page));
}));
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    finishTurn();
    stopOpeningTextFade();
  }
});
selectPage(Math.max(0, currentPage));
