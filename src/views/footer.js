import m from 'mithril';
import { Icon } from 'polythene-mithril';
import { currentLanguage, i18n } from '../models/language';
import logos from '../images/logos';
import icons from '../images/icons';
import { isLsdTripEnabled, getTadaAnimation } from '../models/lsd';

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
    m('img', {
      style: isLsdTripEnabled() ? 'animation: lsdtrip 2s linear infinite;' : null,
      src: logos.vseth,
      alt: 'VSETH',
    })
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
    return [
      m('div.report-issue', [
        ...(isLsdTripEnabled()
          ? [
              m(
                'div',
                {
                  style: {
                    width: '100%',
                    height: '1.3em',
                    overflow: 'hidden',
                    position: 'relative',
                  },
                },
                [
                  m('span.greeting.animation1', `++++ ${i18n('greetingCodingWeekend')} ++++`),
                  m('span.greeting.animation2', `++++ ${i18n('greetingCodingWeekend')} ++++`),
                  m('span.greeting.animation3', `++++ ${i18n('greetingCodingWeekend')} ++++`),
                ]
              ),
            ]
          : [
              m('span', i18n('footer.issueSpotted')),
              m(
                'a',
                {
                  href: 'https://gitlab.ethz.ch/amiv/amiv-website/issues/new?issuable_template=bug',
                  target: '_blank',
                },
                [
                  i18n('footer.issueReport'),
                  m(Icon, {
                    class: 'external-link',
                    svg: { content: m.trust(icons.link) },
                    size: 'small',
                    alt: i18n('externalLink'),
                  }),
                ]
              ),
            ]),
      ]),
      m(
        'footer',
        { style: isLsdTripEnabled() ? 'animation: lsdtrip 2s linear infinite;' : null },
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
              {
                style: isLsdTripEnabled() ? getTadaAnimation() : null,
                href: `https://www.facebook.com/AMIV.ETHZ/`,
              },
              m(Icon, {
                size: 'medium',
                svg: { content: m.trust(icons.facebook) },
                alt: 'Facebook',
              })
            ),
            m(
              'a',
              {
                style: isLsdTripEnabled() ? getTadaAnimation() : null,
                href: `https://www.instagram.com/amiv_eth/`,
              },
              m(Icon, {
                size: 'medium',
                svg: { content: m.trust(icons.instagram) },
                alt: 'Instagram',
              })
            ),
            m(
              'a',
              {
                style: isLsdTripEnabled() ? getTadaAnimation() : null,
                href: `https://twitter.com/amiv_ethz`,
              },
              m(Icon, { size: 'medium', svg: { content: m.trust(icons.twitter) }, alt: 'Twitter' })
            )
          ),
          m('div.institution-logos', [
            m(
              'a',
              {
                style: isLsdTripEnabled() ? getTadaAnimation() : null,
                href: `https://www.ethz.ch/`,
              },
              m('img', {
                style: isLsdTripEnabled() ? 'animation: lsdtrip 2s linear infinite;' : null,
                src: logos.eth,
                alt: 'ETH Zürich',
              })
            ),
            m(
              'div',
              {
                style: isLsdTripEnabled() ? getTadaAnimation() : null,
                onclick: () => this.handleClick(),
              },
              renderVseth(this.coord)
            ),
          ]),
        ])
      ),
    ];
  }
}
