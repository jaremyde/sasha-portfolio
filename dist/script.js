const projectTabs = document.querySelector(".project-tabs");
const directionButtons = projectTabs.querySelectorAll("[data-direction]");
const projectCards = document.querySelectorAll("#project-grid [data-directions]");

const projectIntros = document.querySelectorAll("[data-project-intro]");

const reducedProjectMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const tabAnimations = new WeakMap();

function selectDirection(direction) {
  const selected = Array.from(directionButtons).find((button) => button.dataset.direction === direction);
  const changesOrder = selected !== projectTabs.firstElementChild;
  const shouldAnimate = changesOrder && !reducedProjectMotion.matches;
  const previousPositions = shouldAnimate
    ? Array.from(directionButtons, (button) => button.getBoundingClientRect())
    : [];

  for (const button of directionButtons) {
    tabAnimations.get(button)?.cancel();
    button.setAttribute("aria-pressed", String(button === selected));
  }

  if (changesOrder) {
    const keepFocus = document.activeElement === selected;
    projectTabs.prepend(selected);
    if (keepFocus) selected.focus({preventScroll: true});
  }

  for (const intro of projectIntros) {
    intro.hidden = intro.dataset.projectIntro !== direction;
  }

  for (const card of projectCards) {
    card.hidden = !card.dataset.directions.split(" ").includes(direction);
  }

  if (shouldAnimate) {
    directionButtons.forEach((button, index) => {
      const previous = previousPositions[index];
      const current = button.getBoundingClientRect();
      const x = previous.left - current.left;
      const y = previous.top - current.top;
      if (!x && !y) return;

      const animation = button.animate(
        [{transform: `translate(${x}px, ${y}px)`}, {transform: "none"}],
        {duration: 300, easing: "ease-in-out"}
      );
      tabAnimations.set(button, animation);
    });
  }
}

function revealLinkedProject(hash) {
  const card = Array.from(projectCards).find((project) => "#" + project.id === hash);
  if (card?.hidden) {
    selectDirection(card.dataset.directions.split(" ")[0]);
    return card;
  }
}

projectTabs.hidden = false;
selectDirection("sibur");
revealLinkedProject(window.location.hash)?.scrollIntoView();

for (const button of directionButtons) {
  button.addEventListener("click", () => selectDirection(button.dataset.direction));
}

window.addEventListener("hashchange", () => {
  revealLinkedProject(window.location.hash)?.scrollIntoView();
});

const profile = {
  photo: "",
  telegram: "",
  email: "",
  materials: {}
};

for (const button of document.querySelectorAll("[data-case]")) {
  button.addEventListener("click", () => {
    document.getElementById("detail-" + button.dataset.case).showModal();
  });
}

if (profile.photo) {
  const portrait = document.getElementById("portrait");
  const image = new Image();
  image.alt = "Александра";
  image.onload = () => {
    portrait.removeAttribute("aria-hidden");
    portrait.replaceChildren(image);
  };
  image.src = profile.photo;
}

const contacts = document.querySelector(".contacts");
const links = [
  ["Telegram", profile.telegram],
  ["Написать на почту", profile.email && "mailto:" + profile.email]
];
for (const [label, href] of links) {
  if (!href) continue;
  if (!contacts.querySelector("a")) contacts.textContent = "";
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  contacts.append(link);
}

// Ключи 0–3 соответствуют порядку кейсов. Файлы для скачивания хранятся рядом с сайтом.
for (const [id, {screenshots = [], files = []}] of Object.entries(profile.materials)) {
  const dialog = document.getElementById("detail-" + id);
  if (!dialog) continue;
  const gallery = dialog.querySelector(".case-gallery");
  const downloads = dialog.querySelector(".case-download");
  if (screenshots.length) gallery.replaceChildren();
  if (files.length) downloads.replaceChildren();
  for (const {src, alt} of screenshots) {
    const image = new Image();
    image.alt = alt;
    image.loading = "lazy";
    image.src = src;
    gallery.append(image);
  }
  for (const {href, label} of files) {
      const link = document.createElement("a");
    link.href = href;
    link.download = "";
    link.textContent = label;
    downloads.append(link);
  }
}
