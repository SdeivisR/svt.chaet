document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-card-btn");
  const buttonContainer = document.getElementById("button-container");
  const contentContainer = document.getElementById("content-container");
  const cardContainer = document.querySelector(".card-container");
  const card = document.querySelector(".card");
  const flowerContainer = document.querySelector(".flower-container");

  const MAX_HEARTS = 20;
  const HEART_INTERVAL = 800;
  let heartsOnScreen = 0;
  let lastHeartTime = 0;

  function createHeart() {
    if (heartsOnScreen >= MAX_HEARTS) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = Math.random() * 20 + 20;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * (window.innerWidth - size)}px`;

    flowerContainer.appendChild(heart);
    heartsOnScreen++;
    const drift = Math.random() * 80 - 40;
    heart.style.setProperty("--drift", `${drift}px`);

    heart.addEventListener("animationend", () => {
      heart.remove();
      heartsOnScreen--;
    });
  }

  function animateHearts(time) {
    if (time - lastHeartTime > HEART_INTERVAL) {
      createHeart();
      lastHeartTime = time;
    }
    requestAnimationFrame(animateHearts);
  }

  openBtn.addEventListener("click", () => {
    buttonContainer.style.display = "none";
    contentContainer.classList.remove("hidden");

    setTimeout(() => {
      cardContainer.classList.add("show");
      card.classList.add("show");
    }, 300);

    requestAnimationFrame(animateHearts);

    const music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play().catch(() => {});
  });
});
