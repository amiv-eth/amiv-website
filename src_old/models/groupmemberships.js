import m from 'mithril';
import { apiUrl } from 'config';
import { getToken, getUserId } from './auth';
import PaginationController from './pagination';
import { error } from './log';
import Query from './query';

/**
 * GroupMembershipsController class (inherited from `PaginationController`)
 *
 * Used to handle the list of group memberships of the authenticated user.
 */
export default class GroupMembershipsController extends PaginationController {
  constructor(query = {}, additionalQuery = {}) {
    super(
      'groupmemberships',
      query,
      Query.merge(additionalQuery, {
        embedded: { group: 1 },
      })
    );
  }

  /**
   * Enroll the authenticated user to a group
   *
   * @param {String} groupId
   * @return {Promise} exports for additional response handling
   */
  enroll(groupId) {
    return m
      .request({
        method: 'POST',
        url: `${apiUrl}/groupmemberships`,
        headers: getToken()
          ? {
              Authorization: `Token ${getToken()}`,
            }
          : {},
        data: { group: groupId, user: getUserId() },
      })
      .then(() => {
        this.loadAll();
      })
      .catch(e => {
        error(e.message);
      });
  }

  /**
   * Withdraw membership of the authenticated user from a group.
   *
   * @param {String} groupMembershipId groupmembership id
   * @param {String} etag value given by AMIV API to be used as `If-Match` header.
   * @return {Promise} exports for additional response handling
   */
  withdraw(groupMembershipId, etag) {
    return m
      .request({
        method: 'DELETE',
        url: `${apiUrl}/groupmemberships/${groupMembershipId}`,
        headers: getToken()
          ? {
              Authorization: `Token ${getToken()}`,
              'If-Match': etag,
            }
          : { 'If-Match': etag },
      })
      .then(() => {
        this.loadAll();
      })
      .catch(e => {
        error(e.message);
      });
  }
}
