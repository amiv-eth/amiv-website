const m = require('mithril');

module.exports = {
  view(vnode) {
    return m('div', [
      m('nav', [
        m('a', { href: '/' }, 'AMIV'),
        m('a', { href: '/events' }, 'Events'),
        m('a', { href: '/studydocuments' }, 'Studienunterlagen'),
        m('a', { href: '/jobs' }, 'Jobs'),
        m('a', { href: '/profile' }, 'Profil'),
      ]),
      m('main', vnode.children),
    ]);
  },
};
