import m from 'mithril';
import { apiUrl } from './config';
import { getToken, getUserId } from './auth';
import { error } from './log';

let querySaved = '';

/**
 * Get the loaded list of groups.
 *
 * @return {array} `group` objects returned by the AMIV API.
 */
export function getList() {
  if (this.groups === undefined) {
    return [];
  }
  return this.groups;
}

/**
 * Get the memberships for the authenticated user.
 *
 * @return {array} `groupmembership` objects with embedded groups returned by the AMIV API.
 */
export function getMemberships() {
  if (this.memberships === undefined) {
    return [];
  }
  return this.memberships;
}

/**
 * Enroll the authenticated user to a group
 *
 * @param {String} groupId
 * @return {Promise} exports for additional response handling
 */
export function enroll(groupId) {
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
    .then(result => {
      const membership = result;
      const group = this.groups.find(item => item._id === membership.group);
      if (group === undefined) {
        membership.group = membership.group;
      } else {
        membership.group = group;
      }
      this.memberships.push(membership);
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
export function withdraw(groupMembershipId, etag) {
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
      this.memberships = this.memberships.filter(item => item._id !== groupMembershipId);
    })
    .catch(e => {
      error(e.message);
    });
}

/**
 * Load groups from the AMIV API.
 *
 * @param {*} query filter and sort query for the API request.
 * @return {Promise} exports for additional response handling
 */
export function load(query = {}) {
  const queryEncoded = m.buildQueryString({ where: JSON.stringify(query) });
  querySaved = query;

  return m
    .request({
      method: 'GET',
      url: `${apiUrl}/groups?${queryEncoded}`,
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(result => {
      this.groups = result._items;
    })
    .catch(e => {
      error(e.message);
    });
}

/**
 * Load groupmemberships of the authenticated user from the AMIV API.
 *
 * @return {Promise} exports for additional response handling
 */
export function loadMemberships() {
  const queryEncoded = m.buildQueryString({
    where: JSON.stringify({ user: getUserId() }),
    embedded: JSON.stringify({ group: 1 }),
  });
  return m
    .request({
      method: 'GET',
      url: `${apiUrl}/groupmemberships?${queryEncoded}`,
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(result => {
      this.memberships = result._items;
    })
    .catch(e => {
      error(e.message);
    });
}

/**
 * Reload event list with the same query as before.
 *
 * @return {Promise} exports for additional response handling
 */
export function reload() {
  return load(querySaved);
}
