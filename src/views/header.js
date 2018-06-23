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
    return m('header', [
      m(
        'section.blue',
        m('div', [
          m(
            'a',
            { href: `/${currentLanguage()}/`, onupdate: m.route.link },
            m('img.logo', { src: AmivLogo })
          ),
          m('nav', [
            m(
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
            ),
            m(
              'ul.profile',
              isLoggedIn()
                ? [
                    m(
                      'li',
                      {
                        class: m.route.get() === `/${currentLanguage()}/profile` ? 'active' : '',
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
            ),
            m(
              'div.language-switcher',
              m(Button, {
                label: i18n('language_button'),
                events: { onclick: () => switchLanguage() },
              })
            ),
          ]),
        ])
      ),
      m('section.grey'),
    ]);
  }
}
