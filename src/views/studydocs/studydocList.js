import m from 'mithril';
import { apiUrl } from 'config';
import * as studydocs from '../../models/studydocs';
import { Button, FilterView } from '../../components';
import { lectures } from '../studydocs/lectures';
import { i18n, currentLanguage } from '../../models/language';

const tableHeadings = ['title', 'author', 'type'];

export default class StudydocList {
  oninit(vnode) {
    this.vnode = vnode;
    this.docLoaded = false;
    this.lectureDropdownDisabled = true;

    if (vnode.attrs.documentId) {
      studydocs
        .loadDocument(vnode.attrs.documentId)
        .then(doc => {
          this.selectDocument(doc);
        })
        .catch(() => {
          this.selectDocument(undefined);
        });
    }
  }

  selectDocument(doc) {
    this.docLoaded = true;
    this.doc = doc;
  }

  isLectureDropdownDisabled() {
    return this.lectureDropdownDisabled;
  }

  // dynamic lectures data based on selected semester and department
  loadLectures(values) {
    if (!values.department) {
      return [];
    }

    const data = [];
    data.push({
      value: 'all',
      label: i18n('studydocs.lectures_all'),
    });

    if (values.semester !== 'all') {
      if (values.department.includes('itet')) {
        for (let i = 0; i < lectures.itet[values.semester].length; i += 1) {
          data.push({
            value: lectures.itet[values.semester][i],
            label: lectures.itet[values.semester][i],
          });
        }
      }
      if (values.department.includes('mavt')) {
        for (let i = 0; i < lectures.mavt[values.semester].length; i += 1) {
          data.push({
            value: lectures.mavt[values.semester][i],
            label: lectures.mavt[values.semester][i],
          });
        }
      }
    }
    this.lectureDropdownDisabled = data.length <= 1;

    return data;
  }

  view(vnode) {
    let documentView;

    if (this.docLoaded) {
      if (this.doc) {
        documentView = m('div.details', [
          m('table', [
            m('tr', [m('td', m('b', i18n('studydocs.title'))), m('td', this.doc.title)]),
            m('tr', [m('td', m('b', i18n('studydocs.lecture'))), m('td', this.doc.lecture)]),
            m('tr', [m('td', m('b', i18n('studydocs.professor'))), m('td', this.doc.professor)]),
            m('tr', [m('td', m('b', i18n('studydocs.semester'))), m('td', this.doc.semester)]),
            m('tr', [m('td', m('b', i18n('studydocs.author'))), m('td', this.doc.author)]),
            m('tr', [m('td', m('b', i18n('studydocs.department'))), m('td', this.doc.department)]),
            m(Button, {
              label: 'Download',
              events: {
                onclick: () => window.open(`${apiUrl}${this.doc.files[0].file}`, '_blank'),
              },
            }),
          ]),
        ]);
      } else {
        documentView = m('div.details', m('h1', i18n('studydocs.not_found')));
      }
    } else if (vnode.attrs.documentId) {
      // do not show anything until document has loaded.
      documentView = m('');
    } else {
      documentView = m('div.details', m('h1', i18n('studydocs.no_selection')));
    }

    return m('div#studydoc-list', [
      m('div.filter', [
        // create filterview with checkboxes
        m(FilterView, {
          fields: [
            {
              type: 'text',
              key: 'title',
              label: i18n('studydocs.searchfield'),
              min_length: 3,
            },
            {
              type: 'button',
              label: i18n('search'),
            },
            {
              type: 'checkbox',
              key: 'department',
              label: i18n('studydocs.department'),
              default: ['itet', 'mavt'],
              values: [{ value: 'itet', label: 'D-ITET' }, { value: 'mavt', label: 'D-MAVT' }],
            },
            {
              type: 'dropdown',
              key: 'semester',
              default: 'all',
              values: [
                { value: 'all', label: i18n('studydocs.semester_all') },
                { value: '1', label: i18n('studydocs.semester1') },
                { value: '2', label: i18n('studydocs.semester2') },
                { value: '3', label: i18n('studydocs.semester3') },
                { value: '4', label: i18n('studydocs.semester4') },
                { value: '5+', label: i18n('studydocs.semester5+') },
              ],
            },
            {
              type: 'dropdown',
              key: 'lecture',
              default: 'all',
              disabled: this.isLectureDropdownDisabled,
              values: this.loadLectures,
            },
            {
              type: 'checkbox',
              key: 'type',
              label: i18n('studydocs.type'),
              default: ['cheat sheets', 'exams', 'lecture documents', 'exercises'],
              values: [
                { value: 'cheat sheets', label: i18n('studydocs.summaries') },
                { value: 'exams', label: i18n('studydocs.old_exams') },
                { value: 'lecture documents', label: i18n('studydocs.lecture_documents') },
                { value: 'exercises', label: i18n('studydocs.exercises') },
              ],
            },
            {
              type: 'button',
              label: i18n('studydocs.upload'),
              events: {
                onclick: () => m.route.set(`/${currentLanguage()}/studydocuments/new`),
              },
            },
          ],
          onchange: values => {
            const query = {};

            Object.keys(values).forEach(key => {
              let value = values[key];

              if (Array.isArray(value)) {
                query[key] = { $in: value };
              } else if (key === 'semester' && value !== 'all') {
                query[key] = value;
              } else if (key === 'lecture' && value !== 'all') {
                query[key] = value;
              } else if (key === 'title' && value.length > 0) {
                value = value.substring(0, value.length);
                query.$or = [
                  { title: { $regex: `^(?i).*${value}.*` } },
                  { lecture: { $regex: `^(?i).*${value}.*` } },
                  { author: { $regex: `^(?i).*${value}.*` } },
                  { professor: { $regex: `^(?i).*${value}.*` } },
                ];
              }

              if (query.department && query.department.$in.length === 2) {
                delete query.department;
              }
              if (query.type && query.type.$in.length === 4) {
                delete query.type;
              }
            });
            studydocs.load(query);
          },
        }),
      ]),

      // filtered content view
      m('div.content', [
        m('div.content-grid', [
          tableHeadings.map(header => m('div.list-header', header)),
          studydocs
            .getList()
            .map(doc => [
              m(
                'div.list-item',
                { onclick: () => m.route.set(`/${currentLanguage()}/studydocuments/${doc._id}`) },
                doc.title
              ),
              m(
                'div.list-item',
                { onclick: () => m.route.set(`/${currentLanguage()}/studydocuments/${doc._id}`) },
                doc.author
              ),
              m(
                'div.list-item',
                { onclick: () => m.route.set(`/${currentLanguage()}/studydocuments/${doc._id}`) },
                doc.type
              ),
            ]),
        ]),
      ]),

      documentView,
    ]);
  }
}
