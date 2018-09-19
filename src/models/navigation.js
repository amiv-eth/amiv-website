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
      if (newItem.addLanguagePrefix) {
        newItem.getLink = addLanguagePrefix => Navigation._getLink(newItem.path, addLanguagePrefix);
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

  static _getLink(path, addLanguagePrefix = true) {
    if (addLanguagePrefix) {
      return `/${currentLanguage()}${path}`;
    }
    return path;
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
        label: 'Commissions',
        path: '/commissions',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
      {
        label: 'Statutes',
        path: '/statutes',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
      {
        label: 'Minutes',
        path: '/minutes',
        addLanguagePrefix: true,
        onupdate: m.route.link,
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
        path: '/companies',
        addLanguagePrefix: true,
        onupdate: m.route.link,
      },
    ]),
  },
]);
