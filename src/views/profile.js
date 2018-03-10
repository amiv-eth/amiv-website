import m from 'mithril';
import { isLoggedIn } from '../models/auth';
import * as user from '../models/user';
import * as groups from '../models/groups';
import { Button } from '../components';


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

  // Password policy:
  // * Minimum length: 8
  // * Maximum length: 100
  // * Contains capital/lower letters
  // * Contains numbers
  // * Does not contain any whitespace characters
  validate() {
    this.valid = this.password1.length > 8 &&
      this.password1.length <= 100 &&
      !this.password1.match(/\s/g) &&
      this.password1.match(/[A-Z]/g) &&
      this.password1.match(/[a-z]/g) &&
      this.password1.match(/\d/g) &&
      this.password1.match(/\W+/g);
    this.equal = this.password1 === this.password2;
  }

  view() {
    if (user.get() === undefined) return m();

    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (!this.valid || !this.equal || this.busy) {
      buttonArgs.disabled = true;
    }

    return m('div', [
      m('input', {
        name: 'password1',
        id: 'password1',
        type: 'password',
        placeholder: 'Password',
        value: this.password1,
        oninput: (e) => {
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
        oninput: (e) => {
          this.password2 = e.target.value;
          this.validate();
        },
      }),
      m(Button, { ...buttonArgs, label: 'change password' }),
    ]);
  }
}

// provides a form to change the users rfid
class rfidForm {
  submit() {
    const savedRfid = this.rfid;
    this.busy = true;
    user.update({ rfid: savedRfid }).then(() => {
      this.rfid = savedRfid;
      this.busy = false;
    }).catch(() => {
      this.rfid = savedRfid;
      this.busy = false;
    });
  }

  view() {
    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (this.rfid === undefined) this.rfid = user.get().rfid;
    if (!this.valid || this.busy) {
      buttonArgs.disabled = true;
    }

    return m('div', [
      m('input', {
        name: 'rfid',
        id: 'rfid',
        type: 'text',
        placeholder: 'RFID',
        value: this.rfid,
        oninput: (e) => {
          this.rfid = e.target.value;
          this.valid = /^\d{6}$/g.test(this.rfid) && this.rfid !== user.get().rfid;
        },
      }),
      m(Button, {...buttonArgs, label: 'save'}),
    ]);
  }
}

// provides a button to (un-)subscribe for the announce
class announceSubscriptionForm {
  submit() {
    this.busy = true;
    user.update({ send_newsletter: !user.get().send_newsletter }).then(() => {
      this.busy = false;
    }).catch(() => {
      this.busy = false;
    });
  }

  view() {
    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    return m(Button, {...buttonArgs, label: user.get().send_newsletter ? 'unsubscribe from Newsletter' : 'subscribe to Newsletter'});
  }
}

// shows group memberships and allows to withdraw and enroll for selected groups.
class groupMemberships {
  static oninit() {
    groups.load({ allow_self_enrollment: true });
    groups.loadMemberships();
    this.busy = [];
  }

  static view() {
    return m('div', [
      m('div', groups.getMemberships().map((membership) => {
        const buttonArgs = {
          events: {
            onclick: () => {
              this.busy[membership.group._id] = true;
              groups.withdraw(membership._id, membership._etag).then(() => {
                this.busy[membership.group._id] = false;
              }).catch(() => {
                this.busy[membership.group._id] = false;
              });
            },
          }
        };

        if (this.busy[membership.group._id]) {
          buttonArgs.disabled = true;
        }

        return m('div', [
          m('span', membership.group.name),
          membership.expiry === undefined ? undefined : m('span', `(expires on ${membership.expiry})`),
          m(Button, {...buttonArgs, label: 'withdraw'}),
        ]);
      })),
      m('div', groups.getList().map((group) => {
        if (groups.getMemberships().some(element => element.group._id === group._id)) {
          return m.trust('');
        }
        const buttonArgs = {
          events: {
            onclick: () => {
              this.busy[group._id] = true;
              groups.enroll(group._id).then(() => {
                this.busy[group._id] = false;
              }).catch(() => {
                this.busy[group._id] = false;
              });
            },
          }
        };

        if (this.busy[group._id]) {
          buttonArgs.disabled = true;
        }
        return m('div', [
          m('span', group.name),
          m(Button, {...buttonArgs, label: 'enroll'}),
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
