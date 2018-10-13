import m from 'mithril';
import { apiUrl } from 'config';
import './Card.less';
import AmivLogo from '../images/logoNoText.svg';

export default class CheckboxComponent {
  constructor(vnode) {
    this.item = vnode.attrs;
  }

  view() {
    const { title, href, img_poster } = this.item;
    let { imageurl } = this.item;
    if (img_poster) imageurl = `${apiUrl}${img_poster.file}`;
    const style = imageurl
      ? `background-image: url(${imageurl})`
      : `background-image: url(${AmivLogo})`;

    return m('a', { href }, m('div.card', { style }, m('div.card-title', title)));
  }
}
