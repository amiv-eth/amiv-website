import m from 'mithril';
import { apiUrl } from 'config';
import { i18n } from '../../models/language';
import Button from '../../components/Button';

export default class StudydocDetails {
  oninit(vnode) {
    this.controller = vnode.attrs.controller;
  }

  view() {
    const document = this.controller.selectedDocument;
    if (!document) {
      return m('');
    }

    return [
      m('div.studydoc-details-table', [
        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.title'))),
          m('div', document.title),
        ]),

        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.type'))),
          m('div', document.type),
        ]),

        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.lecture'))),
          m('div', document.lecture),
        ]),

        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.professor'))),
          m('div', document.professor),
        ]),

        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.semester'))),
          m('div', document.semester),
        ]),

        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.author'))),
          m('div', document.author),
        ]),

        m('div.flex-container', [
          m('div', m('b', i18n('studydocs.department'))),
          m('div', document.department),
        ]),
      ]),

      m(
        'div.studydoc-details-table',
        document.files.map(item =>
          m('div', [
            m(
              'span.button-details-style',
              m(Button, {
                label: `Download ${item.name.split('.').pop()}`,
                events: {
                  onclick: () => window.open(`${apiUrl}${item.file}`, '_blank'),
                },
              })
            ),
            m('span#title-wrap-style', item.name),
          ])
        )
      ),
    ];
  }
}
