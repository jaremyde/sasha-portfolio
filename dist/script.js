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
