import m from 'mithril';
import marked from 'marked';
import { apiUrl } from 'config';
import { Dialog } from 'polythene-mithril-dialog';
import { Icon } from 'polythene-mithril-icon';
import { log } from '../../models/log';
import { i18n } from '../../models/language';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import icons from '../../images/icons';
import { Infobox } from '../errors';

/**
 * ChangePasswordForm class
 *
 * provides a form to change the users password (or set one if authenticated by LDAP)
 */
export default class ChangePasswordForm {
  constructor(vnode) {
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
        this.userController.user,
        this.password_old
      );

      await this.userController.update({ password }, session.token);
      await this.constructor._deleteSession(session);

      this.password1 = '';
      this.notification = { type: 'success', label: i18n('profile.password.changed') };
    } catch ({ _error: { code } }) {
      if (code === 401) {
        this.notification = { type: 'fail', label: i18n('profile.password.errors.current') };
        this.valid_old = false;
      } else {
        this.notification = { type: 'fail', label: i18n('profile.password.errors.unknown') };
        log(`An error occurred: ${code}`);
      }
    }

    this.busy = false;
    this.password_old = '';
    this.password2 = '';
  }

  // Password policy:
  // * Minimum length: 7
  // * Maximum length: 100
  validate() {
    this.valid_new1 = this.password1.length >= 7 && this.password1.length <= 100;
    this.valid_new2 = this.password1 === this.password2;
    this.valid = this.valid_old && this.valid_new1 && this.valid_new2;
  }

  view() {
    const { user } = this.userController;
    if (user === undefined) return m();

    const buttonArgs = {};
    let buttons;

    if (!this.valid || this.busy) {
      buttonArgs.disabled = true;
    }

    if (user.password_set) {
      buttons = [
        m(
          'div',
          { margin: 5 },
          m(Button, {
            ...buttonArgs,
            label: i18n('profile.password.change'),
            events: { onclick: () => this.submit() },
          })
        ),
        m(
          'div',
          { margin: 5 },
          m(Button, {
            disabled: !this.valid_old || this.busy,
            label: i18n('profile.password.revertToLdap'),
            events: {
              onclick: () => {
                if (!this.valid_old) {
                  this.validate();
                  return;
                }

                Dialog.show({
                  title: i18n('warning'),
                  body: m.trust(marked(i18n('profile.password.revertToLdapWarning'))),
                  modal: true,
                  backdrop: true,
                  footerButtons: [
                    m(Button, {
                      label: i18n('button.cancel'),
                      className: 'flat-button',
                      events: {
                        onclick: () => {
                          Dialog.hide();
                          return false;
                        },
                      },
                    }),
                    m(Button, {
                      label: i18n('button.proceed'),
                      className: 'flat-button',
                      events: {
                        onclick: () => {
                          this.password1 = '';
                          this.password2 = '';
                          Dialog.hide();
                          this.submit();
                          return false;
                        },
                      },
                    }),
                  ],
                });
              },
            },
          })
        ),
      ];
    } else {
      buttons = m(Button, {
        ...buttonArgs,
        label: i18n('profile.password.set'),
        events: { onclick: () => this.submit() },
      });
    }

    let notification;

    if (this.notification) {
      let iconSource;
      if (this.notification.type === 'success') {
        iconSource = icons.checkboxMarked;
      } else if (this.notification.type === 'fail') {
        iconSource = icons.error;
      } else {
        iconSource = icons.info;
      }
      notification = m(Infobox, {
        icon: m(Icon, { svg: { content: m.trust(iconSource) } }),
        label: this.notification.label,
      });
    }

    return m('div.change-password', [
      notification,
      m(TextField, {
        name: 'password_old',
        label: i18n('profile.password.current'),
        floatingLabel: true,
        valid: this.valid_old,
        type: 'password',
        value: this.password_old,
        error: i18n('profile.password.errors.current'),
        events: {
          oninput: e => {
            this.password_old = e.target.value;
            this.valid_old = this.password_old.length > 0;
            this.validate();
          },
        },
      }),
      m(TextField, {
        name: 'password1',
        label: i18n('profile.password.new'),
        floatingLabel: true,
        error: i18n('profile.password.requirements'),
        valid: this.valid_new1,
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
        label: i18n('profile.password.repeatNew'),
        floatingLabel: true,
        valid: this.valid_new2,
        type: 'password',
        value: this.password2,
        error: i18n('profile.password.errors.notEqual'),
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
