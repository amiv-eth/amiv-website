import m from 'mithril';
import i18n from 'i18n4v';
import german from '../languages/de.json';
import english from '../languages/en.json';

let _currentLanguage;

/**
 * Change the current language.
 *
 * Sets the current lanugage to the given code if it is
 * a valid code or to the default language `en` otherwise.
 *
 * @param {string} language two-letter language code
 */
function changeLanguage(language) {
  i18n.translator.reset();
  if (language === 'de') {
    _currentLanguage = 'de';
    i18n.translator.add(german);
  } else {
    _currentLanguage = 'en';
    i18n.translator.add(english);
  }
  localStorage.setItem('lanuage', _currentLanguage);
}

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
 * Load language from `LocalStorage` or from the browser
 * language preference header.
 *
 * This function sets the current language accordingly.
 */
function loadLanguage() {
  let lang = localStorage.getItem('lanuage');
  if (!lang) {
    if (navigator.languages !== undefined) {
      lang = navigator.languages.toString();
    } else {
      lang = navigator.language;
    }
  }
  if (lang.indexOf('de') !== -1) {
    changeLanguage('de');
  } else {
    changeLanguage('en');
  }
}

/**
 * Switch the language of the current page.
 *
 * Behavior:
 *   - `en` => `de`
 *   - `de` => `en`
 */
function switchLanguage() {
  if (_currentLanguage === 'en') {
    _currentLanguage = 'de';
  } else {
    _currentLanguage = 'en';
  }
  m.route.set(`/${_currentLanguage}${m.route.get().substring(3)}`);
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

export { i18n, changeLanguage, switchLanguage, currentLanguage, loadLanguage, isLanguageValid };
