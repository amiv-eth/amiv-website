import m from 'mithril';
import * as studydocs from '../../models/studydocs';
import { apiUrl } from '../../models/config';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button, Checkbox, RadioGroup, TextField } from '../../components';

const tableHeadings = ['title', 'type'];

export default class studydocList {
  constructor(vnode) {
    this.vnode = vnode;
    this.doc = {};
  }

  static oninit() {
    studydocs.load();
    this.search = '';
    this.filter = {
      department: {},
      type: {},
      semester: {},
    };
  }

  static selectDocument(doc) {
    this.doc = doc;
  }

  static changeFilter(filterKey, filterValue, checked) {
    this.filter[filterKey][filterValue] = checked;
    const query = {};
    Object.keys(this.filter).forEach(key => {
      let queryValue = '';
      Object.keys(this.filter[key]).forEach(subKey => {
        if (this.filter[key][subKey]) {
          queryValue += `${subKey}|`;
        }
      });

      if (queryValue.length > 0) {
        queryValue = queryValue.substring(0, queryValue.length - 1);
        query[key] = { $regex: `^(?i).*${queryValue}.*` };
      }
    });
    studydocs.load(query);
  }

  static view() {
    if (!isLoggedIn()) return m(Error401);

    return m('div#studydoc-list', [
      m('div.filter', [
        m(
          'form',
          {
            onsubmit: e => {
              e.preventDefault();
              const query = {
                $or: [
                  { title: { $regex: `^(?i).*${this.search}.*` } },
                  { lecture: { $regex: `^(?i).*${this.search}.*` } },
                  { professor: { $regex: `^(?i).*${this.search}.*` } },
                  { author: { $regex: `^(?i).*${this.search}.*` } },
                ],
              };
              studydocs.load(query);
            },
          },
          [
            m(
              TextField,
              {
                label: 'Enter search...',
                onChange: state => {
                  this.search = state.value;
                },
              },
              ''
            ),
            m(Button, { label: 'Search' }),
          ]
        ),
        m('div.department-check', [
          m(Checkbox, {
            label: 'D-ITET',
            onChange: state => this.changeFilter('department', 'itet', state.checked),
          }),
          m(Checkbox, {
            label: 'D-MAVT',
            onChange: state => this.changeFilter('department', 'mavt', state.checked),
          }),
        ]),
        m('div.type-check', [
          m(Checkbox, {
            label: 'Zusammenfassung',
            onChange: state => this.changeFilter('type', 'cheat sheets', state.checked),
          }),
          m(Checkbox, {
            label: 'Alte Prüfungen',
            onChange: state => this.changeFilter('type', 'exams', state.checked),
          }),
          m(Checkbox, {
            label: 'Unterichts Unterlagen',
            onChange: state => this.changeFilter('type', 'lecture documents', state.checked),
          }),
          m(Checkbox, {
            label: 'Übungsserien',
            onChange: state => this.changeFilter('type', 'exercises', state.checked),
          }),
        ]),

        m(Button, {
          label: 'Add new',
          events: { onclick: () => m.route.set('/studydocuments/new') },
        }),
      ]),
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
      this.doc
        ? m('div.details', [
            m('table', [
              m('tr', this.doc.title),
              m('tr', this.doc.lecture),
              m('tr', this.doc.professor),
              m('tr', this.doc.semester),
              m('tr', this.doc.author),
              m(Button, {
                label: 'Download',
                events: {
                  onclick: () => window.open(`${apiUrl}${this.doc.files[0].file}`, '_blank'),
                },
              }),
            ]),
          ])
        : null,
    ]);
  }
}
