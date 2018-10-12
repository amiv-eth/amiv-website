import m from 'mithril';
import { apiUrl } from 'config';
import './Card.less';

export default class CheckboxComponent {
  constructor(vnode) {
    this.item = vnode.attrs;
  }

  view() {
    const { title, href, img_poster } = this.item;
    let { imageurl } = this.item;
    if (img_poster) imageurl = `${apiUrl}${img_poster.file}`;
    const style = imageurl ? `background-image: url(${imageurl})` : '';

    return m('a', { href }, m('div.card', { style }, m('div.card-title', title)));
  }
}
