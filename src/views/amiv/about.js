import m from 'mithril';
import { currentLanguage } from '../../models/language';

// ensure that all markdown files are compiled
require.context('./markdown');

export default class AMIV {
  oninit() {
    this.content = '';
    this._load();
  }

  view() {
    return m.trust(this.content);
  }

  _load() {
    if (this.content) return;

    m.request({
      url: `/dist/amiv/about.${currentLanguage()}.html`,
      method: 'GET',
      deserialize: response => {
        this.content = response;
      },
    });
  }
}
