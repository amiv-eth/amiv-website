import m from 'mithril';
import * as studydocs from '../../models/studydocs';
import { apiUrl } from '../../models/config';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button, Checkbox, TextField, Dropdown } from '../../components';

const tableHeadings = ['title', 'type'];
const filterNames = {
  department: { itet: 'D-ITET', mavt: 'D-MAVT' },
  type: {
    'cheat sheet': 'Zusammenfassung',
    exams: 'Alte Prüfungen',
    'lecture documents': 'Unterichts Unterlagen',
    exercies: 'Übungsserien',
  },
};

const subjects = {
  itet: [
    ['Digitaltechnik', 'Analysis 1', 'Netzwerke und Schaltungen 1', 'Informatik 1'],
    ['Koma'],
    ['Physics 2'],
    [],
    [],
    [],
  ],
  mavt: [
    [
      'Analysis 1',
      'Werkstoffe und Fertigung 1',
      'Lineare Algebra 1',
      'Chemie',
      'Maschinenelemente',
    ],
    ['Dynamics', 'Thermodynamik 1'],
    ['Fluiddynamik1', 'Thermodynamik 2'],
    [],
    [],
    [],
  ],
};

const filterNamesDropdown = {
  semester: { 1: '1. Semester', 2: '2. Semester', 3: '3. Semester' },
};

export default class studydocList {
  constructor(vnode) {
    this.vnode = vnode;
    this.doc = {};
  }

  static oninit() {
    studydocs.load();
    this.semester = 0;
    this.search = '';
    this.filter = {};
    Object.keys(filterNames).forEach(key => {
      const filterValue = {};
      Object.keys(filterNames[key]).forEach(subKey => {
        filterValue[subKey] = false;
      });
      this.filter[key] = filterValue;
    });
  }
  static selectDocument(doc) {
    this.doc = doc;
  }

  static changeFilter(filterKey, filterValue, checked) {
    this.filter[filterKey][filterValue] = checked;
    const query = {};
    console.log(`Filter: ${this.filter}`);
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

        Object.keys(filterNames).map(key =>
          m('div.check', [
            Object.keys(filterNames[key]).map(subKey =>
              m(Checkbox, {
                label: filterNames[key][subKey],
                onChange: state => this.changeFilter(key, subKey, state.checked),
              })
            ),
          ])
        ),
        m('div.drop', [
          m(Dropdown, {
            data: [
              { id: 1, name: '1. Semester' },
              { id: 2, name: '2. Semester' },
              { id: 3, name: '3. Semester' },
              { id: 4, name: '4. Semester' },
              { id: 5, name: '5. Semester' },
              { id: 6, name: '6. Semester' },
            ],
            onchange: event => {
              this.semester = event.target.value;
            },
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
