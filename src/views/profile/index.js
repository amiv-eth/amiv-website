import m from 'mithril';
import User from '../../models/user';
import UserInfo from './userInfo';
import ChangePasswordForm from './changePasswordForm';
import RfidForm from './rfidForm';
import AnnounceSubscriptionForm from './announceSubscriptionForm';
import GroupMemberships from './groupMemberships';

/**
 * Profile class
 *
 * Used to show anything related to the authenticated user.
 */
export default class Profile {
  static oninit() {
    User.load();
  }

  static view() {
    return m('div', [
      m(UserInfo),
      m(ChangePasswordForm),
      m(RfidForm),
      m(AnnounceSubscriptionForm),
      m(GroupMemberships),
    ]);
  }
}
