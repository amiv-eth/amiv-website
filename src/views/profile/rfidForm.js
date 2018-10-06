import m from 'mithril';
import { i18n } from '../../models/language';
import { Button, TextField } from '../../components';

// provides a form to change the users rfid
export default class RfidForm {
  oninit(vnode) {
    this.userController = vnode.attrs.userController;
  }

  submit() {
    const savedRfid = this.rfid;
    this.busy = true;
    this.userController
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
    const user = this.userController.get();

    if (this.rfid === undefined) this.rfid = user.rfid;
    if (!this.valid || this.busy) {
      buttonArgs.disabled = true;
    }

    return m('div#rfid', [
      m(TextField, {
        name: 'rfid',
        label: i18n('profile.rfid'),
        floatingLabel: true,
        error: i18n('profile.rfid_error'),
        valid: this.valid,
        value: this.rfid,
        events: {
          oninput: e => {
            this.rfid = e.target.value;
            this.valid = /^\d{6}$/g.test(this.rfid) && this.rfid !== user.rfid;
          },
        },
      }),
      m(Button, { ...buttonArgs, label: 'save' }),
    ]);
  }
}
