import m from 'mithril';
import { Icon } from 'polythene-mithril';
import { currentLanguage, i18n } from '../models/language';
import logos from '../images/logos';
import icons from '../images/icons';

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
    m('img', { src: logos.vseth, alt: 'VSETH' })
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
            `${i18n('contact')} / ${i18n('legalNotice.title')}`
          ),
        ]),
        m(
          'div.social-media-logos',
          m(
            'a',
            { href: `https://www.facebook.com/AMIV.ETHZ/` },
            m(Icon, { size: 'medium', svg: { content: m.trust(icons.facebook) }, alt: 'Facebook' })
          ),
          m(
            'a',
            { href: `https://www.instagram.com/amiv_eth/` },
            m(Icon, {
              size: 'medium',
              svg: { content: m.trust(icons.instagram) },
              alt: 'Instagram',
            })
          ),
          m(
            'a',
            { href: `https://twitter.com/amiv_ethz` },
            m(Icon, { size: 'medium', svg: { content: m.trust(icons.twitter) }, alt: 'Twitter' })
          )
        ),
        m('div.institution-logos', [
          m('a', { href: `https://www.ethz.ch/` }, m('img', { src: logos.eth, alt: 'ETH Zürich' })),
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
