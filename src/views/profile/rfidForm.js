import m from 'mithril';
import { Icon } from 'polythene-mithril-icon';
import { i18n } from '../../models/language';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import icons from '../../images/icons';
import { Infobox } from '../errors';

// provides a form to change the users rfid
export default class RfidForm {
  constructor(vnode) {
    this.userController = vnode.attrs.userController;
    this.valid = true;
    this.rfid = null;
  }

  submit() {
    const savedRfid = this.rfid || null;
    this.busy = true;
    this.userController
      .update({ rfid: savedRfid })
      .then(() => {
        this.rfid = savedRfid || '';
        this.busy = false;
        this.notification = { type: 'success', label: i18n('profile.rfidChanged') };
      })
      .catch(() => {
        this.rfid = savedRfid || '';
        this.busy = false;
        this.notification = { type: 'fail', label: i18n('profile.rfidPatchError') };
      });
  }

  view() {
    const buttonArgs = { events: { onclick: () => this.submit() } };
    const { user } = this.userController;

    if (user.rfid === undefined) {
      return m('');
    }

    if (!this.rfid && this.rfid !== '') this.rfid = user.rfid || '';
    if (!this.valid || this.busy) {
      buttonArgs.disabled = true;
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
        className: 'info',
        icon: m(Icon, { svg: { content: m.trust(iconSource) } }),
        label: this.notification.label,
      });
    }

    return m('div.rfid', [
      notification,
      m(TextField, {
        label: i18n('profile.rfid'),
        floatingLabel: true,
        error: i18n('profile.rfidError'),
        valid: this.valid,
        value: this.rfid,
        events: {
          oninput: e => {
            this.rfid = e.target.value;
            this.valid = /^\d{6}$/g.test(this.rfid) || this.rfid === '';
          },
        },
      }),
      m(Button, { ...buttonArgs, label: i18n('confirm') }),
    ]);
  }
}
