import m from 'mithril';
import { i18n } from '../models/language';

/**
 * View to show when a visitor does not have the right permissions to see the content.
 * This view should replace the whole page content!
 *
 * @return {Error401}
 */
export class Error401 {
  static view() {
    return m('div', 'This page is only accessible for authenticated users. Please log in.');
  }
}

/**
 * View to show when a page does not exist.
 * This view should replace the whole page content!
 *
 * @return {Error404}
 */
export class Error404 {
  static view() {
    return m('div', 'This page does not exist.');
  }
}

/**
 * View to indicate that no translation is available for the current language.
 *
 * Attributes:
 *  - `shown_language` language code of the text shown instead.
 *
 * @return {TranslationUnavailable}
 */
export class TranslationUnavailable {
  static view(vnode) {
    return m(
      'div.translation-unavailable',
      i18n('translation unavailable', {
        shown_language: i18n(`language.${vnode.attrs.shown_language}`),
      })
    );
  }
}
