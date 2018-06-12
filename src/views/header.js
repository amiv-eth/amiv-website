import m from 'mithril';
import { mainNavigation } from '../models/navigation';
import AmivLogo from './images/logo.svg';
import { i18n, currentLanguage, switchLanguage } from '../models/language';
import { Button } from '../components';
import { isLoggedIn } from '../models/auth';

export default class Header {
  static onbeforeupdate() {
    mainNavigation.onupdate();
  }

  static view() {
    let submenu;
    if (mainNavigation.selectedItem && mainNavigation.selectedItem.submenu) {
      const menu = mainNavigation.selectedItem.submenu;
      submenu = m(
        'section.grey',
        m(
          'div',
          m(
            'nav.submenu',
            menu.map((item, index) =>
              m(
                'a',
                {
                  class: menu.selectedIndex === index ? 'active' : '',
                  href: item.getLink(),
                  onupdate: item.onupdate,
                },
                i18n(item.label)
              )
            )
          )
        )
      );
    }

    return m('header', [
      m(
        'section.blue',
        m('div', [
          m(
            'a',
            { href: `/${currentLanguage()}/`, onupdate: m.route.link },
            m('img.logo', { src: AmivLogo })
          ),
          m(
            'nav',
            mainNavigation.map((item, index) =>
              m(
                'a',
                {
                  class: mainNavigation.selectedIndex === index ? 'active' : '',
                  href: item.getLink(),
                  onupdate: item.onupdate,
                },
                i18n(item.label)
              )
            )
          ),
          isLoggedIn()
            ? m('div.profile', [
                m(
                  'a',
                  { href: `/${currentLanguage()}/profile`, onupdate: m.route.link },
                  i18n('Profile')
                ),
                m(
                  'a',
                  { href: `/${currentLanguage()}/logout`, onupdate: m.route.link },
                  i18n('Logout')
                ),
              ])
            : m(
                'div.profile',
                m(
                  'a',
                  { href: `/${currentLanguage()}/profile`, onupdate: m.route.link },
                  i18n('Login')
                )
              ),
          m(
            'div.language-switcher',
            m(Button, {
              label: i18n('language_button'),
              events: { onclick: () => switchLanguage() },
            })
          ),
        ])
      ),
      submenu,
    ]);
  }
}
