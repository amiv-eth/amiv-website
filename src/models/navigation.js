import m from 'mithril';
import { checkLogin, isLoggedIn } from '../models/auth';
import { currentLanguage } from './language';

const defaultTabs = ['AMIV', 'Events', 'Studienunterlagen', 'Jobs'];
const tabsLoggedOut = ['Login'];
const tabsLoggedIn = ['Profile', 'Logout'];
const tabToUrl = {
  AMIV: { href: `/${currentLanguage()}/`, onupdate: m.route.link, index: 0 },
  Events: { href: `/${currentLanguage()}/events`, onupdate: m.route.link, index: 1 },
  Studienunterlagen: {
    href: `/${currentLanguage()}/studydocuments`,
    onupdate: m.route.link,
    index: 2,
  },
  Jobs: { href: `/${currentLanguage()}/jobs`, onupdate: m.route.link, index: 3 },
  Login: { href: `/${currentLanguage()}/login`, onupdate: m.route.link, index: 4 },
  Profile: { href: `/${currentLanguage()}/profile`, onupdate: m.route.link, index: 4 },
  Logout: { href: `/${currentLanguage()}/logout`, onupdate: m.route.link, index: 5 },
};

export default class Navigation {
  constructor() {
    checkLogin();
    this._wasLoggedIn = isLoggedIn();
    this._selectedTabIndex = 0;
    Object.values(tabToUrl)
      .filter(tab => m.route.get().includes(tab.href))
      .forEach(tab => {
        this._selectedTabIndex = tab.index;
      });

    this._tabOptions = {
      className: 'themed-tabs',
      activeSelected: true,
      element: 'tab',
      selectedTab: this._selectedTabIndex,
    };
    this.setTabs();
  }

  setTabs() {
    if (isLoggedIn()) {
      this._tabs = [...defaultTabs, ...tabsLoggedIn];
    } else {
      this._tabs = [...defaultTabs, ...tabsLoggedOut];
    }

    this._tabOptions.tabs = [];
    this._tabs.forEach(tab => {
      this._tabOptions.tabs.push({
        label: tab,
        url: tabToUrl[tab],
      });
    });
  }

  get tabs() {
    return this._tabOptions;
  }

  onupdate() {
    Object.values(tabToUrl)
      .filter(tab => m.route.get().includes(tab.href))
      .forEach(tab => {
        this._selectedTabIndex = tab.index;
      });
    this._tabOptions.selectedTab = this._selectedTabIndex;
    if (this._wasLoggedIn !== isLoggedIn()) {
      this._wasLoggedIn = isLoggedIn();
      this.setTabs();
    }
  }
}
