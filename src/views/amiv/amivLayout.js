import m from 'mithril';

module.exports = {
  view(vnode) {
    return m('div', [
      m('ul', [
        m('li', m('a', { href: '/amiv/board', oncreate: m.route.link }, 'Vorstand')),
        m('li', m('a', { href: '/amiv/aufenthaltsraum', oncreate: m.route.link }, 'Aufenthaltsraum')),
        m('li', m('a', { href: '/amiv/statuten', oncreate: m.route.link }, 'Statuten')),
        m('li', m('a', { href: '/amiv/comissions', oncreate: m.route.link }, 'Kommissionen')),
        m('li', m('a', { href: '/amiv/protocols', oncreate: m.route.link }, 'Protokolle')),
      ]),
      m('main', vnode.children),
    ]);
  },
};
