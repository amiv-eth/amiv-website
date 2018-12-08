import m from 'mithril';
import { mainNavigation } from '../models/navigation';
import AmivLogo from '../images/logo.svg';
import MobileMenuIcon from '../images/mobileMenuButton.svg';
import ExternalLinkIcon from '../images/external.svg';
import { i18n, currentLanguage, changeLanguage } from '../models/language';
import { Button } from '../components';
import { isLoggedIn, login } from '../models/auth';

let mobileMenuShowing = false;

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
            'a.logo',
            { href: `/${currentLanguage()}/`, onupdate: m.route.link },
            m('img', { src: AmivLogo })
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
          m(
            'div.mobile-menu',
            {
              onclick: () => {
                this._mobileMenuShowing = !this._mobileMenuShowing;
              },
            },
            m('img', { src: MobileMenuIcon, alt: i18n('Menu') })
          ),
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
                              ? m('img.external-link', {
                                  src: ExternalLinkIcon,
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
                { href: `/${currentLanguage()}/profile`, onupdate: m.route.link },
                i18n('Profile')
              )
            ),
            m(
              'li',
              m(
                'a',
                { href: `/${currentLanguage()}/logout`, onupdate: m.route.link },
                i18n('Logout')
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
                  href: `/${currentLanguage()}/profile`,
                  onclick: e => {
                    login(`/${currentLanguage()}/profile`);
                    e.preventDefault();
                  },
                },
                m('span', i18n('Login'))
              )
            ),
          ]
    );
  }
}
