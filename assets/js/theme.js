import { applyI18n } from './i18n.js';

const STORAGE_KEY = 'jb-theme';
const COLORS = {
  dark: '#0B0D10',
  light: '#F7F8FA'
};

function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function paint(theme) {
  document.documentElement.dataset.theme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', COLORS[theme]);

  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const sun = button.querySelector('.icon-sun');
  const moon = button.querySelector('.icon-moon');

  if (sun) sun.hidden = theme === 'dark';
  if (moon) moon.hidden = theme === 'light';

  button.dataset.i18nAttr = theme === 'dark' ? 'aria-label:theme.toLight' : 'aria-label:theme.toDark';
}

export function initTheme() {
  const button = document.getElementById('theme-toggle');
  paint(currentTheme());
  applyI18n();

  if (!button) return;

  button.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    paint(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      /* sem persistência: aplica só nesta sessão */
    }
    applyI18n();
  });
}
