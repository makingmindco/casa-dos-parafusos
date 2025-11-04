window.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.getElementById("sliderWrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const sliderDots = document.getElementById("sliderDots");
  let sliderCards = Array.from(document.querySelectorAll(".slider-card"));
  const realSlides = sliderCards.length;

  const cardsPerView = 2; // ALTERE para quantos quer visíveis de cada vez
  let index = cardsPerView;

  function getCardWidth() {
    return (
      sliderCards[0].getBoundingClientRect().width +
      parseFloat(getComputedStyle(sliderCards[0]).marginLeft) +
      parseFloat(getComputedStyle(sliderCards[0]).marginRight)
    );
  }

  // CLONE grupos de cards para infinito sem buracos!
  function cloneCardsGroup() {
    // Clona grupo inicial e final
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

  // Monta dots (um para cada grupo visível possível)
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
      // Se pulou para o grupo clone final
      index = realSlides; // volta para grupo real
      updateSlider(false);
    } else if (index >= sliderCards.length - cardsPerView) {
      // Se pulou pro grupo clone inicial
      index = cardsPerView; // volta para grupo real
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

  // Autoplay
  let interval;
  function startAutoplay() {
    interval = setInterval(nextSlide, 3000);
  }
  function restartAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }
  startAutoplay();

  // Responsivo
  window.addEventListener("resize", () => {
    updateSlider(false);
  });

  // Inicial
  updateSlider(false);
});

// MENU FIXO

// function rolagemPagina(e) {
//   e.addEventListener("click", () => {
//     alert("Clicou!");
//   });

//   e.querySelector("header").style.height = "3rem";
// }
