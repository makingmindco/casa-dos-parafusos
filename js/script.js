window.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  productCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
});

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

if (menuToggle && navList) {
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navList.classList.toggle("open");
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navList.classList.remove("open");
    });
  });
}

/* ============================================ */
/* SCROLL REVEAL - Elementos com classe scroll-reveal */
/* ============================================ */

const scrollRevealElements = document.querySelectorAll(
  ".scroll-reveal, .section-title, .section-badge, .feature-icon, .product-image, .testimonial-card, .hero-content, .footer-content"
);

const scrollRevealObserverOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const scrollRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      scrollRevealObserver.unobserve(entry.target);
    }
  });
}, scrollRevealObserverOptions);

scrollRevealElements.forEach((element) => {
  scrollRevealObserver.observe(element);
});

/* ============================================ */
/* FAQ ACCORDION - Abrir/Fechar respostas */
/* ============================================ */

const faqItems = document.querySelectorAll(".faq-item");
const faqToggles = document.querySelectorAll(".faq-toggle");

faqToggles.forEach((toggle, index) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const faqItem = faqItems[index];
    const isOpen = faqItem.classList.contains("open");

    faqItems.forEach((item) => {
      item.classList.remove("open");
      const toggleBtn = item.querySelector(".faq-toggle");
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      faqItem.classList.add("open");
      this.setAttribute("aria-expanded", "true");
    }
  });

  const faqQuestion = toggle.closest(".faq-question");
  if (faqQuestion) {
    faqQuestion.addEventListener("click", function () {
      toggle.click();
    });
  }
});
