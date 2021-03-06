/* eslint-disable max-classes-per-file */
import m from 'mithril';
import { Icon } from 'polythene-mithril';
import { i18n } from '../models/language';
import { login } from '../models/auth';
import Button from '../components/Button';
import icons from '../images/icons';

/**
 * View to show when a visitor does not have the right permissions to see the content.
 * This view should replace the whole page content!
 *
 * @return {Error401}
 */
export class Error401 {
  static view(vnode) {
    let reason;
    if (vnode.attrs.reason) {
      reason = i18n(vnode.attrs.reason);
    } else {
      reason = i18n('error.accessDenied');
    }
    return m('div.error-page', [
      m('h1', i18n('error.title')),
      m('p', reason),
      m(Button, {
        label: i18n('login'),
        events: { onclick: () => login() },
      }),
    ]);
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
    return m('div.error-page', [m('h1', i18n('error.title')), m('p', i18n('error.notFound'))]);
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
      'div',
      {
        class: 'translation-unavailable infobox',
      },
      [
        m(Icon, { svg: { content: m.trust(icons.translate) } }),
        m('span', i18n('error.translationUnavailable')),
        ' ',
        m(
          'span',
          i18n('error.shownLanguage', {
            shown_language: i18n(`language.${vnode.attrs.shown_language}`),
          })
        ),
      ]
    );
  }
}

/**
 * View to show some generic infobox.
 *
 * @param {IconComponent} icon  SVG icon component
 * @param {string}        label Text label
 *
 * @return {Infobox}
 */
export class Infobox {
  static view({ attrs: { icon, label, className } }) {
    return m('div', { className: `infobox ${className}` }, [icon, m('span', label)]);
  }
}
