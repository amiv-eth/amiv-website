import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { data as data_ressorts } from '../../content/amiv/data/ressorts';
import { data as data_commissions } from '../../content/amiv/data/commissions';
import { i18n, currentLanguage } from '../../models/language';
import { TranslationUnavailable } from '../errors';

class Team {
  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(escape(text.trim().replace(/\n[^\S\n]+/g, '\n')));
  }

  static view(vnode) {
    const { team } = vnode.attrs;

    let image;
    let description;
    const contactInfo = [];

    if (team.image) {
      image = m('div.image.ratio-16to9', m('img', { src: `/${team.image}` }));
    } else {
      image = m('div.no-image.ratio-16to9', m('span', i18n('no image')));
    }

    // collect all avialable contact information
    if (team.website) {
      contactInfo.push(m('a', { href: team.website }, team.website));
    }
    if (team.email) {
      contactInfo.push(m('a', { href: `mailto:${team.email}` }, team.email));
    }
    if (team.phone) {
      contactInfo.push(m('a', { href: `tel:${team.phone}` }, team.phone));
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

    return m('div.team', [
      image,
      m('h2', team.name),
      m('div.description', description),
      m(
        'div.contact',
        contactInfo.length > 0 ? contactInfo : m('span', i18n('commissions.no_contact_info'))
      ),
    ]);
  }
}

export default class Teams {
  static view() {
    return m('div', [
      m('div', [
        m('h1.centered', i18n('Ressorts/Teams')),
        m('div.teams', data_ressorts.map(ressort => m(Team, { team: ressort }))),
      ]),
      m('div', [
        m('h1.centered', i18n('Commissions')),
        m('div.teams', data_commissions.map(commission => m(Team, { team: commission }))),
      ]),
    ]);
  }
}
