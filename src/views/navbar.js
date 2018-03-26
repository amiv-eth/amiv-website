import m from 'mithril';
import { Tabs } from '../components';
import { checkLogin, isLoggedIn } from '../models/auth';

const defaultTabs = ['AMIV', 'Events', 'Studienunterlagen', 'Jobs'];
const tabsLoggedOut = ['Login'];
const tabsLoggedIn = ['Profile', 'Logout'];
const tabToUrl = {
  AMIV: { href: '/', onupdate: m.route.link, index: 0 },
  Events: { href: '/events', onupdate: m.route.link, index: 1 },
  Studienunterlagen: { href: '/studydocuments', onupdate: m.route.link, index: 2 },
  Jobs: { href: '/jobs', onupdate: m.route.link, index: 3 },
  Login: { href: '/login', onupdate: m.route.link, index: 4 },
  Profile: { href: '/profile', onupdate: m.route.link, index: 4 },
  Logout: { href: '/logout', onupdate: m.route.link, index: 5 },
};

export default class Navbar {
  constructor() {
    checkLogin();
    this.wasLoggedIn = isLoggedIn();
    this.selectedTabIndex = 0;
    Object.values(tabToUrl)
      .filter(tab => m.route.get().includes(tab.href))
      .forEach(tab => {
        this.selectedTabIndex = tab.index;
      });

    this.tabOptions = {
      className: 'themed-tabs',
      activeSelected: true,
      element: 'tab',
      selectedTab: this.selectedTabIndex,
    };
    this.setTabs();
  }

  setTabs() {
    if (isLoggedIn()) {
      this.tabs = [...defaultTabs, ...tabsLoggedIn];
    } else {
      this.tabs = [...defaultTabs, ...tabsLoggedOut];
    }

    this.tabOptions.tabs = [];
    this.tabs.forEach(tab => {
      this.tabOptions.tabs.push({
        label: tab,
        url: tabToUrl[tab],
      });
    });
  }

  onupdate() {
    Object.values(tabToUrl)
      .filter(tab => m.route.get().includes(tab.href))
      .forEach(tab => {
        this.selectedTabIndex = tab.index;
      });
    this.tabOptions.selectedTab = this.selectedTabIndex;
    if (this.wasLoggedIn !== isLoggedIn()) {
      this.wasLoggedIn = isLoggedIn();
      this.setTabs();
    }
  }

  view() {
    return m(Tabs, this.tabOptions);
  }
}
