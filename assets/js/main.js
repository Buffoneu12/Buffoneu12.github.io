import { initI18n, t } from './i18n.js';
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

function initContactAction() {
  const btn = document.getElementById('hero-contact-btn');
  const status = document.getElementById('copy-status');
  if (!btn) return;

  const email = 'juliabuffon7@gmail.com';
  let timeoutId = null;

  btn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement('textarea');
        input.value = email;
        input.setAttribute('readonly', '');
        input.style.position = 'absolute';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      const copiedText = t('hero.cta.copied') || 'E-mail copiado!';
      const announcement = t('hero.cta.copiedAnnouncement') || 'E-mail juliabuffon7@gmail.com copiado para a área de transferência';

      btn.textContent = copiedText;
      btn.classList.add('btn--copied');
      if (status) status.textContent = announcement;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        btn.textContent = t('hero.cta.secondary') || 'Falar comigo';
        btn.classList.remove('btn--copied');
        if (status) status.textContent = '';
      }, 2500);
    } catch (error) {
      console.warn('[contato] não foi possível copiar o e-mail:', error);
    }
  });
}

async function main() {
  await initI18n();
  initTheme();
  await initProjetos();
  fillYear();
  initReveal();
  initScrollSpy();
  initContactAction();
}

main();
