import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { data } from './data/companies';
import { i18n, currentLanguage } from '../../models/language';

class CompanyItem {
  static _parseMarkdownText(text) {
    // replace leading spaces when using multi-line strings
    return marked(escape(text.trim().replace(/\n[^\S\n]+/g, '\n')));
  }

  static view(vnode) {
    return m(
      'div',
      m(
        'a',
        { href: `/${currentLanguage()}/companies/${vnode.attrs.key}`, onupdate: m.route.link },
        vnode.attrs.company.name
      )
    );
  }
}

export default class CompanyList {
  static view() {
    return m('div', [
      m('h1', i18n('Companies')),
      Object.entries(data).map(([key, company]) => m(CompanyItem, { key, company })),
    ]);
  }
}
