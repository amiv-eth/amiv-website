import m from 'mithril';
import i18n from 'i18n4v';
import german from '../languages/de.json';
import english from '../languages/en.json';

const languages = {
  en: english,
  de: german,
};

let currentLang;

function changeLanuage(lang) {
  if (lang === 'de') {
    // i18n.setLanguage('de');
    console.log('set language to german');
    currentLang = 'de';
    i18n.translator.reset();
    i18n.translator.add(german);
  } else {
    // i18n.setLanguage('en');
    console.log('set language to english');
    currentLang = 'en';
    i18n.translator.reset();
    i18n.translator.add(english);
    i18n.translator.applyToHTML();
  }
}

function switchLanguage() {
  if (currentLang === 'en') {
    changeLanuage('de');
  } else {
    changeLanuage('en');
  }
}
i18n.selectLanguage(['en', 'de'], (err, lang) => {
  console.log(m.route.get());
  i18n.translator.add(languages[lang] ? languages[lang] : languages.en);
});

export { i18n, changeLanuage, switchLanguage };
