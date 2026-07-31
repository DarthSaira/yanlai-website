const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const navigationLinks = mainNavigation.querySelectorAll("a");
const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const menuIsOpen = mainNavigation.classList.toggle("is-open");

  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
  menuButton.textContent = menuIsOpen ? "Close" : "Menu";
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNavigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  });
});