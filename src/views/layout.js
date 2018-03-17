import m from 'mithril';
import { i18n, switchLanguage } from '../models/language';
import { Button, Tabs } from '../components';
import { checkLogin, isLoggedIn, logout } from '../models/auth';

const defaultTabs = ['AMIV', 'Events', 'Studienunterlagen', 'Jobs'];
const tabsLoggedOut = ['Login'];
const tabsLoggedIn = ['Profil', 'Logout'];

const gotoRoute = route => {
  const current = m.route.get();
  if (current !== route) m.route.set(route);
};

export default class Layout {
  constructor() {
    checkLogin();
    this.setTabs();
    this.selectedTabIndex = 0;
    this.wasLoggedIn = isLoggedIn();
  }

  setTabs() {
    const tabOptions = isLoggedIn() ? tabsLoggedIn : tabsLoggedOut;
    this.tabs = [...defaultTabs, ...tabOptions];
  }

  selectTab(tabIndex) {
    const tabString = this.tabs[tabIndex];
    switch (tabString) {
      case 'AMIV':
        gotoRoute('/');
        break;
      case 'Events':
        gotoRoute('/events');
        break;
      case 'Studienunterlagen':
        gotoRoute('/studydocuments');
        break;
      case 'Jobs':
        gotoRoute('/jobs');
        break;
      case 'Profil':
        gotoRoute('/profile');
        break;
      case 'Logout':
        gotoRoute('/');
        logout();
        break;
      case 'Login':
        gotoRoute('/login');
        break;
      default:
        console.log('Tab not known!');
    }
  }

  onupdate() {
    if (this.wasLoggedIn !== isLoggedIn()) {
      this.selectedTabIndex = 0;
      this.wasLoggedIn = isLoggedIn();
      this.setTabs();
    }
  }

  view(vnode) {
    return m('div#amiv-container', [
      m(Tabs, {
        onChange: ({ index }) => {
          this.selectedTabIndex = index;
          this.selectTab(index);
        },
        tabs: this.tabs.map(tab => ({ label: tab })),
        selectedTab: this.selectedTabIndex,
      }),
      m('main', vnode.children),
    ]);
  }
}
