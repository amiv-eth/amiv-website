import * as studydocs from '../models/studydocs';
import { apiUrl } from '../models/config';

const m = require('mithril');

const tableHeadings = [
  'title', 'lecture', 'professor', 'semester', 'author', 'download',
];

export default class studydocList {
  constructor(vnode) {
    this.vnode = vnode;
  }

  static oninit() {
    studydocs.load();
    this.search = '';
  }

  static view() {
    return m('div', [
      m('form', {
        onsubmit: (e) => {
          e.preventDefault();
          const query = {
            $or: [
              { title: { $regex: `.*${this.search}.*` } },
              { lecture: { $regex: `.*${this.search}.*` } },
              { professor: { $regex: `.*${this.search}.*` } },
              { author: { $regex: `.*${this.search}.*` } },
            ],
          };
          studydocs.load(query);
        },
      }, [
        m('input', { type: 'text', oninput: m.withAttr('value', (value) => { this.search = value; }) }, ''),
        m('button', { type: 'submit' }, 'Search'),
      ]),
      m('table', [
        m('thead', m('tr', tableHeadings.map(header => m('th', header)))),
        m('tbody', studydocs.getList().map(doc => m('tr', [
          m('td', doc.title),
          m('td', doc.lecture),
          m('td', doc.professor),
          m('td', doc.semester),
          m('td', doc.author),
          m('td', m('a', { href: apiUrl + doc.files[0].file }, 'download')),
        ]))),
      ]),

    ]);
  }
}
