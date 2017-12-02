import * as events from '../models/event';

const m = require('mithril');

export default class EventDetails {
  static oninit(vnode) {
    events.loadCurrent(vnode.attrs.eventId);
  }

  static view() {
    if (typeof events.getCurrent() === 'undefined') {
      return m('div');
    }
    return m('div', [
      m('h1', events.getCurrent().title_de),
      m('span', events.getCurrent().time_start),
      m('span', events.getCurrent().signup_count),
      m('span', events.getCurrent().spots),
      m('p', events.getCurrent().description_de),
    ]);
  }
}
