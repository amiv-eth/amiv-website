import i18n from 'i18n4v';
import german from '../languages/de.json';
import english from '../languages/en.json';

let currentLang;

function changeLanguage(lang) {
  i18n.translator.reset();
  if (lang === 'de') {
    currentLang = 'de';
    i18n.translator.add(german);
  } else {
    currentLang = 'en';
    i18n.translator.add(english);
  }
  localStorage.setItem('lanuage', currentLang);
}

function getLang() {
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

function switchLanguage() {
  if (currentLang === 'en') {
    changeLanguage('de');
  } else {
    changeLanguage('en');
  }
}

function currentLanguage() {
  return currentLang;
}

export { i18n, changeLanguage, switchLanguage, currentLanguage, getLang };
