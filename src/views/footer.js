import m from 'mithril';
import { currentLanguage, i18n } from '../models/language';
import EthLogo from '../images/eth.svg';
import VsethLogo from '../images/vseth.svg';
import FacebookLogo from '../images/facebook_white.svg';
import InstagramLogo from '../images/instagram_white.svg';
import TwitterLogo from '../images/twitter_white.svg';

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
            `${i18n('contact')} / ${i18n('legal-notice')}`
          ),
        ]),
        m(
          'div.social-media-logos',
          m('a', { href: `https://www.facebook.com/AMIV.ETHZ/` }, m('img', { src: FacebookLogo })),
          m('a', { href: `https://www.instagram.com/amiv_eth/` }, m('img', { src: InstagramLogo })),
          m('a', { href: `https://twitter.com/amiv_ethz` }, m('img', { src: TwitterLogo }))
        ),
        m('div.institution-logos', [
          m('a', { href: `https://www.ethz.ch/` }, m('img', { src: EthLogo })),
          m(
            'div',
            {
              onclick: () => this.handleClick(),
            },
            renderVseth(this.coord)
          ),
        ]),
      ])
    );
  }
}
