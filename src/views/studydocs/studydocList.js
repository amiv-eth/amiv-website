import m from 'mithril';
import * as studydocs from '../../models/studydocs';
import { apiUrl } from '../../models/config';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button, FilterView, Dropdown } from '../../components';
import { lecture } from '../studydocs/lecture';
import * as Filter from '../../models/Filter';

const tableHeadings = ['title', 'type'];
// define filters for check boxes
const filterStudyDocsCheck = {
  department: { itet: 'D-ITET', mavt: 'D-MAVT' },
  type: {
    'cheat sheet': 'Zusammenfassung',
    exams: 'Alte Prüfungen',
    'lecture documents': 'Unterichts Unterlagen',
    exercies: 'Übungsserien',
  },
};
// define filters for dropdown menu
const filterStudyDocsDrop = {
  semester: {
    1: '1. Semester',
    2: '2. Semester',
    3: '3. Semester',
    4: '4. Semester',
    5: '5. Semester',
    6: '6. Semester',
  },
};

export default class studydocList {
  constructor(vnode) {
    this.vnode = vnode;
    this.doc = {};
  }

  static oninit() {
    studydocs.load();
    this.semester = 1;
    this.lecture = 'Fach';
    this.search = '';
  }
  static selectDocument(doc) {
    this.doc = doc;
  }

  static lectureData() {
    if (!Filter.filter || !Filter.filter.department) {
      return [];
    }
    const data = [];
    if (Filter.filter.department.itet || !Filter.filter.department.mavt) {
      for (let i = 0; i < lecture.itet[this.semester - 1].length; i += 1) {
        data.push({
          id: lecture.itet[this.semester - 1][i],
          name: lecture.itet[this.semester - 1][i],
        });
      }
    }
    if (Filter.filter.department.mavt || !Filter.filter.department.itet) {
      for (let i = 0; i < lecture.mavt[this.semester - 1].length; i += 1) {
        data.push({
          id: lecture.mavt[this.semester - 1][i],
          name: lecture.mavt[this.semester - 1][i],
        });
      }
    }
    return data;
  }

  static view() {
    if (!isLoggedIn()) return m(Error401);

    return m('div#studydoc-list', [
      m('div.filter', [
        m(FilterView, {
          searchField: true,
          onsearch: () => alert('your search: '),
          checkbox: true,
          filterDrop: filterStudyDocsDrop,
          filterCheck: filterStudyDocsCheck,
          onloadDoc: query => studydocs.load(query),
        }),
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
              Filter.changeFilter('semester', this.semester, false);
              this.semester = event.target.value;
              Filter.changeFilter('semester', this.semester, true);
            },
          }),
          m(Dropdown, {
            data: this.lectureData(),
            onchange: event => {
              this.lecture = event.target.value;
              Filter.changeFilter('semester', this.lecture, true);
            },
          }),
        ]),
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
