import * as events from '../models/event';

const m = require('mithril');

const date = `${new Date().toISOString().split('.')[0]}Z`;

export default class EventList {
  oninit(vnode) {
    this.id = vnode.attrs.eventId;
    this.current = {};
    this.current = events.getList().find(item => item._id === this.id);
    if (typeof current === 'undefined') {
      events.load({
        where: {
          time_advertising_start: { $lte: date },
          time_advertising_end: { $gte: date },
          show_website: true,
        },
        sort: ['-priority', 'time_advertising_start'],
      }).then(() => {
        this.current = events.getList().find(item => item._id === this.id);
        if (typeof this.current === 'undefined') {
          this.current = {};
        }
      });
    }
  }

  view() {
    if (typeof this.current === 'undefined') {
      return m('div');
    }
    return m('div', [
      m('h1', this.current.title_de),
      m('span', this.current.time_start),
      m('span', this.current.signup_count),
      m('span', this.current.spots),
      m('p', this.current.description_de),
    ]);
  }
}
