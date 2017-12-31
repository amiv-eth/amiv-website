import { isLoggedIn } from '../models/auth';
import * as user from '../models/user';
import * as groups from '../models/groups';
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

// provides a form to change the users password (if not authenticated by LDAP)
class changePasswordForm {
  submit() {
    const password = this.password1;
    this.busy = true;
    user.update({ password }).then(() => {
      this.busy = false;
    }).catch(() => {
      this.busy = false;
    });
  }

  validate() {
    this.valid = this.password1.length && this.password1 === this.password2;
  }

  view() {
    if (user.get() === undefined) return m();

    const buttonArgs = { onclick: () => this.submit() };

    if (!this.valid || this.busy) {
      buttonArgs.disabled = 'disabled';
    }

    return m('div', [
      m('input', {
        name: 'password1',
        id: 'password1',
        type: 'password',
        placeholder: 'Password',
        value: this.password1,
        onchange: (e) => {
          this.password1 = e.target.value;
          this.validate();
        },
      }),
      m('input', {
        name: 'password2',
        id: 'password2',
        type: 'password',
        placeholder: 'Repeat',
        value: this.password2,
        onchange: (e) => {
          this.password2 = e.target.value;
          this.validate();
        },
      }),
      m('button', buttonArgs, 'change password'),
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

// shows group memberships and allows to withdraw and enroll for selected groups.
class groupMemberships {
  static oninit() {
    groups.load({ allow_self_enrollment: true });
    groups.loadMemberships();
  }

  static view() {
    return m('div', [
      m('div', groups.getMemberships().map(membership => m('div', [
        m('span', membership.group.name),
        membership.expiry === undefined ? undefined : m('span', `(expires on ${membership.expiry})`),
        m('button', { onclick: () => groups.withdraw(membership._id, membership._etag) }, 'withdraw'),
      ]))),
      m('div', groups.getList().map((group) => {
        if (groups.getMemberships().some(element => element.group._id === group._id)) {
          return undefined;
        }
        return m('div', [
          m('span', group.name),
          m('button', { onclick: () => groups.enroll(group._id) }, 'enroll'),
        ]);
      })),
    ]);
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
      m(changePasswordForm),
      m(rfidForm),
      m(announceSubscriptionForm),
      m(groupMemberships),
    ]);
  }
}
