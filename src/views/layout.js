import m from 'mithril';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dialog } from 'polythene-mithril-dialog';
import header from './header';
import footer from './footer';

export default class Layout {
  static view(vnode) {
    return m('div', [m(header), m('main', vnode.children), m(footer), m(Dialog)]);
  }
}
