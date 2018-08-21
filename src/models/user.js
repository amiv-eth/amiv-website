import m from 'mithril';
import { apiUrl } from 'config';
import { getToken, getUserId } from './auth';
import { error } from './log';

let user;

/**
 * User class
 *
 * Managing data of authenticated user.
 */
export default class User {
  /**
   * Load user data of the authenticated user from the AMIV API.
   *
   * @return {Promise} exports for additional response handling
   */
  static async load() {
    try {
      user = await m.request({
        method: 'GET',
        url: `${apiUrl}/users/${getUserId()}`,
        headers: getToken()
          ? {
              Authorization: `Token ${getToken()}`,
            }
          : {},
      });
    } catch (err) {
      error(err.message);
    }
  }

  /**
   * Get available user data of the authenticated user.
   *
   * @return {Object} `user` object returned by the AMIV API.
   */
  static get() {
    if (typeof user === 'undefined') {
      return {};
    }
    return user;
  }

  /**
   * Update data of the authenticated user.
   * If a specific token should be used, specify it as the second parameter.
   *
   * @param {Object} options any subset of user properties.
   * @param {string} token API token (optional)
   * @return {Promise} exports for additional response handling
   */
  static update(options, token) {
    return m
      .request({
        method: 'PATCH',
        url: `${apiUrl}/users/${getUserId()}`,
        headers: {
          Authorization: token || getToken(),
          'If-Match': user._etag,
        },
        data: options,
      })
      .then(result => {
        user = result;
      })
      .catch(e => {
        error(e.message);
      });
  }
}
