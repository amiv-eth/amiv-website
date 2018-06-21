import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { apiUrl } from 'config';
import { i18n } from '../../models/language';

export default class JobofferDetails {
  static oninit(vnode) {
    this.controller = vnode.attrs.controller;
  }

  static view() {
    const joboffer = this.controller.selectedJoboffer;
    if (!joboffer) {
      return m('h1', i18n('joboffers.not_found'));
    }

    return m('div', [
      m('h1', joboffer.getTitle()),
      m('img', { src: `${apiUrl}${joboffer.logo.file}`, alt: joboffer.company }),
      m('p', m.trust(marked(escape(joboffer.getDescription())))),
      m('a', { href: `${apiUrl}${joboffer.pdf.file}`, target: '_blank' }, 'Download as PDF'),
    ]);
  }
}
