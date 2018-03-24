import m from 'mithril';
import { getUsername, login } from '../models/auth';
import * as user from '../models/user';
import * as groups from '../models/groups';
import inputGroup from './form/inputGroup';
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
      m('div', [m('span', 'Membership: '), m('span', user.get().membership)]),
      freeBeerNotice,
    ]);
  }
}

// provides a form to change the users password (if not authenticated by LDAP)
class changePasswordForm {
  oninit() {
    this.password_old = '';
    this.password1 = '';
    this.password2 = '';
  }

  submit() {
    const password = this.password1;
    this.busy = true;

    // renew authentication token, so we are allowed to change the password
    login(getUsername(), this.password_old);
    user
      .update({ password })
      .then(() => {
        this.busy = false;
        this.password_old = '';
        this.password1 = '';
        this.password2 = '';
      })
      .catch(() => {
        this.busy = false;
        this.password_old = '';
        this.password2 = '';
      });
  }

  // Password policy:
  // * Minimum length: 8
  // * Maximum length: 100
  // * Contains capital/lower letters
  // * Contains numbers
  // * Does not contain any whitespace characters
  validate() {
    this.valid =
      this.password_old.length > 0 &&
      this.password1.length >= 8 &&
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

    const buttonArgs = {};
    let buttons;

    if (!this.valid || !this.equal || this.busy) {
      buttonArgs.disabled = true;
    }

    if (user.get().password_set) {
      buttons = [
        m(Button, {
          ...buttonArgs,
          label: 'change password',
          events: { onclick: () => this.submit() },
        }),
        m(Button, {
          disabled: this.password_old.length === 0,
          label: 'Revert to LDAP',
          events: {
            onclick: () => {
              this.password1 = '';
              this.password2 = '';
              this.submit();
            },
          },
        }),
      ];
    } else {
      buttons = m(Button, {
        ...buttonArgs,
        label: 'set password',
        events: { onclick: () => this.submit() },
      });
    }

    return m('div', [
      m('div', 'Requirements: min 8 characters, upper and lower case letters and numbers'),
      m(inputGroup, {
        name: 'password_old',
        title: 'Old Password',
        type: 'password',
        value: this.password_old,
        oninput: e => {
          this.password_old = e.target.value;
          this.validate();
        },
      }),
      m(inputGroup, {
        name: 'password1',
        title: 'New Password',
        type: 'password',
        value: this.password1,
        oninput: e => {
          this.password1 = e.target.value;
          this.validate();
        },
      }),
      m(inputGroup, {
        name: 'password2',
        title: 'Repeat',
        type: 'password',
        value: this.password2,
        oninput: e => {
          this.password2 = e.target.value;
          this.validate();
        },
      }),
      buttons,
    ]);
  }
}

// provides a form to change the users rfid
class rfidForm {
  submit() {
    const savedRfid = this.rfid;
    this.busy = true;
    user
      .update({ rfid: savedRfid })
      .then(() => {
        this.rfid = savedRfid;
        this.busy = false;
      })
      .catch(() => {
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
      m(inputGroup, {
        name: 'rfid',
        title: 'RFID',
        value: this.rfid,
        oninput: e => {
          this.rfid = e.target.value;
          this.valid = /^\d{6}$/g.test(this.rfid) && this.rfid !== user.get().rfid;
        },
      }),
      m(Button, { ...buttonArgs, label: 'save' }),
    ]);
  }
}

// provides a button to (un-)subscribe for the announce
class announceSubscriptionForm {
  submit() {
    this.busy = true;
    user
      .update({ send_newsletter: !user.get().send_newsletter })
      .then(() => {
        this.busy = false;
      })
      .catch(() => {
        this.busy = false;
      });
  }

  view() {
    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    return m(Button, {
      ...buttonArgs,
      label: user.get().send_newsletter ? 'unsubscribe from Newsletter' : 'subscribe to Newsletter',
    });
  }
}

// shows group memberships and allows to withdraw and enroll for selected groups.
class groupMemberships {
  oninit() {
    groups.load({ allow_self_enrollment: true });
    groups.loadMemberships();
    this.busy = [];
    this.confirm = [];
    this.query = '';
  }

  view() {
    // Searchbar for groups
    const filterForm = m('div', [
      m(inputGroup, {
        name: 'group_search',
        title: 'Search groups',
        oninput: e => {
          this.query = e.target.value;
          if (this.query.length > 0) {
            this.isValid = true;
          }
        },
      }),
    ]);

    return m('div', [
      filterForm,
      m(
        'div',
        groups.getMemberships().map(membership => {
          const buttonArgs = {};
          let buttons;

          if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(membership.group.name)) {
            return m('');
          }

          if (this.busy[membership.group._id]) {
            buttonArgs.disabled = true;
          }

          if (this.confirm[membership.group._id]) {
            buttons = [
              m(Button, {
                ...buttonArgs,
                label: 'cancel',
                className: 'flat-button',
                events: {
                  onclick: () => {
                    this.confirm[membership.group._id] = false;
                    this.busy[membership.group._id] = false;
                  },
                },
              }),
              m('span', ' '),
              m(Button, {
                ...buttonArgs,
                label: 'confirm',
                events: {
                  onclick: () => {
                    this.busy[membership.group._id] = true;
                    groups
                      .withdraw(membership._id, membership._etag)
                      .then(() => {
                        this.busy[membership.group._id] = false;
                        this.confirm[membership.group._id] = false;
                      })
                      .catch(() => {
                        this.busy[membership.group._id] = false;
                        this.confirm[membership.group._id] = false;
                      });
                  },
                },
              }),
            ];
          } else {
            buttons = m(Button, {
              ...buttonArgs,
              label: 'withdraw',
              events: {
                onclick: () => {
                  this.confirm[membership.group._id] = true;
                },
              },
            });
          }

          return m('div', [
            m('span', membership.group.name),
            membership.expiry === undefined
              ? undefined
              : m('span', `(expires on ${membership.expiry})`),
            buttons,
          ]);
        })
      ),
      m(
        'div',
        groups.getList().map(group => {
          if (groups.getMemberships().some(element => element.group._id === group._id)) {
            return m('');
          }

          if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(group.name)) {
            return m('');
          }

          const buttonArgs = {
            events: {
              onclick: () => {
                this.busy[group._id] = true;
                groups
                  .enroll(group._id)
                  .then(() => {
                    this.busy[group._id] = false;
                  })
                  .catch(() => {
                    this.busy[group._id] = false;
                  });
              },
            },
          };

          if (this.busy[group._id]) {
            buttonArgs.disabled = true;
          }
          return m('div', [m('span', group.name), m(Button, { ...buttonArgs, label: 'enroll' })]);
        })
      ),
    ]);
  }
}

// shows all submodules defined above
export default class profile {
  static oninit() {
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
