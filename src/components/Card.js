import m from 'mithril';
import { apiUrl } from 'config';
import './Card.less';
import AmivLogo from '../images/logoNoText.svg';
import { currentLanguage } from '../models/language';

const renderSlider = description =>
  description ? m('div.card-overlay', m('div', description)) : '';

export default class CheckboxComponent {
  constructor(vnode) {
    this.item = vnode.attrs;
  }

  oninit(vnode) {
    this.localization(vnode);
  }
  onupdate(vnode) {
    this.localization(vnode);
  }

  localization(vnode) {
    switch (currentLanguage()) {
      case 'de':
        this.item.title = vnode.attrs.title_de;
        this.item.description = vnode.attrs.description_de;
        break;
      case 'en':
      default:
        this.item.title = vnode.attrs.title_en;
        this.item.description = vnode.attrs.description_en;
    }
  }

  view() {
    let { imageurl, description } = this.item;
    if (this.item.img_poster) imageurl = `${apiUrl}${this.item.img_poster.file}`;
    else if (this.item.logo) imageurl = `${apiUrl}${this.item.logo.file}`;

    if (description && description.length > 140)
      description = `${description.substring(0, 140)}...`;

    const style = imageurl
      ? `background-image: url(${imageurl})`
      : `background-image: url(${AmivLogo})`;

    return m(
      'a',
      { href: this.item.href },
      m('div.card', { style }, [m('div.card-title', this.item.title), renderSlider(description)])
    );
  }
}
