window.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.getElementById("sliderWrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const sliderDots = document.getElementById("sliderDots");
  let sliderCards = Array.from(document.querySelectorAll(".slider-card"));
  const realSlides = sliderCards.length;

  const cardsPerView = 2;
  let index = cardsPerView;

  function getCardWidth() {
    return (
      sliderCards[0].getBoundingClientRect().width +
      parseFloat(getComputedStyle(sliderCards[0]).marginLeft) +
      parseFloat(getComputedStyle(sliderCards[0]).marginRight)
    );
  }

  function cloneCardsGroup() {
    for (let i = 0; i < cardsPerView; i++) {
      const firstClone = sliderCards[i].cloneNode(true);
      const lastClone =
        sliderCards[realSlides - cardsPerView + i].cloneNode(true);
      sliderWrapper.appendChild(firstClone);
      sliderWrapper.insertBefore(lastClone, sliderCards[0]);
    }
  }

  cloneCardsGroup();
  sliderCards = Array.from(document.querySelectorAll(".slider-card"));

  const numGroups = Math.ceil(realSlides / cardsPerView);
  sliderDots.innerHTML = "";

  for (let i = 0; i < numGroups; i++) {
    const dot = document.createElement("span");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(cardsPerView + i * cardsPerView);
    sliderDots.appendChild(dot);
  }
  const dots = document.querySelectorAll(".slider-dot");

  function updateSlider(animate = true) {
    const cardWidth = getCardWidth();
    sliderWrapper.style.transition = animate
      ? "transform 0.4s cubic-bezier(0.6,0,0.2,1)"
      : "none";
    sliderWrapper.style.transform = `translateX(-${cardWidth * index}px)`;
    dots.forEach((dot, i) =>
      dot.classList.toggle(
        "active",
        i === Math.floor((index - cardsPerView) / cardsPerView)
      )
    );
  }

  sliderWrapper.addEventListener("transitionend", () => {
    if (index < cardsPerView) {
      index = realSlides;
      updateSlider(false);
    } else if (index >= sliderCards.length - cardsPerView) {
      index = cardsPerView;
      updateSlider(false);
    }
  });

  function prevSlide() {
    index -= cardsPerView;
    updateSlider();
    restartAutoplay();
  }
  function nextSlide() {
    index += cardsPerView;
    updateSlider();
    restartAutoplay();
  }
  function goToSlide(i) {
    index = i;
    updateSlider();
    restartAutoplay();
  }

  prevBtn.onclick = prevSlide;
  nextBtn.onclick = nextSlide;

  // AUTOPLAY
  let interval;
  function startAutoplay() {
    interval = setInterval(nextSlide, 3000);
  }
  function restartAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }
  startAutoplay();

  window.addEventListener("resize", () => {
    updateSlider(false);
  });

  updateSlider(false);
});

// MENU DIMINUI AO SCROLLAR

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const ulMenu = document.getElementById("ulMenu");
menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("active");
  ulMenu.classList.toggle("open");
});

ulMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    ulMenu.classList.remove("open");
  });
});

// SLIDE LOGOS

let copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);
