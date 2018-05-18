import m from 'mithril';
import { i18n, currentLanguage } from '../../models/language';
import * as events from '../../models/events';
import { FilterView } from '../../components';
import { log } from '../../models/log';

const date = `${new Date().toISOString().split('.')[0]}Z`;

export default class EventList {
  static oninit() {
    events.load({
      where: {
        time_advertising_start: { $lte: date },
        time_advertising_end: { $gte: date },
        show_website: true,
      },
      sort: ['-priority', 'time_advertising_start'],
    });
  }

  static onbeforeupdate(vnode, old) {
    // when attrs are different it means we changed route
    if (vnode.attrs.id !== old.attrs.id) {
      events.reload();
    }
  }

  static view() {
    return m('div#studydoc-list', [
      m('div.filter', [
        m(FilterView, {
          fields: [
            {
              type: 'text',
              key: 'title',
              label: i18n('events.searchfield'),
              min_length: 3,
            },
            {
              type: 'button',
              label: i18n('search'),
            },
            {
              type: 'checkbox',
              key: 'price',
              label: i18n('events.price'),
              default: ['free', 'small_fee'],
              values: [
                { value: 'free', label: i18n('events.free') },
                { value: 'small_fee', label: i18n('events.small_fee') },
              ],
            },
          ],
          onchange: () => {
            // TODO: implement event filtering
            log('Event filtering not implemented yet.');
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
        : m(''),
    ]);
    /* m(
        'tbody',
        events
          .getList()
          .map(event =>
            m('tr', [
              m('td', event.title),
              m('td', event.time_start),
              m('td', event.signup_count),
              m('td', event.spots),
              m(
                'td',
                m(
                  'a',
                  { href: `/${currentLanguage()}/events/${event._id}`, oncreate: m.route.link },
                  'Details'
                )
              ),
            ])
          )
      ),
    ]); */
  }
}
