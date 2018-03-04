import m from 'mithril';
import * as events from '../../models/events';

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
    return m('table', [
      m('thead', [
        m('tr', [
          m('th', 'Title'),
          m('th', 'Starting time'),
          m('th', 'Signup count'),
          m('th', 'Spots'),
        ]),
      ]),
      m('tbody', events.getList().map(event =>
        m('tr', [
          m('td', event.title),
          m('td', event.time_start),
          m('td', event.signup_count),
          m('td', event.spots),
          m('td', m('a', { href: `/events/${event._id}`, oncreate: m.route.link }, 'Details')),
        ]))),
    ]);
  }
}
