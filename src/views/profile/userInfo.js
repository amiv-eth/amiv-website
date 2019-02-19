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
    const { user } = this.userController;
    let freeBeerNotice;

    if (user.membership !== 'none') {
      if (user.rfid && user.rfid.length === 6) {
        freeBeerNotice = m('div', i18n('profile.freeBeer'));
      } else {
        freeBeerNotice = m('div', i18n('profile.setRfid'));
      }
    }

    return [
      m('div.user', [m('b', [user.firstname, ' ', user.lastname]), m('div.email', user.email)]),
      m('div.amiv', [m('div', m('b', i18n(`membership.${user.membership}`))), freeBeerNotice]),
    ];
  }
}
