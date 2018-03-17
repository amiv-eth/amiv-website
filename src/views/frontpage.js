import m from 'mithril';
import { i18n } from '../models/language';

export default class Frontpage {
  static view() {
    return m('div', i18n('example content'));
  }
}
