import m from 'mithril';
import { mainNavigation } from '../models/navigation';
import AmivLogo from './images/logo.svg';
import MobileMenuButton from './images/mobileMenuButton.svg';
import { i18n, currentLanguage, switchLanguage } from '../models/language';
import { Button } from '../components';
import { isLoggedIn } from '../models/auth';

export default class Header {
  oninit() {
    this._mobileMenuShowing = false;
  }

  // eslint-disable-next-line class-methods-use-this
  onbeforeupdate() {
    mainNavigation.onupdate();
  }

  view() {
    return m('header', [
      m(
        'section.blue',
        m(
          'nav',
          {
            class: this._mobileMenuShowing ? 'expanded' : '',
          },
          [
            m(
              'a',
              { href: `/${currentLanguage()}/`, onupdate: m.route.link },
              m('img.logo', { src: AmivLogo })
            ),
            this.constructor._mainMenu,
            this.constructor._profileMenu,
            m(
              'div.language-switcher',
              m(Button, {
                label: i18n('language_button'),
                events: { onclick: () => switchLanguage() },
              })
            ),
            m(
              'div.mobile-menu',
              {
                onclick: () => {
                  this._mobileMenuShowing = !this._mobileMenuShowing;
                },
              },
              m('img', { src: MobileMenuButton, alt: i18n('Menu') })
            ),
          ]
        )
      ),
      m('section.grey'),
    ]);
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
                onupdate: item.onupdate,
              },
              i18n(item.label)
            ),
            item.submenu
              ? m('ul.submenu', [
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
                        i18n(subitem.label)
                      )
                    )
                  ),
                ])
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
              m(
                'a',
                { href: `/${currentLanguage()}/profile`, onupdate: m.route.link },
                i18n('Login')
              )
            ),
          ]
    );
  }
}
