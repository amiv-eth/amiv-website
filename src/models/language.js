import m from 'mithril';
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import german from '../languages/de';
import english from '../languages/en';

/**
 * Check if a given language code is valid.
 *
 * @param {string} language two-letter language code
 * @return `true` - if valid; `false` - otherwise
 */
function isLanguageValid(language) {
  return i18next.languages.indexOf(language) > -1;
}

/**
 * Load language from `LocalStorage` or from the browser
 * language preference header.
 *
 * This function sets the current language accordingly.
 */
function loadLanguage() {
  i18next.use(LngDetector).init({
    fallbackLng: 'en',
    whitelist: ['en', 'de'],
    nsSeparator: false,
    initImmediate: false,
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupCookie: 'language',
      lookupLocalStorage: 'language',
      lookupFromPathIndex: 0,
    },
    resources: {
      en: {
        translation: english,
      },
      de: {
        translation: german,
      },
    },
  });
}

/**
 * Get the current language.
 *
 * @return two-letter language code
 */
function currentLanguage() {
  if (!i18next.language) {
    loadLanguage();
  }
  return i18next.language;
}

/**
 * Get the current locale based on the configured language.
 *
 * @return locale string
 */
function currentLocale() {
  if (i18next.language === 'en') return 'en-GB';

  return 'de-DE';
}

/**
 * Change the language of the current page.
 *
 * @param {string} language two-letter code for the desired language.
 */
function changeLanguage(language) {
  i18next.changeLanguage(language);
  m.route.set(`/${currentLanguage()}${m.route.get().substring(3)}`);
}

/**
 * Get a translation based on the configured language.
 *
 * @return translated string
 */
function i18n(key, values = null) {
  if (values) {
    return i18next.t(key, values);
  }
  return i18next.t(key);
}

export { i18n, changeLanguage, currentLanguage, currentLocale, loadLanguage, isLanguageValid };
