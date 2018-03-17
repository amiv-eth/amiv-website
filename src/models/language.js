import i18n from 'i18n4v';
import german from '../languages/de.json';
import english from '../languages/en.json';

let currentLang;

function changeLanguage(lang) {
  if (lang === 'de') {
    // i18n.setLanguage('de');
    console.log('set language to german');
    currentLang = 'de';
    i18n.translator.reset();
    i18n.translator.add(german);
    i18n.translator.applyToHTML();
  } else {
    // i18n.setLanguage('en');
    console.log('set language to english');
    currentLang = 'en';
    i18n.translator.reset();
    i18n.translator.add(english);
    i18n.translator.applyToHTML();
  }
}

function getLang() {
  let lang;
  if (navigator.languages !== undefined) [lang] = navigator.languages;
  else lang = navigator.language;

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