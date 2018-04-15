import m from 'mithril';
import { i18n, currentLanguage } from '../../models/language';
import * as events from '../../models/events';
import { FilterView } from '../../components';

const date = `${new Date().toISOString().split('.')[0]}Z`;

const filterEventsCheck = {
  type: {
    cool: 'Coole Events',
    intelligent: 'Bildungs Events',
    gaming: 'Gaming Events',
  },
};

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
          searchField: true,
          onsearch: () => alert('your search: '),
          checkbox: true,
          filterCheck: filterEventsCheck,
          filterDrop: {},
        }),
      ]),
      m(
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
    ]);
  }
}
