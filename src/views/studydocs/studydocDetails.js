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
      m('div.studydoc-details-table', [
        m('div', [m('b', i18n('studydocs.title')), m('span', document.title)]),

        m('div', [m('b', i18n('studydocs.type')), m('span', document.type)]),

        m('div', [m('b', i18n('studydocs.lecture')), m('span', document.lecture)]),

        m('div', [m('b', i18n('studydocs.professor')), m('span', document.professor)]),

        m('div', [m('b', i18n('studydocs.semester')), m('span', document.semester)]),

        m('div', [m('b', i18n('studydocs.author')), m('span', document.author)]),

        m('div', [m('b', i18n('studydocs.department')), m('span', document.department)]),
      ]),

      m(
        'div.studydoc-details-table',
        document.files.map(item =>
          m('div', [
            m(
              'span.button-details-style',
              m(Button, {
                label: 'Download',
                events: {
                  onclick: () => window.open(`${apiUrl}${item.file}`, '_blank'),
                },
              })
            ),
            m('span.title-wrap-style', item.name),
          ])
        )
      ),
    ];
  }
}
