import m from 'mithril';
import { currentLanguage } from './language';

/**
 * Navigation model to store the current state of the main navigation.
 *
 * @return {Navigation} Navigation state model
 */
export default class Navigation {
  constructor(items) {
    this._items = items.map(item => {
      const newItem = Object.assign({}, item);
      if (newItem.url) {
        newItem.getLink = () => Navigation._getUrlLink(newItem.url);
      } else if (newItem.addLanguagePrefix) {
        newItem.getLink = addLanguagePrefix =>
          Navigation._getPathLink(newItem.path, addLanguagePrefix);
      } else {
        newItem.getLink = () => newItem.path;
      }
      return newItem;
    });
  }

  get items() {
    return this._items;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  get selectedItem() {
    return this._selectedIndex >= 0 ? this._items[this._selectedIndex] : undefined;
  }

  map(callback) {
    return this._items.map(callback);
  }

  onupdate() {
    this._items.forEach(item => {
      if (item.submenu) {
        item.submenu.onupdate();
      }
    });
    this._selectedIndex = this._checkMenuItemSelection();
  }

  static _getPathLink(path, addLanguagePrefix = true) {
    if (addLanguagePrefix) {
      return `/${currentLanguage()}${path}`;
    }
    return path;
  }

  static _getUrlLink(url) {
    if (url instanceof Object) {
      if (url[currentLanguage()]) {
        return url[currentLanguage()];
      }

      let language;

      if (url.en) {
        language = 'en';
      } else {
        [language] = Object.keys(url);
      }
      return url[language];
    }

    return url;
  }

  _checkMenuItemSelection() {
    let selectedIndex;
    this._items.forEach((item, index) => {
      const link = item.getLink(false);
      if (
        (link.length <= 4 && m.route.get() === link) ||
        (link.length > 4 && m.route.get().includes(link)) ||
        (item.submenu && item.submenu.selectedIndex)
      ) {
        selectedIndex = index;
      }
    });
    this._selectedIndex = selectedIndex;
    return this._selectedIndex;
  }
}

export const mainNavigation = new Navigation([
  {
    label: 'Info',
    path: '/about',
    addLanguagePrefix: true,
    onupdate: m.route.link,
    submenu: new Navigation([
      {
        label: 'About AMIV',
        path: '/about',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
      {
        label: 'Board',
        path: '/board',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
      {
        label: 'Teams',
        path: '/teams',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
      {
        label: 'Statutes',
        url: 'https://cloud.amiv.ethz.ch/index.php/s/statutes',
      },
      {
        label: 'Minutes',
        url: 'https://cloud.amiv.ethz.ch/index.php/s/minutes',
      },
    ]),
  },
  {
    label: 'Events',
    path: '/events',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
  {
    label: 'Studydocuments',
    path: '/studydocuments',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
  {
    label: 'Jobs',
    path: '/jobs',
    addLanguagePrefix: true,
    onupdate: m.route.link,
    submenu: new Navigation([
      {
        label: 'Jobs',
        path: '/jobs',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
      {
        label: 'Companies',
        url: {
          de: 'https://kontakt.amiv.ethz.ch/de/students/companyprofiles',
          en: 'https://kontakt.amiv.ethz.ch/en/students/companyprofiles',
        },
      },
    ]),
  },
]);
