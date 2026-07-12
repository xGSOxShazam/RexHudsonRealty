const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const reveals = document.querySelectorAll('.reveal');

function setMenu(open) {
  nav.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', () => {
  setMenu(!nav.classList.contains('open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 28);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -35px'
});

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 55, 165)}ms`;
  observer.observe(element);
});

document.getElementById('year').textContent = new Date().getFullYear();
