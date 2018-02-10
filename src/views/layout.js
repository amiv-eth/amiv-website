import { checkLogin, isLoggedIn, logout } from '../models/auth';

const m = require('mithril');

const layoutLoggedOut = vnode => m('div', [
  m('nav', [
    m('a', { href: '/', oncreate: m.route.link }, 'AMIV'),
    m('a', { href: '/events', oncreate: m.route.link }, 'Events'),
    m('a', { href: '/studydocuments', oncreate: m.route.link }, 'Studienunterlagen'),
    m('a', { href: '/jobs', oncreate: m.route.link }, 'Jobs'),
    m('a', { href: '/login', oncreate: m.route.link }, 'Login'),
  ]),
  m('main', vnode.children),
]);

const layoutLoggedIn = vnode => m('div', [
  m('nav', [
    m('a', { href: '/', oncreate: m.route.link }, 'AMIV'),
    m('a', { href: '/events', oncreate: m.route.link }, 'Events'),
    m('a', { href: '/studydocuments', oncreate: m.route.link }, 'Studienunterlagen'),
    m('a', { href: '/jobs', oncreate: m.route.link }, 'Jobs'),
    m('a', { href: '/profile', oncreate: m.route.link }, 'Profil'),
    m('a', {
      href: '/',
      onclick: () => {
        logout().then(() => { m.route.set('/'); });
        return false;
      },
      oncreate: m.route.link,
    }, 'Logout'),
  ]),
  m('main', vnode.children),
]);

module.exports = {
  oninit: checkLogin,
  view(vnode) {
    return isLoggedIn() ? layoutLoggedIn(vnode) : layoutLoggedOut(vnode);
  },
};
