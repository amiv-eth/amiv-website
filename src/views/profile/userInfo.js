import m from 'mithril';
import { i18n } from '../../models/language';

/**
 * UserInfo class
 *
 * Shows relevant information about the authenticated user.
 */
export default class UserInfo {
  oninit(vnode) {
    this.userController = vnode.attrs.userController;
  }

  view() {
    const user = this.userController.get();
    let freeBeerNotice;

    if (user.membership !== 'none') {
      if (user.rfid !== undefined && user.rfid.length === 6) {
        freeBeerNotice = m('div', i18n('profile.free_beer'));
      } else {
        freeBeerNotice = m('div', i18n('profile.set_rfid'));
      }
    }

    return m('div', [
      m('div', [
        m('span', `${i18n('profile.membership')}: `),
        m('span', i18n(`${user.membership}_member`)),
      ]),
      freeBeerNotice,
    ]);
  }
}
