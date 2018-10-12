import m from 'mithril';
import UserInfo from './userInfo';
import ChangePasswordForm from './changePasswordForm';
import RfidForm from './rfidForm';
import AnnounceSubscriptionForm from './announceSubscriptionForm';
import SessionInfo from './sessionInfo';
import GroupMemberships from './groupMemberships';
import PublicGroups from './publicGroups';
import UserController from '../../models/user';
import GroupMembershipsController from '../../models/groupmemberships';
import GroupsController from '../../models/groups';
import { getUserId } from '../../models/auth';

const userController = new UserController();
const groupMembershipsController = new GroupMembershipsController();
const publicGroupsController = new GroupsController({}, { where: { allow_self_enrollment: true } });

/**
 * Profile class
 *
 * Used to show anything related to the authenticated user.
 */
export default class Profile {
  static oninit() {
    userController.load();
    groupMembershipsController.setQuery({ where: { user: getUserId() } });
    groupMembershipsController.loadAll();
    publicGroupsController.loadPageData(1);
  }

  static view() {
    return m('div#profile-container', [
      m(UserInfo, { userController }),
      m(ChangePasswordForm, { userController }),
      m(RfidForm, { userController }),
      m(AnnounceSubscriptionForm, { userController }),
      m(SessionInfo, { userController }),
      m(GroupMemberships, { groupMembershipsController }),
      m(PublicGroups, { publicGroupsController, groupMembershipsController }),
    ]);
  }
}
