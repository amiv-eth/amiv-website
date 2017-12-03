import * as events from '../models/event';
import { isLoggedIn } from '../models/auth';

const m = require('mithril');

let signupEmail = '';

class EventSignupForm {
  static oninit() {
    if (isLoggedIn()) {
      events.checkCurrentSignup();
    }
  }

  static view() {
    if (typeof events.getCurrent() === 'undefined') {
      return m('div');
    }
    if (isLoggedIn()) {
      if (typeof events.getCurrentSignup() === 'undefined') {
        return m('button', { onclick() { events.signupCurrent(); } }, 'signup');
      }
    } else if (events.getCurrent().allow_email_signup) {
      return m('div', [
        m('input', {
          type: 'text',
          placeholder: 'Email',
          oninput: m.withAttr('value', (value) => { signupEmail = value; }),
          value: signupEmail,
        }),
        m('button', { onclick() { events.signupCurrent(signupEmail); } }, 'signup'),
      ]);
    }
    return m('div');
  }
}

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
      m(EventSignupForm),
    ]);
  }
}
