import m from 'mithril';
import { currentLanguage, i18n } from '../models/language';

export default class Footer {
  static view() {
    return m(
      'footer',
      m(
        'section.blue',
        m('div', [
          m('span.copyright', `© 1893 - ${new Date().getFullYear()} AMIV an der ETH`),
          m(
            'a',
            {
              href: `/${currentLanguage()}/legal-notice`,
              onupdate: m.route.link,
            },
            i18n('legal-notice')
          ),
        ])
      )
    );
  }
}
