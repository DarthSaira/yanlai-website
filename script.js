const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");

if (menuButton && mainNavigation) {
  menuButton.addEventListener("click", () => {
    const menuIsOpen = mainNavigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
    menuButton.textContent = menuIsOpen ? "Close" : "Menu";
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNavigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    });
  });
}
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});
const servicesGrid = document.querySelector(".services-grid");
const serviceCards = document.querySelectorAll(".service-card");
const serviceDots = document.querySelectorAll(".services-dots button");

if (servicesGrid && serviceCards.length && serviceDots.length) {
  servicesGrid.addEventListener("scroll", () => {
    const gridRect = servicesGrid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    let activeIndex = 0;
    let closestDistance = Infinity;

    serviceCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(gridCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = index;
      }
    });

    serviceDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  });
  serviceDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      serviceCards[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  });
}
/* =========================================
   BRAND INTRO ANIMATION
========================================= */

const brandIntro = document.querySelector(".brand-intro");
const brandIntroCanvas = document.querySelector(".brand-intro-canvas");
const brandIntroTrail = document.querySelector(".brand-intro-trail");
const brandLogo = document.getElementById("brandLogo");
const heroPhrase = document.getElementById("heroPhrase");

function buildBrandIntroPath() {
  if (
    !brandIntro ||
    !brandIntroCanvas ||
    !brandIntroTrail ||
    !brandLogo ||
    !heroPhrase ||
    window.innerWidth <= 900
  ) {
    return;
  }

  const phraseRect = heroPhrase.getBoundingClientRect();
  const logoRect = brandLogo.getBoundingClientRect();

  brandIntroCanvas.setAttribute(
    "viewBox",
    `0 0 ${window.innerWidth} ${window.innerHeight}`
  );

  const startX = phraseRect.left;
  const startY = phraseRect.bottom + 8;

  const phraseEndX = phraseRect.right;
  const phraseEndY = phraseRect.bottom + 8;

  const logoEndX = logoRect.left + logoRect.width * 0.258;
  const logoEndY = logoRect.top + logoRect.height * 0.824;

  const curveX = phraseEndX + 90;
  const curveY = Math.max(logoEndY + 70, phraseEndY - 80);

  const path = `
    M ${startX} ${startY}
    L ${phraseEndX} ${phraseEndY}
    C ${curveX} ${phraseEndY},
      ${curveX} ${curveY},
      ${logoEndX} ${logoEndY}
  `;

  brandIntroTrail.setAttribute("d", path);
}

function playBrandIntro() {
  if (sessionStorage.getItem("yanlaiBrandIntroPlayed")) {
      return;
    }
  
    if (
      !brandIntro ||
    !brandIntro ||
    !brandIntroTrail ||
    !brandLogo ||
    window.innerWidth <= 900 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  brandIntro.hidden = false;
  sessionStorage.setItem("yanlaiBrandIntroPlayed", "true");
  buildBrandIntroPath();

  const pathLength = brandIntroTrail.getTotalLength();
  const spark = brandIntro.querySelector(".brand-intro-spark");

  brandIntroTrail.style.strokeDasharray = pathLength;
  brandIntroTrail.style.strokeDashoffset = pathLength;
  brandIntroTrail.style.opacity = "0.65";

  const trailAnimation = brandIntroTrail.animate(
    [
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 }
    ],
    {
      duration: 2300,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards"
    }
  );

  const startTime = performance.now();

  function moveSpark(currentTime) {
    const progress = Math.min((currentTime - startTime) / 2300, 1);
    const point = brandIntroTrail.getPointAtLength(pathLength * progress);

    spark.style.left = `${point.x}px`;
    spark.style.top = `${point.y}px`;
    spark.style.opacity = "1";

    if (progress < 1) {
      requestAnimationFrame(moveSpark);
    }
  }

  requestAnimationFrame(moveSpark);

  trailAnimation.finished.then(() => {
    const trailFade = brandIntroTrail.animate(
      [
        { opacity: 0.65 },
        { opacity: 0 }
      ],
      {
        duration: 1200,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  
    const sparkLanding = spark.animate(
      [
  {
    offset: 0,
    transform: "translate(-50%, -50%) scale(1)",
    borderRadius: "50%",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1
  },
  {
    offset: 0.35,
    transform: "translate(-50%, -50%) scale(1.15)",
    borderRadius: "45%",
    clipPath: "polygon(15% 10%, 85% 10%, 95% 90%, 5% 90%)",
    opacity: 1
  },
  {
    offset: 0.75,
    transform: "translate(-50%, -50%) scale(1.3)",
    borderRadius: "8%",
    clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
    opacity: 1,
    boxShadow:
      "0 0 12px rgba(109, 40, 217, 0.9), 0 0 24px rgba(109, 40, 217, 0.55)"
  },
  {
    offset: 1,
    transform: "translate(-50%, -50%) scale(0.65)",
    borderRadius: "0",
    clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
    opacity: 0
  }
],
      {
        duration: 1100,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards"
      }
    );
  
    Promise.all([trailFade.finished, sparkLanding.finished]).then(() => {
      brandIntro.hidden = true;
    });
  });
}

window.addEventListener("load", playBrandIntro);
window.addEventListener("resize", buildBrandIntroPath);