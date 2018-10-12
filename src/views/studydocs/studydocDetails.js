import m from 'mithril';
import { apiUrl } from 'config';
import { i18n } from '../../models/language';
import { Button } from '../../components';

export default class StudydocDetails {
  oninit(vnode) {
    this.controller = vnode.attrs.controller;
  }

  view() {
    const document = this.controller.selectedDocument;
    if (!document) {
      return m('h1', i18n('studydocs.not_found'));
    }

    return [
      m('table', [
        m('tr', [m('td', m('b', i18n('studydocs.title'))), m('td', document.title)]),
        m('tr', [m('td', m('b', i18n('studydocs.type'))), m('td', i18n(document.type))]),
        m('tr', [m('td', m('b', i18n('studydocs.lecture'))), m('td', document.lecture)]),
        m('tr', [m('td', m('b', i18n('studydocs.professor'))), m('td', document.professor)]),
        m('tr', [m('td', m('b', i18n('studydocs.semester'))), m('td', document.semester)]),
        m('tr', [m('td', m('b', i18n('studydocs.author'))), m('td', document.author)]),
        m('tr', [m('td', m('b', i18n('studydocs.department'))), m('td', document.department)]),
      ]),
      m(
        'div',
        ...document.files.map(item =>
          m('tr', [
            m('td', item.file),
            m(Button, {
              label: 'Download',
              events: {
                onclick: () => window.open(`${apiUrl}${item.file}`, '_blank'),
              },
            }),
          ])
        )
      ),
    ];
  }
}
