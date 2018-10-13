import m from 'mithril';
import { apiUrl } from 'config';
import './Card.less';
import AmivLogo from '../images/logoNoText.svg';

export default class CheckboxComponent {
  constructor(vnode) {
    this.item = vnode.attrs;
  }

  view() {
    const { title, href, img_poster, logo } = this.item;
    let { imageurl } = this.item;
    if (img_poster) imageurl = `${apiUrl}${img_poster.file}`;
    else if (logo) imageurl = `${apiUrl}${logo.file}`;
    const style = imageurl
      ? `background-image: url(${imageurl})`
      : `background-image: url(${AmivLogo})`;

    return m('a', { href }, m('div.card', { style }, m('div.card-title', title)));
  }
}
