import m from 'mithril';
import { apiUrl } from 'config';
import { log } from '../models/log';
import * as user from '../models/user';
import * as groups from '../models/groups';
import inputGroup from './form/inputGroup';
import { Button } from '../components';
import { i18n } from '../models/language';

// shows all relevant user information
class showUserInfo {
  static view() {
    let freeBeerNotice;

    if (user.get().membership !== 'none') {
      if (user.get().rfid !== undefined && user.get().rfid.length === 6) {
        freeBeerNotice = m('div', i18n('profile.free_beer'));
      } else {
        freeBeerNotice = m('div', i18n('profile.set_rfid'));
      }
    }

    return m('div', [
      m('div', [
        m('span', `${i18n('profile.membership')}: `),
        m('span', i18n(`${user.get().membership}_member`)),
      ]),
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

  static _createSession(password) {
    const userData = user.get();
    const username = userData.nethz || userData.email;

    return m.request({
      method: 'POST',
      url: `${apiUrl}/sessions`,
      data: { username, password },
    });
  }

  static _deleteSession(session) {
    return m.request({
      method: 'DELETE',
      url: `${apiUrl}/sessions/${session._id}`,
      headers: {
        Authorization: session.token,
        'If-Match': session._etag,
      },
    });
  }

  async submit() {
    const password = this.password1;
    this.busy = true;

    try {
      const session = await changePasswordForm._createSession(this.password_old);

      await user.update({ password }, session.token);
      await changePasswordForm._deleteSession(session);

      this.password1 = '';
    } catch ({ _error: { code } }) {
      // TODO: show error message
      if (code === 401) {
        log('Authentication failed.');
      } else {
        log(`An error occurred: ${code}`);
      }
    }

    this.busy = false;
    this.password_old = '';
    this.password2 = '';
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
          label: i18n('profile.change_password'),
          events: { onclick: () => this.submit() },
        }),
        m(Button, {
          disabled: this.password_old.length === 0,
          label: i18n('profile.revert_to_ldap'),
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
        label: i18n('profile.set_password'),
        events: { onclick: () => this.submit() },
      });
    }

    return m('div', [
      m('div', i18n('profile.password_requirements')),
      m(inputGroup, {
        name: 'password_old',
        title: i18n('profile.old_password'),
        type: 'password',
        value: this.password_old,
        oninput: e => {
          this.password_old = e.target.value;
          this.validate();
        },
      }),
      m(inputGroup, {
        name: 'password1',
        title: i18n('profile.new_password'),
        type: 'password',
        value: this.password1,
        oninput: e => {
          this.password1 = e.target.value;
          this.validate();
        },
      }),
      m(inputGroup, {
        name: 'password2',
        title: i18n('profile.repeat_password'),
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
        title: i18n('profile.rfid'),
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
      label: user.get().send_newsletter
        ? i18n('profile.newsletter_unsubscribe')
        : i18n('profile.newsletter_subscribe'),
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
        title: i18n('profile.search_groups'),
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
                label: i18n('cancel'),
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
                label: i18n('confirm'),
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
              label: i18n('withdraw'),
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
              : m('span', `(${i18n('profile.expire_on', { date: membership.expiry })})`),
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
          return m('div', [
            m('span', group.name),
            m(Button, { ...buttonArgs, label: i18n('enroll') }),
          ]);
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
