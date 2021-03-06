import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { Icon } from 'polythene-mithril-icon';
import Tabs from '../../components/Tabs';
import { boardPortraits, boardImage } from '../../content/amiv/data/board_portraits';
import { boardTaskDescriptions } from '../../content/amiv/data/board_roles';
import { i18n, currentLanguage } from '../../models/language';
import { TranslationUnavailable, Infobox } from '../errors';
import icons from '../../images/icons';

class ImageGroup {
  oninit(vnode) {
    this._portraitNames = [];
    this._portraitViews = [];
    this._selectedTabIndex = 0;

    vnode.attrs.group.portraits.forEach(portrait => {
      this._portraitNames.push(portrait.name);
      this._portraitViews.push(this.constructor._getPortraitView(portrait));
    });
  }

  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(escape(text.trim().replace(/\n[^\S\n]+/g, '\n')));
  }

  view(vnode) {
    const { group } = vnode.attrs;
    const roles = new Set(group.portraits.map(portrait => i18n(`board.roles.${portrait.role}`)));

    let image;

    if (group.image) {
      image = m(
        'div.image.ratio-3to2',
        m('img', { src: `/${group.image}`, alt: this._portraitNames.join(' & ') })
      );
    } else {
      image = m('div.no-image', i18n('no image'));
    }

    return m('div', { className: !group.showRoles ? 'no-roles' : null }, [
      group.showRoles && m('h2', Array.from(roles).join(' & ')),
      image,
      m('div.descriptions', [
        m(Tabs, {
          tabs: this._portraitNames.map(name => ({ label: name })),
          className: 'themed-tabs',
          activeSelected: true,
          autofit: true,
          element: 'tab',
          selectedTabIndex: this._selectedTabIndex,
          onChange: data => {
            this._selectedTabIndex = data.index;
          },
        }),
        m('div', this._portraitViews[this._selectedTabIndex]),
      ]),
    ]);
  }

  static _getPortraitView(portrait) {
    let description;

    // select translation in the following order:
    // current language > english > first available language
    if (!portrait.description || Object.keys(portrait.description).length === 0) {
      description = m('p', i18n('no description'));
    } else if (portrait.description[currentLanguage()]) {
      description = m.trust(ImageGroup._parseMarkdownText(portrait.description[currentLanguage()]));
    } else {
      let language;

      if (portrait.description.en) {
        language = 'en';
      } else {
        [language] = Object.keys(portrait.description);
      }

      description = [
        m(TranslationUnavailable, { shown_language: language }),
        m.trust(ImageGroup._parseMarkdownText(portrait.description[language])),
      ];
    }

    return [m('div.description', description), ImageGroup._getTaskView(portrait.role)];
  }

  static _getTaskView(role) {
    if (!boardTaskDescriptions[role]) return [];

    const content = [m('h3', i18n('board.tasks'))];

    if (boardTaskDescriptions[role][currentLanguage()]) {
      content.push(
        m.trust(ImageGroup._parseMarkdownText(boardTaskDescriptions[role][currentLanguage()]))
      );
    } else {
      let language;

      if (boardTaskDescriptions[role].en) {
        language = 'en';
      } else {
        [language] = Object.keys(boardTaskDescriptions[role]);
      }

      content.push(m(TranslationUnavailable, { shown_language: language }));
      content.push(m.trust(ImageGroup._parseMarkdownText(boardTaskDescriptions[role][language])));
    }
    return content;
  }
}

export default class Board {
  static view() {
    let image;

    if (boardImage) {
      image = m(
        'div.image.ratio-3to2',
        m('img', { src: `/${boardImage}`, alt: i18n('board.title') })
      );
    } else {
      image = m('');
    }

    return m('div', [
      m(Infobox, {
        className: 'board-notice',
        icon: m(Icon, { svg: { content: m.trust(icons.info) } }),
        label: [
          m('span', i18n('board.current.notice')),
          m(
            m.route.Link,
            {
              selector: 'a',
              href: `/${currentLanguage()}/board/history`,
            },
            i18n('board.current.link')
          ),
        ],
      }),
      m('h1.centered', i18n('board.title')),
      image,
      m('div.board', boardPortraits.map(group => m(ImageGroup, { group }))),
    ]);
  }
}
