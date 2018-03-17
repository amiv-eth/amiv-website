import m from 'mithril';
import { apiUrl } from './config';
import { log } from './log';

const APISession = {
  username: '',
  userId: '',
  token: '',
  etag: '',
  id: '',
  authenticated: false,
  lastChecked: 0,
};

/**
 * Get the `userId` of the authenticated user.
 *
 * @return {String} user id
 */
export function getUserId() {
  return APISession.userId;
}

/**
 * Get the `username` of the authenticated user.
 *
 * @return {String} username
 */
export function getUsername() {
  return APISession.username;
}

/**
 * Get the `api token` of the authenticated user.
 *
 * @return {String} api token
 */
export function getToken() {
  return APISession.token;
}

function reloadLocalStorage() {
  if (localStorage.getItem('token') !== null) {
    APISession.token = localStorage.getItem('token');
    APISession.id = localStorage.getItem('id');
    APISession.username = localStorage.getItem('username');
    APISession.userId = localStorage.getItem('userId');
    APISession.etag = localStorage.getItem('etag');
    APISession.lastChecked = 0;
    APISession.authenticated = true;
  }
}

/**
 * Authenticate a user.
 *
 * @param {String} username user to be authenticated
 * @param {String} password password to be used
 * @return {Promise} exports for additional response handling
 */
export function login(username, password) {
  reloadLocalStorage();
  return m
    .request({
      method: 'POST',
      url: `${apiUrl}/sessions`,
      data: { username, password },
    })
    .then(result => {
      const dt = new Date();
      log('logged in!');
      log(result);
      APISession.token = result.token;
      APISession.etag = result._etag;
      APISession.id = result._id;
      APISession.authenticated = true;
      APISession.username = username;
      APISession.userId = result.user;
      log(APISession.username);
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', result.user);
      localStorage.setItem('id', result._id);
      localStorage.setItem('etag', result._etag);
      APISession.lastChecked = dt.getTime();
    });
}

/**
 * Revoke current authentication.
 *
 * @return {Promise} exports for additional response handling
 */
export function logout() {
  reloadLocalStorage();
  return m
    .request({
      method: 'DELETE',
      url: `${apiUrl}/sessions/${APISession.id}`,
      headers: {
        Authorization: `Token ${APISession.token}`,
        'If-Match': APISession.etag,
      },
    })
    .then(() => {
      log('logged out!');
      APISession.token = '';
      APISession.authenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('id');
      localStorage.removeItem('etag');
      // m.route.set('/login');
    })
    .catch(() => {
      APISession.authenticated = false;
      // m.route.set('/login');
    });
}

/**
 * Check if the stored authentication data is still valid.
 *
 * @return {Promise} exports for additional response handling
 */
export function checkLogin() {
  const dt = new Date();
  reloadLocalStorage();
  if (APISession.authenticated === false) {
    return new Promise(() => {});
  } else if (dt.getTime() > APISession.lastChecked + 5000) {
    return m
      .request({
        method: 'GET',
        url: `${apiUrl}/sessions/${APISession.id}`,
        headers: {
          Authorization: `Token ${APISession.token}`,
        },
      })
      .then(result => {
        const dt2 = new Date();
        log('session is still valid!');
        APISession.authenticated = true;
        APISession.etag = result._etag;
        APISession.lastChecked = dt2.getTime();
      })
      .catch(e => {
        log('session is not valid');
        log(e);
        APISession.authenticated = false;
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('id');
        localStorage.removeItem('etag');
        localStorage.removeItem('token');
      });
  }
  return new Promise(() => {});
}

/**
 * Check if authentication data is available.
 * @return {Boolean} `true` if authentication data is available
 */
export function isLoggedIn() {
  log(`UserId: ${APISession.userId}`);
  return APISession.authenticated;
}
