import m from 'mithril';
import { apiUrl } from 'config';
import { getToken, getUserId } from './auth';
import { error } from './log';

/**
 * User class
 *
 * Managing data of authenticated user.
 */
export default class UserController {
  constructor() {
    this.sessionCount = 0;
  }

  /**
   * Load user data of the authenticated user from the AMIV API.
   *
   * @return {Promise} exports for additional response handling
   */
  async load() {
    try {
      const promiseList = [];
      promiseList.push(
        m
          .request({
            method: 'GET',
            url: `${apiUrl}/users/${getUserId()}`,
            headers: {
              Authorization: getToken(),
            },
          })
          .then(result => {
            this.user = result;
          })
      );
      promiseList.push(this._loadSessionPage(1));
      await Promise.all(promiseList);
    } catch (err) {
      error(err.message);
    }
  }

  /**
   * Get available user data of the authenticated user.
   *
   * @return {Object} `user` object returned by the AMIV API.
   */
  get() {
    if (typeof this.user === 'undefined') {
      return {};
    }
    return this.user;
  }

  /**
   * Get total number of active sessions for the authenticated user.
   *
   * @return {int} number of sessions
   */
  getSessionCount() {
    return this.sessionCount;
  }

  /**
   * Update data of the authenticated user.
   * If a specific token should be used, specify it as the second parameter.
   *
   * @param {Object} options any subset of user properties.
   * @param {string} token API token (optional)
   * @return {Promise} exports for additional response handling
   */
  update(options, token) {
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
   * Terminates all other active sessions of the authenticated user.
   */
  async clearOtherSessions() {
    const sessions = [];
    const totalPages = Math.ceil(this.sessionCount / 20);
    let promiseList = [];
    let currentPage = 1;
    // Load all sessions
    while (currentPage <= totalPages) {
      promiseList.push(
        this._loadSessionPage(currentPage).then(result => {
          sessions.push(...result);
        })
      );
      currentPage += 1;
    }
    await Promise.all(promiseList);

    // Delete all sessions (except the currently used one)
    promiseList = [];
    sessions.forEach(session => {
      if (session.token !== getToken()) {
        promiseList.push(this.constructor._deleteSession(session));
      }
    });
    await Promise.all(promiseList);
    this.sessionCount = 1;
  }

  // helper function to load session page
  async _loadSessionPage(pageNum) {
    const response = await m.request({
      method: 'GET',
      url: `${apiUrl}/sessions?where={"user":"${getUserId()}"}&max_results=20&page=${pageNum}`,
      headers: {
        Authorization: getToken(),
      },
    });
    this.sessionCount = response._meta.total;
    return response._items;
  }

  // helper function to delete a session
  static async _deleteSession(session) {
    return m.request({
      method: 'DELETE',
      url: `${apiUrl}/sessions/${session._id}`,
      headers: {
        Authorization: getToken(),
        'If-Match': session._etag,
      },
    });
  }
}
