import m from 'mithril';
import { i18n, currentLanguage } from '../../models/language';

module.exports = {
  view(vnode) {
    return m('div', [
      m('ul', [
        m(
          'li',
          m(
            'a',
            {
              href: `/${currentLanguage()}/amiv/board`,
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
              href: `/${currentLanguage()}/amiv/about`,
              oncreate: m.route.link,
            },
            i18n('About AMIV')
          )
        ),
        m(
          'li',
          m(
            'a',
            {
              href: `/${currentLanguage()}/amiv/statutes`,
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
              href: `/${currentLanguage()}/amiv/commissions`,
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
