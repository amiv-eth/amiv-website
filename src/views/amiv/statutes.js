import m from 'mithril';
import statutes from './html/statutes.html';
import { currentLanguage } from '../../models/language';
import { TranslationUnavailable } from '../errors';

export default class Statutes {
  oninit() {
    this.content = '';
    this._load();
  }

  view() {
    if (currentLanguage() !== 'de') {
      return [m(TranslationUnavailable, { shown_language: 'de' }), m.trust(this.content)];
    }
    return m.trust(this.content);
  }

  async _load() {
    if (this.content) return;

    this.content = await m.request({
      url: `/${statutes}`,
      method: 'GET',
      deserialize: response => response,
    });
  }
}
