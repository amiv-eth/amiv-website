import m from 'mithril';
import * as studydocs from '../../models/studydocs';
import { apiUrl } from '../../models/config';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import { Button } from '../../components';

const tableHeadings = ['title', 'lecture', 'professor', 'semester', 'author', 'download'];

export default class studydocList {
  constructor(vnode) {
    this.vnode = vnode;
  }

  static oninit() {
    studydocs.load();
    this.search = '';
  }

  static view() {
    if (!isLoggedIn()) return m(Error401);

    return m('div#studydoc-list', [
      m('div.filter',[
          m('form',
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
          m(Button, {
            label: 'Add new',
            events: { onclick: () => m.route.set('/studydocuments/new') },
          }),
        ]
      ),
      m( 'div.content',[
        m('table', [
          m('thead',
          m('tr', tableHeadings.map(header => m('th', header)))),
            m('tbody',
              studydocs
                .getList()
                .map(doc =>
                  m('tr',  {onclick:alert('You clicked me !')},[
                    m('td', doc.title),
                    m('td', doc.lecture),
                    m('td', doc.professor),
                    m('td', doc.semester),
                    m('td', doc.author),
                    m(
                      'td',
                      doc.files.map(item =>
                        m('a', { href: `${apiUrl}${item.file}`, target: '_blank' }, item.name)
                      )
                    ),
                  ])
                )
            ),
        ]),
      ]),
      m('div.details',[
        m('table',[m('p',['Details that rock!'])
        ])
      ])
    ]);
  }
}
