import m from 'mithril';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from 'polythene-mithril-button';
import Spinner from 'amiv-web-ui-components/src/spinner';
import { currentLanguage, i18n } from '../../models/language';
import contentUrlEnglish from '../../content/amiv/markdown/about.en.md';
import contentUrlGerman from '../../content/amiv/markdown/about.de.md';

export default class Amiv {
  oninit() {
    this.content = null;
    this.constructor
      ._load()
      .then(response => {
        this.content = response;
        this.error = false;
        m.redraw();
      })
      .catch(() => {
        this.error = true;
        m.redraw();
      });
  }

  view() {
    if (this.content) {
      return m('div#about', m.trust(this.content));
    }

    if (this.error) {
      return m('.error', [
        m('p', i18n('error.loadingPage')),
        m(Button, {
          className: 'blue-button',
          name: 'retry',
          label: i18n('retry'),
          events: {
            onclick: () => window.location.reload(),
          },
        }),
      ]);
    }

    return m('.loading', m(Spinner, { show: true, size: '96px' }));
  }

  static _load() {
    return m.request({
      url: `/${currentLanguage() === 'de' ? contentUrlGerman : contentUrlEnglish}`,
      method: 'GET',
      responseType: 'text/html',
    });
  }
}
