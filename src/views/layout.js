import m from 'mithril';
import { checkLogin, isLoggedIn, logout } from '../models/auth';
import { Tabs } from '../components';

const defaultTabs = [
  { label: 'AMIV', href: '/', oncreate: m.route.link },
  { label: 'Events', href: '/events', oncreate: m.route.link },
  { label: 'Studienunterlagen', href: '/studydocuments', oncreate: m.route.link },
  { label: 'Jobs', href: '/jobs', oncreate: m.route.link },
];

const tabsLoggedOut = () => [
  {
    label: 'Login',
    href: '/login',
    oncreate: m.route.link,
  },
];

const tabsLoggedIn = () => [
  { label: 'Profil', href: '/profile', oncreate: m.route.link },
  {
    label: 'Logout',
    events: {
      onclick: () => {
        logout().then(() => {
          m.route.set('/');
        });
        return false;
      },
    },
  },
];

module.exports = {
  oninit: checkLogin,
  view(vnode) {
    const tabOptions = isLoggedIn() ? tabsLoggedIn(vnode) : tabsLoggedOut(vnode);
    return m('div', [
      m(Tabs, { tabs: [...defaultTabs, ...tabOptions] }),
      m('main', vnode.children),
    ]);
  },
};
