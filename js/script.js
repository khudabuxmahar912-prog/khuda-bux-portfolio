const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("kb-theme");
if (savedTheme === "light") body.classList.add("light");
updateThemeIcon();

function updateThemeIcon() {
  themeToggle.textContent = body.classList.contains("light") ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", body.classList.contains("light") ? "Switch to dark mode" : "Switch to light mode");
}
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("kb-theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 600);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

contactForm.addEventListener("submit", event => {
  const action = contactForm.getAttribute("action");
  if (action.includes("YOUR-EMAIL@example.com")) {
    event.preventDefault();
    formStatus.textContent = "Form is ready, but you must replace YOUR-EMAIL@example.com with your real email first.";
  }
});

document.querySelectorAll(".disabled-link").forEach(link => {
  link.addEventListener("click", e => e.preventDefault());
});
