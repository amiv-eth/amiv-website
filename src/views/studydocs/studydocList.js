import m from 'mithril';
import { apiUrl } from 'config';
import * as studydocs from '../../models/studydocs';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button, FilterView } from '../../components';
import { lectures } from '../studydocs/lectures';
import { i18n, currentLanguage } from '../../models/language';

const tableHeadings = ['title', 'type'];

export default class studydocList {
  constructor(vnode) {
    this.vnode = vnode;
    this.doc = {};
  }

  oninit() {
    // initialize values for filter
    this.semester = 1;
    this.lecture = 'Fach';
    this.search = '';
  }

  static selectDocument(doc) {
    this.doc = doc;
  }

  // dynamic lectures data based on selected semester and department
  static loadLectures(values) {
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

    return data;
  }

  static view() {
    if (!isLoggedIn()) return m(Error401);

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
              type: 'checkbox',
              key: 'type',
              label: i18n('studydocs.type'),
              default: ['cheat sheet', 'exams', 'lecture documents', 'exercises'],
              values: [
                { value: 'cheat sheet', label: i18n('studydocs.summaries') },
                { value: 'exams', label: i18n('studydocs.old_exams') },
                { value: 'lecture documents', label: i18n('studydocs.lecture_documents') },
                { value: 'exercises', label: i18n('studydocs.exercises') },
              ],
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
              values: this.loadLectures,
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
                value = value.substring(0, value.length - 1);
                query[key] = { $regex: `^(?i).*${value}.*` };
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
              m('div.list-item', { onclick: () => this.selectDocument(doc) }, doc.title),
              m('div.list-item', { onclick: () => this.selectDocument(doc) }, doc.type),
            ]),
        ]),
      ]),

      // detail view of selected studydoc item
      this.doc
        ? m('div.details', [
            m('table', [
              m('tr', [m('td', m('b', i18n('studydocs.title'))), m('td', this.doc.title)]),
              m('tr', [m('td', m('b', i18n('studydocs.lecture'))), m('td', this.doc.lecture)]),
              m('tr', [m('td', m('b', i18n('studydocs.professor'))), m('td', this.doc.professor)]),
              m('tr', [m('td', m('b', i18n('studydocs.semester'))), m('td', this.doc.semester)]),
              m('tr', [m('td', m('b', i18n('studydocs.author'))), m('td', this.doc.author)]),
              m('tr', [
                m('td', m('b', i18n('studydocs.department'))),
                m('td', this.doc.department),
              ]),
              m(Button, {
                label: 'Download',
                events: {
                  onclick: () => window.open(`${apiUrl}${this.doc.files[0].file}`, '_blank'),
                },
              }),
            ]),
          ])
        : m(''),
    ]);
  }
}
