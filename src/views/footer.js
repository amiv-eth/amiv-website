import m from 'mithril';
import { currentLanguage, i18n } from '../models/language';
import EthLogo from '../images/eth.svg';
import VsethLogo from '../images/vseth.svg';

const renderVseth = coord => {
  const style = `
    z-index: 999;
    left: ${coord[0]}px;
    top: ${coord[1]}px;
  `;

  return m(
    'a',
    {
      onclick: false,
      href: `https://vseth.ethz.ch/`,
      style,
    },
    m('img', { src: VsethLogo })
  );
};

export default class Footer {
  oninit() {
    this.coord = [0, 0];
  }

  handleClick() {
    const x = -Math.random() * 400;
    const y = -Math.random() * 400;
    this.coord = [x, y];
    return false;
  }

  view() {
    return m(
      'footer',
      m('div', [
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
          {
            onclick: () => this.handleClick(),
          },
          renderVseth(this.coord)
        ),
      ])
    );
  }
}
