import m from 'mithril';
import { apiUrl } from 'config';
import { getToken, getUserId } from './auth';
import { error } from './log';

/**
 * Update data of the authenticated user.
 * If a specific token should be used, specify it as the second parameter.
 *
 * @param {Object} options any subset of user properties.
 * @param {string} token API token (optional)
 * @return {Promise} exports for additional response handling
 */
export function update(options, token) {
  return m
    .request({
      method: 'PATCH',
      url: `${apiUrl}/users/${getUserId()}`,
      headers: {
        Authorization: token || getToken(),
        'If-Match': this.user._etag,
      },
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
