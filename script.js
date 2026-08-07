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
        observer.unobserve(entry.target);
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