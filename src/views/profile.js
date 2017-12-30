import { isLoggedIn } from '../models/auth';
import * as user from '../models/user';
import { log } from '../models/log';

const m = require('mithril');

// shows all relevant user information
class showUserInfo {
  static view() {
    let freeBeerNotice;

    if (user.get().membership !== 'none') {
      if (user.get().rfid !== undefined && user.get().rfid.length === 6) {
        freeBeerNotice = m('div', 'You are allowed to get free beer!');
      } else {
        freeBeerNotice = m('div', 'Set your RFID below to get free beer!');
      }
    }

    return m('div', [
      m('div', [
        m('span', 'Membership: '),
        m('span', user.get().membership),
      ]),
      freeBeerNotice,
    ]);
  }
}

// provides a form to change the users rfid
class rfidForm {
  submit() {
    const savedRfid = this.rfid;
    this.valid = false;
    user.update({ rfid: savedRfid }).then(() => {
      this.rfid = savedRfid;
      this.valid = true;
    }).catch(() => {
      this.rfid = savedRfid;
      this.valid = true;
    });
  }

  view() {
    const buttonArgs = { onclick: () => this.submit() };

    if (this.rfid === undefined) this.rfid = user.get().rfid;
    if (!this.valid) {
      buttonArgs.disabled = 'disabled';
    }

    return m('div', [
      m('input', {
        name: 'rfid',
        id: 'rfid',
        type: 'text',
        placeholder: 'RFID',
        value: this.rfid,
        onchange: (e) => {
          this.rfid = e.target.value;
          this.valid = /^\d{6}$/g.test(this.rfid);
          log(`rfid valid: ${this.valid}`);
        },
      }),
      m('button', buttonArgs, 'save'),
    ]);
  }
}

// provides a button to (un-)subscribe for the announce
class announceSubscriptionForm {
  oninit() {
    this.valid = true;
  }

  submit() {
    this.valid = false;
    user.update({ send_newsletter: !user.get().send_newsletter }).then(() => {
      this.valid = true;
    }).catch(() => {
      this.valid = true;
    });
  }

  view() {
    const buttonArgs = { onclick: () => this.submit() };

    if (this.rfid === undefined) this.rfid = user.get().rfid;
    if (!this.valid) {
      buttonArgs.disabled = 'disabled';
    }

    return m('button', buttonArgs, user.get().send_newsletter ? 'unsubscribe from Newsletter' : 'subscribe to Newsletter');
  }
}

// shows all submodules defined above
export default class profile {
  static oninit() {
    if (!isLoggedIn()) {
      m.route.set('/');
    }
    user.load();
  }

  static view() {
    return m('div', [
      m(showUserInfo),
      m(rfidForm),
      m(announceSubscriptionForm),
    ]);
  }
}
