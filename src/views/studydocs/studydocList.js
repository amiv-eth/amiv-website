import m from 'mithril';
import { apiUrl } from 'config';
import * as studydocs from '../../models/studydocs';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button, FilterView, Dropdown } from '../../components';
import { lectures } from '../studydocs/lectures';
import * as filter from '../../models/filter';

const tableHeadings = ['title', 'type'];
// define filters for check boxes
const filterStudyDocsCheck = {
  department: { itet: 'D-ITET', mavt: 'D-MAVT' },
  type: {
    'cheat sheet': 'Zusammenfassung',
    exams: 'Alte Prüfungen',
    'lectures documents': 'Unterichts Unterlagen',
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

  oninit() {
    studydocs.load();

    // initialize values for filter
    this.semester = 1;
    this.lectures = 'Fach';
    this.search = '';
  }

  selectDocument(doc) {
    this.doc = doc;
  }

  // dynamic lectures data based on selected semester and department
  static lecturesData() {
    if (!filter.state || !filter.state.department) {
      return [];
    }
    const data = [];
    if (filter.state.department.itet || !filter.state.department.mavt) {
      for (let i = 0; i < lectures.itet[this.semester - 1].length; i += 1) {
        data.push({
          id: lectures.itet[this.semester - 1][i],
          name: lectures.itet[this.semester - 1][i],
        });
      }
    }
    if (filter.state.department.mavt || !filter.state.department.itet) {
      for (let i = 0; i < lectures.mavt[this.semester - 1].length; i += 1) {
        data.push({
          id: lectures.mavt[this.semester - 1][i],
          name: lectures.mavt[this.semester - 1][i],
        });
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
          searchField: true,
          checkbox: true,
          filterDrop: filterStudyDocsDrop,
          filterCheck: filterStudyDocsCheck,
          onloadDoc: query => studydocs.load(query),
        }),
        // add aditional dropdowns for semester and lectures
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
              filter.changeFilter('semester', this.semester, false);
              this.semester = event.target.value;
              filter.changeFilter('semester', this.semester, true);
            },
          }),
          m(Dropdown, {
            data: this.lecturesData(),
            onchange: event => {
              this.lectures = event.target.value;
              filter.changeFilter('semester', this.lectures, true);
            },
          }),
        ]),
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
              m('tr', this.doc.title),
              m('tr', this.doc.lectures),
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
