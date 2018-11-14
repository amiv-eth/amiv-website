import m from 'mithril';
import i18n from 'i18n4v';
import german from '../languages/de.json';
import english from '../languages/en.json';

let _currentLanguage;

/**
 * Check if a given language code is valid.
 *
 * @param {string} language two-letter language code
 * @return `true` - if valid; `false` - otherwise
 */
function isLanguageValid(language) {
  return ['en', 'de'].indexOf(language) > -1;
}

/**
 * Change the language of the current page.
 *
 * @param {string} language two-letter code for the desired language.
 */
function changeLanguage(language) {
  if (!isLanguageValid(language)) return;

  _currentLanguage = language;

  i18n.translator.reset();
  if (language === 'de') {
    _currentLanguage = 'de';
    i18n.translator.add(german);
  } else {
    _currentLanguage = 'en';
    i18n.translator.add(english);
  }
  localStorage.setItem('language', _currentLanguage);

  m.route.set(`/${_currentLanguage}${m.route.get().substring(3)}`);
}

/**
 * Set language
 *
 * @param {string} language two-letter code for the desired language.
 */
function setLanguage(language) {
  _currentLanguage = language;
}

/**
 * Load language from `LocalStorage` or from the browser
 * language preference header.
 *
 * This function sets the current language accordingly.
 */
function loadLanguage() {
  let lang = localStorage.getItem('language');
  if (!lang) {
    if (navigator.languages !== undefined) {
      lang = navigator.languages.toString();
    } else {
      lang = navigator.language;
    }
  }
  if (lang.indexOf('de') !== -1) {
    setLanguage('de');
  } else {
    setLanguage('en');
  }
}

/**
 * Get the current language.
 *
 * @return two-letter language code
 */
function currentLanguage() {
  if (!_currentLanguage) {
    loadLanguage();
  }
  return _currentLanguage;
}

export { i18n, changeLanguage, setLanguage, currentLanguage, loadLanguage, isLanguageValid };
