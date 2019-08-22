import m from 'mithril';
import { Icon } from 'polythene-mithril';
import { mainNavigation } from '../models/navigation';
import logos from '../images/logos';
import icons from '../images/icons';
import { i18n, currentLanguage, changeLanguage } from '../models/language';
import Button from '../components/Button';
import { isLoggedIn, login } from '../models/auth';

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
      m(
        'nav',
        {
          class: this._mobileMenuShowing ? 'expanded' : '',
        },
        [
          m(
            m.route.Link,
            {
              selector: 'a.logo',
              href: `/${currentLanguage()}/`,
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
              tone: 'dark',
              events: { onclick: () => changeLanguage('en') },
            }),
            m(Button, {
              label: 'de',
              className: 'bordered-button',
              border: currentLanguage() === 'de',
              inactive: currentLanguage() === 'de',
              tone: 'dark',
              events: { onclick: () => changeLanguage('de') },
            }),
          ]),
          m(MobileMenuIcon, {
            className: 'mobile-menu',
            change: this._mobileMenuShowing,
            onclick: () => {
              this._mobileMenuShowing = !this._mobileMenuShowing;
            },
          }),

          // ------

          // m(
          //   'div.mobile-menu',
          //   {
          //     onclick: () => {
          //       this._mobileMenuShowing = !this._mobileMenuShowing;
          //     },
          //   },
          //   m(Icon, {
          //     svg: { content: m.trust(icons.mobileMenu) },
          //     size: 'large',
          //     alt: i18n('Menu'),
          //   })
          // ),
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
              item.url ? 'a' : m.route.Link,
              {
                selector: 'a',
                href: item.getLink(),
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
                          subitem.url ? 'a' : m.route.Link,
                          {
                            selector: 'a',
                            href: subitem.getLink(),
                          },
                          [
                            i18n(subitem.label),
                            subitem.url
                              ? m(Icon, {
                                  class: 'external-link',
                                  svg: { content: m.trust(icons.externalLink) },
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
                m.route.Link,
                { selector: 'a', href: `/${currentLanguage()}/profile` },
                i18n('mainMenu.profile')
              )
            ),
            m(
              'li',
              m(
                m.route.Link,
                { selector: 'a', href: `/${currentLanguage()}/logout` },
                i18n('mainMenu.logout')
              )
            ),
          ]
        : [
            m(
              'li',
              { class: 'not-logged-in' },
              m(
                m.route.Link,
                {
                  selector: 'a',
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
