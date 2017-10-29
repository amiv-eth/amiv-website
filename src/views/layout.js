const m = require('mithril');
const auth = require('../models/auth');

module.exports = {
  oninit: auth.checkLogin,
  view(vnode) {
    if (auth.authenticated === false) {
      return m('div', [
        m('nav', [
          m('a', { href: '/' }, 'AMIV'),
          m('a', { href: '/#!/events' }, 'Events'),
          m('a', { href: '/#!/studydocuments' }, 'Studienunterlagen'),
          m('a', { href: '/#!/jobs' }, 'Jobs'),
          m('a', { href: '/#!/login' }, 'Login'),
        ]),
        m('main', vnode.children),
      ]);
    }
    return m('div', [
      m('nav', [
        m('a', { href: '/' }, 'AMIV'),
        m('a', { href: '/#!/events' }, 'Events'),
        m('a', { href: '/#!/studydocuments' }, 'Studienunterlagen'),
        m('a', { href: '/#!/jobs' }, 'Jobs'),
        m('a', { href: '/#!/profile' }, 'Profil'),
        m('a', {
          href: '#',
          onclick: () => {
            auth.logout();
            return false;
          },
        }, 'Logout'),
      ]),
      m('main', vnode.children),
    ]);
  },
};
