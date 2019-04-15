import m from 'mithril';
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import german from '../languages/de';
import english from '../languages/en';

function setLanguageAttribute() {
  document.documentElement.setAttribute('lang', i18next.language);
}

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
  i18next
    .use(LngDetector)
    .init({
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
    })
    .then(() => {
      setLanguageAttribute();
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
  document.documentElement.setAttribute('lang', currentLanguage);
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

const dateFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
  timeZone: 'Europe/Zurich',
};
// Note that we need seperate objects for the different languages
// (or they would need to be reinitialized on language change)
const dateFormatter = {
  en: {
    short: new Intl.DateTimeFormat('en-GB', {
      ...dateFormatOptions,
      timeZoneName: 'short',
    }),
    weekday: new Intl.DateTimeFormat('en-GB', {
      ...dateFormatOptions,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'long',
    }),
    weekdayTimezone: new Intl.DateTimeFormat('en-GB', {
      ...dateFormatOptions,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'long',
      timeZoneName: 'short',
    }),
  },
  de: {
    short: new Intl.DateTimeFormat('de-DE', {
      ...dateFormatOptions,
      timeZoneName: 'short',
    }),
    weekday: new Intl.DateTimeFormat('de-DE', {
      ...dateFormatOptions,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'long',
    }),
    weekdayTimezone: new Intl.DateTimeFormat('de-DE', {
      ...dateFormatOptions,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'long',
      timeZoneName: 'short',
    }),
  },
};

/**
 * Format date
 *
 * @param {Date} date
 *
 * @return formatted date in a {string}
 */
function formatDate(date) {
  // check if the dates are valid
  if (date instanceof Date && !Number.isNaN(date.valueOf())) {
    return dateFormatter[i18next.language].weekdayTimezone.format(date);
  }

  return {};
}

/**
 * Format duration between `start_date` and `end_date`
 *
 * @param {Date} date_start
 * @param {Date} date_end
 *
 * @return formatted dates in a list of strings
 */
function formatDateDuration(date_start, date_end) {
  // check if the dates are valid
  if (
    date_start instanceof Date &&
    !Number.isNaN(date_start.valueOf()) &&
    date_end instanceof Date &&
    !Number.isNaN(date_end.valueOf())
  ) {
    if (
      date_start.getDate() === date_end.getDate() ||
      (date_start.getDate() === date_end.getDate() - 1 &&
        date_start.getHours() > date_end.getHours())
    ) {
      return [
        dateFormatter[i18next.language].weekday.format(date_start),
        dateFormatter[i18next.language].short.format(date_end),
      ];
    }

    return [
      dateFormatter[i18next.language].weekday.format(date_start),
      dateFormatter[i18next.language].weekdayTimezone.format(date_end),
    ];
  }

  return [];
}

export {
  i18n,
  changeLanguage,
  currentLanguage,
  currentLocale,
  loadLanguage,
  isLanguageValid,
  formatDate,
  formatDateDuration,
};
