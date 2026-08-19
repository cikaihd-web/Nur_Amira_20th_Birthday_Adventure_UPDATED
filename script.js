const state = {
  unlocked: Number(localStorage.getItem("birthdayUnlocked") || 1),
  photos: JSON.parse(localStorage.getItem("birthdayPhotos") || "{}")
};

function goTo(page) {
  if (page > state.unlocked + 1) return;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page-${page}`).classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
  spawnHearts(page === 7 ? 18 : 5);
}

function revealAnswer(page) {
  document.getElementById(`answer-${page}`).classList.remove("hidden");
}

function unlockCar() {
  state.unlocked = Math.max(state.unlocked, 5);
  localStorage.setItem("birthdayUnlocked", state.unlocked);
  goTo(6);
}

function photoDone(page, input) {
  if (!input.files || !input.files[0]) return;

  state.photos[page] = true;
  localStorage.setItem("birthdayPhotos", JSON.stringify(state.photos));

  const status = document.getElementById(`status-${page}`);
  status.textContent = "✓ Picture received — next part unlocked ♡";

  // The website uses the photo-taking action as the completion check.
  // No image is uploaded to a server.
  if (page === 2) state.unlocked = Math.max(state.unlocked, 2);
  if (page === 3) state.unlocked = Math.max(state.unlocked, 3);
  if (page === 4) state.unlocked = Math.max(state.unlocked, 4);
  if (page === 6) state.unlocked = Math.max(state.unlocked, 6);
  localStorage.setItem("birthdayUnlocked", state.unlocked);

  setTimeout(() => {
    if (page === 2) goTo(3);
    else if (page === 3) goTo(4);
    else if (page === 4) goTo(5);
    else if (page === 6) goTo(7);
  }, 900);
}

function openLetter() {
  const envelope = document.getElementById("envelope");
  const scene = document.getElementById("envelopeScene");
  const reveal = document.getElementById("letterReveal");
  const music = document.getElementById("music");
  const control = document.getElementById("musicControl");

  if (envelope.classList.contains("open")) return;

  envelope.classList.add("open");
  scene.querySelector(".tap-hint").textContent = "♡";

  setTimeout(() => reveal.classList.add("show"), 700);

  // Browser audio autoplay rules allow playback after this user tap.
  music.play().then(() => {
    control.classList.add("visible");
    control.textContent = "♫ Turning Page · Playing";
  }).catch(() => {
    control.classList.add("visible");
    control.textContent = "♫ Play Turning Page";
  });

  spawnHearts(28);
}

function toggleMusic() {
  const music = document.getElementById("music");
  const control = document.getElementById("musicControl");
  if (music.paused) {
    music.play();
    control.textContent = "♫ Turning Page · Playing";
  } else {
    music.pause();
    control.textContent = "♫ Turning Page · Paused";
  }
}

function spawnHearts(count) {
  const layer = document.getElementById("hearts");
  for (let i=0; i<count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random() > .35 ? "♡" : "✦";
    h.style.left = `${Math.random()*100}%`;
    h.style.animationDuration = `${4 + Math.random()*5}s`;
    h.style.animationDelay = `${Math.random()*1.5}s`;
    h.style.fontSize = `${12 + Math.random()*18}px`;
    layer.appendChild(h);
    setTimeout(() => h.remove(), 11000);
  }
}

// Restore visible completion status when returning to the site.
window.addEventListener("DOMContentLoaded", () => {
  Object.keys(state.photos).forEach(page => {
    const status = document.getElementById(`status-${page}`);
    if (status) status.textContent = "✓ Previously completed ♡";
  });
});
