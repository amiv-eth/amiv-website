import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { Card, IconButton } from 'polythene-mithril';
import AmivLogo from '../../images/logoNoText.svg';
import { data as data_ressorts } from '../../content/amiv/data/ressorts';
import { data as data_commissions } from '../../content/amiv/data/commissions';
import { i18n, currentLanguage } from '../../models/language';
import { TranslationUnavailable } from '../errors';

class Team {
  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(escape(text.trim().replace(/\n[^\S\n]+/g, '\n')));
  }

  static _getActionLabel(action) {
    const { label } = action;

    if (typeof label === 'string' || label instanceof String) {
      return label;
    }

    if (label && Object.keys(label).length > 0) {
      // select translation in the following order:
      // current language > english > first available language
      if (label[currentLanguage()]) {
        return label[currentLanguage()];
      }

      let language;

      if (label.en) {
        language = 'en';
      } else {
        [language] = Object.keys(label);
      }

      return label[language];
    }

    return '';
  }

  static view(vnode) {
    const { team } = vnode.attrs;

    let image;
    let description;
    const additionalContent = [];

    if (team.image) {
      image = m('img', { src: `/${team.image}`, alt: team.name });
    } else {
      image = m('img', { src: AmivLogo, alt: team.name });
    }

    if (team.description && Object.keys(team.description).length > 0) {
      // select translation in the following order:
      // current language > english > first available language
      if (team.description[currentLanguage()]) {
        description = m.trust(Team._parseMarkdownText(team.description[currentLanguage()]));
      } else {
        let language;

        if (team.description.en) {
          language = 'en';
        } else {
          [language] = Object.keys(team.description);
        }

        description = [
          m(TranslationUnavailable, { shown_language: language }),
          m.trust(Team._parseMarkdownText(team.description[language])),
        ];
      }
    } else {
      description = m('');
    }

    if (team.contact) {
      additionalContent.push({
        actions: {
          border: true,
          className: 'actions',
          layout: 'vertical',
          content: team.contact.map(item =>
            m(IconButton, {
              href: item.url,
              label: Team._getActionLabel(item),
              icon: m('img', { src: item.icon }),
            })
          ),
        },
      });
    }

    return m(Card, {
      className: 'team',
      content: [
        {
          media: {
            origin: 'center',
            ratio: 'landscape',
            content: image,
          },
        },
        {
          primary: {
            title: team.name,
          },
        },
        {
          text: {
            content: [description, m('.flex')],
            className: 'description',
          },
        },
        ...additionalContent,
      ],
    });
  }
}

export default class Teams {
  static view() {
    return m('div', [
      m('div', [
        m('h1.centered', i18n('teams.ressorts')),
        m('div.teams', data_ressorts.map(ressort => m(Team, { team: ressort }))),
      ]),
      m('div', [
        m('h1.centered', i18n('teams.commissions')),
        m('div.teams', data_commissions.map(commission => m(Team, { team: commission }))),
      ]),
    ]);
  }
}
