import m from 'mithril';
import { i18n } from '../../models/language';

module.exports = {
  view(vnode) {
    return m('div', [
      m('ul', [
        m(
          'li',
          m(
            'a',
            {
              href: '/amiv/board',
              oncreate: m.route.link,
            },
            i18n('Vorstand')
          )
        ),
        m(
          'li',
          m(
            'a',
            {
              href: '/amiv/aufenthaltsraum',
              oncreate: m.route.link,
            },
            i18n('Aufenthaltsraum')
          )
        ),
        m(
          'li',
          m(
            'a',
            {
              href: '/amiv/statuten',
              oncreate: m.route.link,
            },
            i18n('Statuten')
          )
        ),
        m(
          'li',
          m(
            'a',
            {
              href: '/amiv/comissions',
              oncreate: m.route.link,
            },
            i18n('Kommissionen')
          )
        ),
        m(
          'li',
          m(
            'a',
            {
              href: '/amiv/protocols',
              oncreate: m.route.link,
            },
            i18n('Protokolle')
          )
        ),
      ]),
      m('main', vnode.children),
    ]);
  },
};
