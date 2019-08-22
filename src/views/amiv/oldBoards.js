import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { Icon } from 'polythene-mithril-icon';
import oldBoardContent from '../../content/amiv/data/old_boards';
import { i18n, currentLanguage } from '../../models/language';
import { TranslationUnavailable, Infobox } from '../errors';
import icons from '../../images/icons';

class ImageGroup {
  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(escape(text.trim().replace(/\n[^\S\n]+/g, '\n')));
  }

  static view(vnode) {
    const { board } = vnode.attrs;
    const title = `${i18n(`board.old.${board.semester}`)} ${board.year}`;

    let image;

    if (board.image) {
      image = m('div.image.ratio-3to2', m('img', { src: `/${board.image}`, alt: title }));
    } else {
      image = m('div.no-image', m('span', i18n('missing.image')));
    }

    return m('div', [
      m('h2', title),
      image,
      m('div.descriptions', [
        ImageGroup._getDescriptionView(board),
        ImageGroup._getMemberListView(board),
      ]),
    ]);
  }

  static _getDescriptionView(board) {
    let description;

    // select translation in the following order:
    // current language > english > first available language
    if (!board.description || Object.keys(board.description).length === 0) {
      return null;
    }

    if (board.description[currentLanguage()]) {
      description = m.trust(ImageGroup._parseMarkdownText(board.description[currentLanguage()]));
    } else {
      let language;

      if (board.description.en) {
        language = 'en';
      } else {
        [language] = Object.keys(board.description);
      }

      description = [
        m(TranslationUnavailable, { shown_language: language }),
        m.trust(ImageGroup._parseMarkdownText(board.description[language])),
      ];
    }

    return m('div.description', description);
  }

  static _getMemberListView(board) {
    if (!board.members || Object.keys(board.members).length === 0) {
      return null;
    }

    return m(
      'ul.members',
      board.members.map(member =>
        m('li', [m('span.name', member.name), m('span.role', i18n(`board.roles.${member.role}`))])
      )
    );
  }
}

export default class OldBoard {
  static view() {
    return m('div', [
      m(Infobox, {
        className: 'board-notice',
        icon: m(Icon, { svg: { content: m.trust(icons.info) } }),
        label: [
          m('span', i18n('board.old.notice')),
          m(
            m.route.Link,
            { selector: 'a', href: `/${currentLanguage()}/board` },
            i18n('board.old.link')
          ),
        ],
      }),
      m('h1.centered', i18n('board.old.title')),
      m('div.board', oldBoardContent.map(board => m(ImageGroup, { board }))),
    ]);
  }
}
