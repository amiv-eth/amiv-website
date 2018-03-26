import m from 'mithril';
import { i18n, switchLanguage } from '../models/language';
import { Button } from '../components';
import Navbar from './navbar';

export default class Layout {
  static view(vnode) {
    return m('div#amiv-container', [
      m(Navbar),
      m(Button, {
        label: i18n('language_button'),
        events: { onclick: () => switchLanguage() },
      }),
      m('main', vnode.children),
    ]);
  }
}
