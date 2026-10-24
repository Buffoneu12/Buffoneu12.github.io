import { initI18n } from './i18n.js';
import { initTheme } from './theme.js';
import { initProjetos } from './projetos.js';

function fillYear() {
  const year = document.getElementById('ano');
  if (year) year.textContent = String(new Date().getFullYear());
}

function initReveal() {
  const elements = document.querySelectorAll('.hero, .section');
  if (elements.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add('is-visible');
      return;
    }
    element.dataset.reveal = '';
    observer.observe(element);
  });

  // Rede de segurança: nada pode ficar invisível, mesmo com saltos de âncora.
  window.setTimeout(() => {
    elements.forEach((element) => element.classList.add('is-visible'));
  }, 2000);
}

function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav__link')];
  if (links.length === 0) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

async function main() {
  await initI18n();
  initTheme();
  await initProjetos();
  fillYear();
  initReveal();
  initScrollSpy();
}

main();
