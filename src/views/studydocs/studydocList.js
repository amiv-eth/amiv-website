import m from 'mithril';
import * as studydocs from '../../models/studydocs';
import { apiUrl } from '../../models/config';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button, Checkbox, RadioGroup } from '../../components';

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
      department: { itet: 0, mavt: 0 },
      type: { 'cheat sheets': 0, exams: 0 },
      semester: { '1': 0 },
    };
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
              'input',
              {
                type: 'text',
                oninput: m.withAttr('value', value => {
                  this.search = value;
                }),
              },
              ''
            ),
            m(Button, { label: 'Search' }),
          ]
        ),
        m(RadioGroup, {
          name: 'Departement',
          buttons: [
            {
              value: '1',
              label: 'D-MAVT',
            },
            {
              value: '2',
              label: 'D-ITET',
            },
          ],
        }),
        m(Checkbox, {
          label: 'D-ITET',
          onChange: state => this.changeFilter('department', 'itet', state.checked),
        }),
        m(Checkbox, {
          label: 'D-MAVT',
          onChange: state => this.changeFilter('department', 'mavt', state.checked),
        }),
        m(Checkbox, {
          label: 'Zusammenfassung',
        }),
        m(Checkbox, {
          label: 'Alte Prüfungen',
        }),
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
              .map(doc =>
                  [m('div.list-item', {onclick: () => this.selectDocument(doc) }, doc.title),
                  m('div.list-item', {onclick: () => this.selectDocument(doc) }, doc.type),]
                )
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
