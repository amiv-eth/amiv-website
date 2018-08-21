import m from 'mithril';
import User from '../../models/user';
import { i18n } from '../../models/language';
import { Button, InputGroupForm } from '../../components';

// provides a form to change the users rfid
export default class RfidForm {
  submit() {
    const savedRfid = this.rfid;
    this.busy = true;
    User.update({ rfid: savedRfid })
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

    if (this.rfid === undefined) this.rfid = User.get().rfid;
    if (!this.valid || this.busy) {
      buttonArgs.disabled = true;
    }

    return m('div', [
      m(InputGroupForm, {
        name: 'rfid',
        title: i18n('profile.rfid'),
        value: this.rfid,
        oninput: e => {
          this.rfid = e.target.value;
          this.valid = /^\d{6}$/g.test(this.rfid) && this.rfid !== User.get().rfid;
        },
      }),
      m(Button, { ...buttonArgs, label: 'save' }),
    ]);
  }
}
