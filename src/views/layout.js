import m from 'mithril';
import { i18n, switchLanguage } from '../models/language';
import { Button } from '../components';

import { checkLogin, isLoggedIn, logout } from '../models/auth';

const layoutCommon = [
  m('a', { href: '/', oncreate: m.route.link }, i18n('AMIV')),
  m('a', { href: '/events', oncreate: m.route.link }, i18n('Events')),
  m('a', { href: '/studydocuments', oncreate: m.route.link }, i18n('Studienunterlagen')),
  m('a', { href: '/jobs', oncreate: m.route.link }, i18n('Jobs')),
  m(Button, {
    label: i18n('language_button'),
    events: { onclick: () => switchLanguage() },
  }),
];

const layoutLoggedOut = vnode =>
  m('div', [
    m('nav', [layoutCommon, m('a', { href: '/login', oncreate: m.route.link }, i18n('Login'))]),
    m('main', vnode.children),
  ]);

const layoutLoggedIn = vnode =>
  m('div', [
    m('nav', [
      layoutCommon,
      m('a', { href: '/profile', oncreate: m.route.link }, i18n('Profil')),
      m(
        'a',
        {
          href: '/',
          onclick: () => {
            logout().then(() => {
              m.route.set('/');
            });
            return false;
          },
        },
        'Logout'
      ),
    ]),
    m('main', vnode.children),
  ]);

module.exports = {
  oninit: checkLogin,
  view(vnode) {
    return isLoggedIn() ? layoutLoggedIn(vnode) : layoutLoggedOut(vnode);
  },
};
