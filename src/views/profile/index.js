import m from 'mithril';
import UserInfo from './userInfo';
import ChangePasswordForm from './changePasswordForm';
import RfidForm from './rfidForm';
import AnnounceSubscriptionForm from './announceSubscriptionForm';
import SessionInfo from './sessionInfo';
import GroupMemberships from './groupMemberships';
import UserController from '../../models/user';

const userController = new UserController();

/**
 * Profile class
 *
 * Used to show anything related to the authenticated user.
 */
export default class Profile {
  static oninit() {
    userController.load();
  }

  static view() {
    return m('div', [
      m(UserInfo, { userController }),
      m(ChangePasswordForm, { userController }),
      m(RfidForm, { userController }),
      m(AnnounceSubscriptionForm, { userController }),
      m(SessionInfo, { userController }),
      m(GroupMemberships),
    ]);
  }
}
