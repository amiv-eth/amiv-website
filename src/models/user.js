import m from 'mithril';
import { apiUrl } from './config';
import { getToken, getUserId } from './auth';
import { log, error } from './log';

/**
 * Update data of the authenticated user.
 *
 * @param {Object} options any subset of user properties.
 * @return {Promise} exports for additional response handling
 */
export function update(options) {
  log(this.user._etag);

  return m
    .request({
      method: 'PATCH',
      url: `${apiUrl}/users/${getUserId()}`,
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
            'If-Match': this.user._etag,
          }
        : { 'If-Match': this.user._etag },
      data: options,
    })
    .then(result => {
      this.user = result;
    })
    .catch(e => {
      error(e.message);
    });
}

/**
 * Get available user data of the authenticated user.
 *
 * @return {Object} `user` object returned by the AMIV API.
 */
export function get() {
  if (typeof this.user === 'undefined') {
    return {};
  }
  return this.user;
}

// load information of logged in user
/**
 * Load user data of the authenticated user from the AMIV API.
 *
 * @return {Promise} exports for additional response handling
 */
export function load() {
  return m
    .request({
      method: 'GET',
      url: `${apiUrl}/users/${getUserId()}`,
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(result => {
      this.user = result;
    })
    .catch(e => {
      error(e.message);
    });
}
