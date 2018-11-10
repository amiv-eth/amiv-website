import m from 'mithril';
import { currentLanguage, i18n } from '../models/language';
import EthLogo from '../images/eth.svg';
import VsethLogo from '../images/vseth.svg';

export default class Footer {
  static view() {
    return m('footer', [
      m('div.copyright', [
        m('span', `© 1893 - ${new Date().getFullYear()} AMIV an der ETH`),
        m(
          'a',
          {
            href: `/${currentLanguage()}/legal-notice`,
            onupdate: m.route.link,
          },
          i18n('legal-notice')
        ),
      ]),
      m('div.footer-logo', m('a', { href: `https://www.ethz.ch/` }, m('img', { src: EthLogo }))),
      m(
        'div.footer-logo',
        m('a', { href: `https://vseth.ethz.ch/` }, m('img', { src: VsethLogo }))
      ),
    ]);
  }
}
