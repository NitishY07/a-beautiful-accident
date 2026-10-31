const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("openGift").addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});

const lightbox = document.getElementById("lightbox");
const largePhoto = document.getElementById("largePhoto");
document.querySelectorAll(".photo-card").forEach(card => {
  const img = card.querySelector("img");
  img.addEventListener("error", () => {
    card.classList.add("missing");
    const note = document.createElement("span");
    note.className = "missing-note";
    note.textContent = "Add your photo here: " + card.dataset.photo.split("/").pop();
    card.appendChild(note);
  });
  card.addEventListener("click", () => {
    if (card.classList.contains("missing")) return;
    largePhoto.src = card.dataset.photo;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
function closeViewer() {
  lightbox.classList.remove("open");
  largePhoto.src = "";
  document.body.style.overflow = "";
}
document.getElementById("closeLightbox").addEventListener("click", closeViewer);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeViewer(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeViewer(); });

const audio = document.getElementById("music");
const musicButton = document.getElementById("musicToggle");
musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try { await audio.play(); musicButton.innerHTML = "♫ <span>Pause</span>"; }
    catch { musicButton.innerHTML = "♫ <span>Add music.mp3</span>"; }
  } else { audio.pause(); musicButton.innerHTML = "♫ <span>Music</span>"; }
});
document.getElementById("finalButton").addEventListener("click", () => {
  const message = document.getElementById("finalMessage");
  message.classList.toggle("show");
  document.getElementById("finalButton").textContent = message.classList.contains("show") ? "A little message for you ♥" : "Tap for one last message ♥";
});
const stars = document.querySelector(".stars");
for (let i = 0; i < 32; i++) {
  const s = document.createElement("i"); s.className = "star";
  s.style.left = Math.random()*100+"%"; s.style.top = Math.random()*100+"%";
  s.style.animationDelay = Math.random()*4+"s"; stars.appendChild(s);
}
