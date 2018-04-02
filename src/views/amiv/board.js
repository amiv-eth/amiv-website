import m from 'mithril';
import marked from 'marked';
import { data, image as boardImage } from './data/board';
import { i18n, currentLanguage } from '../../models/language';
import { TranslationUnavailable } from '../errors';

class ImageGroup {
  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(text.trim().replace(/\n[^\S\n]+/g, '\n'));
  }

  static view(vnode) {
    const { group } = vnode.attrs;
    const roles = new Set(group.portraits.map(portrait => i18n(portrait.role)));

    let image;
    let tasks;

    if (group.image) {
      image = m('img', { src: group.image });
    } else {
      image = m('div.no-image', i18n('no image'));
    }

    if (group.tasks && Object.keys(group.tasks).length > 0) {
      tasks = [m('h3', i18n('Tasks'))];

      // select translation in the following order:
      // current language > english > first available language
      if (group.tasks[currentLanguage()]) {
        tasks.push(m.trust(ImageGroup._parseMarkdownText(group.tasks[currentLanguage()])));
      } else {
        let language;

        if (group.tasks.en) {
          language = 'en';
        } else {
          [language] = Object.keys(group.tasks);
        }

        tasks.push(m(TranslationUnavailable, { shown_language: language }));
        tasks.push(m.trust(ImageGroup._parseMarkdownText(group.tasks[language])));
      }
    } else {
      tasks = m('');
    }

    return m('div', [
      m('h2', Array.from(roles).join(' & ')),
      image,
      group.portraits.map(portrait => {
        let description;

        // select translation in the following order:
        // current language > english > first available language
        if (!portrait.description || Object.keys(portrait.description).length === 0) {
          description = m('p', i18n('no description'));
        } else if (portrait.description[currentLanguage()]) {
          description = m.trust(
            ImageGroup._parseMarkdownText(portrait.description[currentLanguage()])
          );
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
        return [m('h3', portrait.name), description];
      }),
      tasks,
    ]);
  }
}

export default class Board {
  static view() {
    let image;

    if (boardImage) {
      image = m('img', { src: boardImage });
    } else {
      image = m('div.no-image', i18n('no image'));
    }

    return m('div', [
      m('h1', i18n('Vorstand')),
      image,
      data.map(group => m(ImageGroup, { group })),
    ]);
  }
}
