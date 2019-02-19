import m from 'mithril';
import { Card } from 'polythene-mithril';
import { DropdownCard, Spinner } from 'amiv-web-ui-components';
import UserInfo from './userInfo';
import ChangePasswordForm from './changePasswordForm';
import RfidForm from './rfidForm';
import NewsletterSubscriptionForm from './newsletterSubscriptionForm';
import SessionInfo from './sessionInfo';
import { GroupMemberships, PublicGroups } from './groups';
import UserController from '../../models/user';
import GroupMembershipsController from '../../models/groupmemberships';
import GroupsController from '../../models/groups';
import { getUserId } from '../../models/auth';
import { i18n } from '../../models/language';

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
    if (!userController.user) {
      return m('.loading', m(Spinner, { show: true, size: '96px' }));
    }

    return m('div.profile-container', [
      m(Card, {
        className: 'info-container',
        content: m(UserInfo, { userController }),
      }),
      m('div.settings', [
        m(Card, {
          title: 'Subscriptions',
          style: {
            margin: '0 0 16px 0',
            borderRadius: '4px',
          },
          content: m(NewsletterSubscriptionForm, { userController }),
        }),
        m(Card, {
          style: {
            margin: '16px 0',
            borderRadius: '4px',
          },
          content: m(SessionInfo, { userController }),
        }),
        m(DropdownCard, {
          title: `RFID: ${userController.user.rfid || i18n('profile.rfidNotSet')}`,
          style: {
            margin: '16px 0',
            borderRadius: '4px',
          },
          content: m(RfidForm, { userController }),
        }),
        m(DropdownCard, {
          title: userController.user.password_set
            ? i18n('profile.password.change')
            : i18n('profile.password.set'),
          style: {
            margin: '16px 0',
            borderRadius: '4px',
          },
          content: m(ChangePasswordForm, { userController }),
        }),
      ]),
      m(
        'div.groups',
        m('div', [
          m(Card, {
            className: 'groupmemberships',
            content: m(GroupMemberships, { groupMembershipsController }),
          }),
          m(Card, {
            className: 'public-groups',
            content: m(PublicGroups, { publicGroupsController, groupMembershipsController }),
          }),
        ])
      ),
    ]);
  }
}
