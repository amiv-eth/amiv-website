import m from 'mithril';
import { currentLanguage } from './language';

/**
 * Navigation model to store the current state of the main navigation.
 *
 * @return {Navigation} Navigation state model
 */
export default class Navigation {
  constructor(items) {
    this._items = items;
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

  _checkMenuItemSelection() {
    let selectedIndex;
    this._items.forEach((item, index) => {
      const link = item.getLink();
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
    label: 'AMIV',
    getLink: () => `/${currentLanguage()}/about`,
    onupdate: m.route.link,
    submenu: new Navigation([
      {
        label: 'About AMIV',
        getLink: () => `/${currentLanguage()}/about`,
        onupdate: m.route.link,
      },
      {
        label: 'Board',
        getLink: () => `/${currentLanguage()}/board`,
        onupdate: m.route.link,
      },
      {
        label: 'Commissions',
        getLink: () => `/${currentLanguage()}/commissions`,
        onupdate: m.route.link,
      },
      {
        label: 'Statutes',
        getLink: () => `/${currentLanguage()}/statutes`,
        onupdate: m.route.link,
      },
      {
        label: 'Minutes',
        getLink: () => `/${currentLanguage()}/minutes`,
        onupdate: m.route.link,
      },
    ]),
  },
  {
    label: 'Events',
    getLink: () => `/${currentLanguage()}/events`,
    onupdate: m.route.link,
  },
  {
    label: 'Studydocuments',
    getLink: () => `/${currentLanguage()}/studydocuments`,
    onupdate: m.route.link,
  },
  {
    label: 'Jobs',
    getLink: () => `/${currentLanguage()}/jobs`,
    onupdate: m.route.link,
    submenu: new Navigation([
      {
        label: 'Jobs',
        getLink: () => `/${currentLanguage()}/jobs`,
        onupdate: m.route.link,
      },
      {
        label: 'Companies',
        getLink: () => `/${currentLanguage()}/companies`,
        onupdate: m.route.link,
      },
    ]),
  },
]);
