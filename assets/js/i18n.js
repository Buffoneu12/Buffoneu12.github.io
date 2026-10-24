const STORAGE_KEY = 'jb-lang';
const SUPPORTED = ['pt', 'en'];

let dictionaries = {};
let currentLang = 'pt';

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch (error) {
    /* localStorage indisponível: segue o padrão */
  }
  return 'pt';
}

function get(dict, key) {
  return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
}

export function applyI18n() {
  const dict = dictionaries[currentLang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = get(dict, element.dataset.i18n);
    if (value !== null) element.textContent = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attribute, key] = pair.split(':').map((part) => part.trim());
      if (!attribute || !key) return;
      const value = get(dict, key);
      if (value !== null) element.setAttribute(attribute, value);
    });
  });

  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

  if (document.body.dataset.page !== '404') {
    const title = get(dict, 'meta.title');
    if (title) document.title = title;

    const description = document.querySelector('meta[name="description"]');
    const descriptionText = get(dict, 'meta.description');
    if (description && descriptionText) description.setAttribute('content', descriptionText);
  }

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = currentLang === 'pt' ? 'EN' : 'PT';
    toggle.setAttribute('aria-label', get(dict, 'lang.switch') || '');
  }
}

export function getLang() {
  return currentLang;
}

export function t(key) {
  const dict = dictionaries[currentLang];
  if (!dict) return null;
  return get(dict, key);
}

export function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    /* sem persistência: aplica só nesta sessão */
  }
  applyI18n();
}

export async function initI18n() {
  currentLang = readStoredLang();

  const [pt, en] = await Promise.all([
    fetch('data/i18n/pt.json').then((response) => {
      if (!response.ok) throw new Error('pt.json: ' + response.status);
      return response.json();
    }),
    fetch('data/i18n/en.json').then((response) => {
      if (!response.ok) throw new Error('en.json: ' + response.status);
      return response.json();
    })
  ]).catch((error) => {
    console.warn('[i18n] não foi possível carregar as traduções:', error.message);
    return [null, null];
  });

  if (!pt || !en) return;

  dictionaries = { pt, en };
  applyI18n();

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      setLang(currentLang === 'pt' ? 'en' : 'pt');
    });
  }
}
