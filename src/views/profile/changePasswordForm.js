import m from 'mithril';
import { apiUrl } from 'config';
import { log } from '../../models/log';
import { i18n } from '../../models/language';
import { Button, TextField } from '../../components';

/**
 * ChangePasswordForm class
 *
 * provides a form to change the users password (or set one if authenticated by LDAP)
 */
export default class ChangePasswordForm {
  oninit(vnode) {
    this.userController = vnode.attrs.userController;
    this.password_old = '';
    this.password1 = '';
    this.password2 = '';
  }

  static _createSession(user, password) {
    const username = user.nethz || user.email;

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
      const session = await this.constructor._createSession(
        this.userController.get(),
        this.password_old
      );

      await this.userController.update({ password }, session.token);
      await this.constructor._deleteSession(session);

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
  validate() {
    this.valid =
      this.password_old.length > 0 && this.password1.length >= 8 && this.password1.length <= 100;
    this.equal = this.password1 === this.password2;
  }

  view() {
    const user = this.userController.get();
    if (user === undefined) return m();

    const buttonArgs = {};
    let buttons;

    if (!this.valid || !this.equal || this.busy) {
      buttonArgs.disabled = true;
    }

    if (user.password_set) {
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

    return m('div#change-password', [
      m('div', i18n('profile.password_requirements')),
      m(TextField, {
        name: 'password_old',
        label: i18n('profile.old_password'),
        floatingLabel: true,
        valid: this.valid,
        type: 'password',
        value: this.password_old,
        events: {
          oninput: e => {
            this.password_old = e.target.value;
            this.validate();
          },
        },
      }),
      m(TextField, {
        name: 'password1',
        label: i18n('profile.new_password'),
        floatingLabel: true,
        valid: this.valid,
        type: 'password',
        value: this.password1,
        events: {
          oninput: e => {
            this.password1 = e.target.value;
            this.validate();
          },
        },
      }),
      m(TextField, {
        name: 'password2',
        label: i18n('profile.repeat_password'),
        floatingLabel: true,
        valid: this.valid,
        type: 'password',
        value: this.password2,
        events: {
          oninput: e => {
            this.password2 = e.target.value;
            this.validate();
          },
        },
      }),
      buttons,
    ]);
  }
}
