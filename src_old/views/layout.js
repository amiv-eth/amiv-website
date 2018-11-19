import m from 'mithril';
import { Dialog } from 'polythene-mithril';
import header from './header';
import footer from './footer';

export default class Layout {
  static view(vnode) {
    return m('div', [m(header), m('main', vnode.children), m(footer), m(Dialog)]);
  }
}
