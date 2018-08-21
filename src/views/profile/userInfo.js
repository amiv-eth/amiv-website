import m from 'mithril';
import User from '../../models/user';
import { i18n } from '../../models/language';

/**
 * UserInfo class
 *
 * Shows relevant information about the authenticated user.
 */
export default class UserInfo {
  static view() {
    let freeBeerNotice;

    if (User.get().membership !== 'none') {
      if (User.get().rfid !== undefined && User.get().rfid.length === 6) {
        freeBeerNotice = m('div', i18n('profile.free_beer'));
      } else {
        freeBeerNotice = m('div', i18n('profile.set_rfid'));
      }
    }

    return m('div', [
      m('div', [
        m('span', `${i18n('profile.membership')}: `),
        m('span', i18n(`${User.get().membership}_member`)),
      ]),
      freeBeerNotice,
    ]);
  }
}
