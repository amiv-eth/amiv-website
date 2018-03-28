import m from 'mithril';
import i18n from 'i18n4v';
import german from '../languages/de.json';
import english from '../languages/en.json';

let _currentLanguage;

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

function isLanguageValid(language) {
  return ['en', 'de'].indexOf(language) > -1;
}

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

function switchLanguage() {
  if (_currentLanguage === 'en') {
    _currentLanguage = 'de';
  } else {
    _currentLanguage = 'en';
  }
  m.route.set(`/${_currentLanguage}${m.route.get().substring(3)}`);
}

function currentLanguage() {
  if (!_currentLanguage) {
    loadLanguage();
  }
  return _currentLanguage;
}

export { i18n, changeLanguage, switchLanguage, currentLanguage, loadLanguage, isLanguageValid };
