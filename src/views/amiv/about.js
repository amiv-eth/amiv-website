import m from 'mithril';
import { currentLanguage } from '../../models/language';

// ensure that all markdown files are compiled
require.context('../../content/amiv/markdown');

export default class AMIV {
  oninit() {
    this.content = '';
    this._load();
  }

  view() {
    return m.trust(this.content);
  }

  async _load() {
    if (this.content) return;

    this.content = await m.request({
      url: `/amiv/about.${currentLanguage()}.html`,
      method: 'GET',
      deserialize: response => response,
    });
  }
}
