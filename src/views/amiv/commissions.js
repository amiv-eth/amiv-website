import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { data } from '../../content/amiv/data/commissions';
import { i18n, currentLanguage } from '../../models/language';
import { TranslationUnavailable } from '../errors';

class Commission {
  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(escape(text.trim().replace(/\n[^\S\n]+/g, '\n')));
  }

  static view(vnode) {
    const { commission } = vnode.attrs;

    let image;
    let description;
    const contactInfo = [];

    if (commission.image) {
      image = m('img', { src: `/${commission.image}` });
    } else {
      image = m('div.no-image', i18n('no image'));
    }

    // collect all avialable contact information
    if (commission.website) {
      contactInfo.push(m('a', { href: commission.website }, commission.website));
    }
    if (commission.email) {
      contactInfo.push(m('a', { href: `mailto:${commission.email}` }, commission.email));
    }
    if (commission.phone) {
      contactInfo.push(m('a', { href: `tel:${commission.phone}` }, commission.phone));
    }

    if (commission.description && Object.keys(commission.description).length > 0) {
      // select translation in the following order:
      // current language > english > first available language
      if (commission.description[currentLanguage()]) {
        description = m.trust(
          Commission._parseMarkdownText(commission.description[currentLanguage()])
        );
      } else {
        let language;

        if (commission.description.en) {
          language = 'en';
        } else {
          [language] = Object.keys(commission.description);
        }

        description = [
          m(TranslationUnavailable, { shown_language: language }),
          m.trust(Commission._parseMarkdownText(commission.description[language])),
        ];
      }
    } else {
      description = m('');
    }

    return m('div', [m('h2', commission.name), image, description, contactInfo]);
  }
}

export default class Commissions {
  static view() {
    return m('div', [
      m('h1', i18n('Kommissionen')),
      data.map(commission => m(Commission, { commission })),
    ]);
  }
}
