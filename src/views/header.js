import m from 'mithril';
import { Icon } from 'polythene-mithril';
import { mainNavigation } from '../models/navigation';
import logos from '../images/logos';
import icons from '../images/icons';
import { i18n, currentLanguage, changeLanguage } from '../models/language';
import Button from '../components/Button';
import { isLoggedIn, login } from '../models/auth';
import { isLsdTripEnabled, setLsdTripState, getTadaAnimation } from '../models/lsd';

let mobileMenuShowing = false;

class MobileMenuIcon {
  constructor() {
    this.change = false;
  }

  _toggle() {
    this.change = !this.change;
  }

  view({ attrs: { className = '', change = this.change, onclick = () => {} } }) {
    return m(
      'div.mobile-menu-icon',
      {
        className: `${className} ${change ? 'change' : ''}`,
        onclick: e => {
          this._toggle();
          onclick(e);
        },
      },
      [m('div.bar1'), m('div.bar2'), m('div.bar3')]
    );
  }
}

export default class Header {
  oninit() {
    this._mobileMenuShowing = mobileMenuShowing;
    mobileMenuShowing = false;
  }

  // eslint-disable-next-line class-methods-use-this
  onbeforeupdate() {
    mainNavigation.onupdate();
  }

  view() {
    return m(
      'header',
      { style: isLsdTripEnabled() ? 'animation: lsdtrip 2s linear infinite;' : null },
      m(
        'nav',
        {
          class: this._mobileMenuShowing ? 'expanded' : '',
          onmouseover: () => {
            setLsdTripState(true);
            m.redraw();
          },
        },
        [
          m(
            'a.logo',
            {
              href: `/${currentLanguage()}/`,
              onupdate: m.route.link,
              style: isLsdTripEnabled() ? getTadaAnimation() : null,
            },
            m('img', { src: logos.amiv, alt: 'AMIV an der ETH' })
          ),
          this.constructor._mainMenu,
          this.constructor._profileMenu,
          m('div.language-selector', [
            m(Button, {
              label: 'en',
              className: 'bordered-button',
              border: currentLanguage() === 'en',
              inactive: currentLanguage() === 'en',
              style: isLsdTripEnabled() ? getTadaAnimation() : null,
              tone: 'dark',
              events: { onclick: () => changeLanguage('en') },
            }),
            m(Button, {
              label: 'de',
              className: 'bordered-button',
              border: currentLanguage() === 'de',
              inactive: currentLanguage() === 'de',
              style: isLsdTripEnabled() ? getTadaAnimation() : null,
              tone: 'dark',
              events: { onclick: () => changeLanguage('de') },
            }),
          ]),
          m(MobileMenuIcon, {
            className: 'mobile-menu',
            style: isLsdTripEnabled() ? getTadaAnimation() : null,
            change: this._mobileMenuShowing,
            onclick: () => {
              this._mobileMenuShowing = !this._mobileMenuShowing;
            },
          }),
        ]
      )
    );
  }

  static get _mainMenu() {
    return m(
      'ul.mainmenu',
      mainNavigation.map((item, index) =>
        m(
          'li',
          {
            class: mainNavigation.selectedIndex === index ? 'active' : '',
          },
          [
            m(
              'a',
              {
                href: item.getLink(),
                style: isLsdTripEnabled() ? getTadaAnimation() : null,
                onclick: e => {
                  if (item.submenu) {
                    mobileMenuShowing = true;
                  }
                  if (item.getLink().startsWith('/')) {
                    m.route.set(item.getLink());
                    e.preventDefault();
                  }
                },
              },
              i18n(item.label)
            ),
            item.submenu
              ? [
                  m('div.phantomElement'),
                  m('ul.submenu', [
                    item.submenu.map((subitem, subindex) =>
                      m(
                        'li',
                        { class: item.submenu.selectedIndex === subindex ? 'active' : '' },
                        m(
                          'a',
                          {
                            href: subitem.getLink(),
                            onupdate: subitem.onupdate,
                          },
                          [
                            i18n(subitem.label),
                            subitem.url
                              ? m(Icon, {
                                  class: 'external-link',
                                  svg: { content: m.trust(icons.link) },
                                  size: 'small',
                                  alt: i18n('externalLink'),
                                })
                              : m(''),
                          ]
                        )
                      )
                    ),
                  ]),
                ]
              : m(''),
          ]
        )
      )
    );
  }

  static get _profileMenu() {
    return m(
      'ul.profile',
      isLoggedIn()
        ? [
            m(
              'li',
              {
                class: m.route.get().includes(`/profile`) ? 'active' : '',
              },
              m(
                'a',
                {
                  href: `/${currentLanguage()}/profile`,
                  onupdate: m.route.link,
                  style: isLsdTripEnabled() ? getTadaAnimation() : null,
                },
                i18n('mainMenu.profile')
              )
            ),
            m(
              'li',
              m(
                'a',
                {
                  href: `/${currentLanguage()}/logout`,
                  onupdate: m.route.link,
                  style: isLsdTripEnabled() ? getTadaAnimation() : null,
                },
                i18n('mainMenu.logout')
              )
            ),
          ]
        : [
            m(
              'li',
              { class: 'not-logged-in' },
              m(
                'a',
                {
                  style: isLsdTripEnabled() ? getTadaAnimation() : null,
                  href: `/${currentLanguage()}/profile`,
                  onclick: e => {
                    login(`/${currentLanguage()}/profile`);
                    e.preventDefault();
                  },
                },
                m('span', i18n('mainMenu.login'))
              )
            ),
          ]
    );
  }
}
