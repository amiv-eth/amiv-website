import m from 'mithril';
import { apiUrl, OAuthId } from 'config';
import { log } from './log';

let session = {};

// Generate a random string of the given length
function randomString(length) {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
  const random = window.crypto.getRandomValues(new Uint8Array(length));
  const result = [];
  random.forEach(c => {
    result.push(charset[c % charset.length]);
  });
  return result.join('');
}

/**
 * Get the `userId` of the authenticated user.
 *
 * @return {String} user id
 */
export function getUserId() {
  return session.userId || '';
}

/**
 * Get the `API token` of the authenticated user.
 *
 * @return {String} API token
 */
export function getToken() {
  return session.token || '';
}

function saveSession() {
  localStorage.setItem('session', JSON.stringify(session));
}

function loadSession() {
  session = JSON.parse(localStorage.getItem('session') || '{}');
  session.lastChecked = 0;
}

/**
 * Check if authentication data is available.
 * @return {Boolean} `true` if authentication data is available
 */
export function isLoggedIn() {
  return session.token !== undefined;
}

/**
 * Redirect to OAuth2 landing page
 */
export function login() {
  session = {
    // Generate random state and reset currently stored session data
    state: randomString(32),
    lastChecked: 0,
  };
  saveSession();

  const query = m.buildQueryString({
    response_type: 'token',
    client_id: OAuthId,
    redirect_uri: window.location.origin,
    state: session.state,
  });

  // Redirect to AMIV API OAuth2 page
  window.location.href = `${apiUrl}/oauth?${query}`;
}

/**
 * Revoke current authentication.
 *
 * @return {Promise} exports for additional response handling
 */
export async function logout() {
  await m.request({
    method: 'DELETE',
    url: `${apiUrl}/sessions/${session.id}`,
    headers: {
      Authorization: session.token,
      'If-Match': session.etag,
    },
  });
  session = {};
  saveSession();
  log('Logged out!');
}

/**
 * Check if the stored authentication data is still valid.
 *
 * @return {Promise} exports for additional response handling
 */
export async function checkLogin() {
  const dt = new Date();
  loadSession();
  if (session.token === undefined) {
    // check of OAuth parameters
    // Extract token from query string automatically if state matches
    const params = m.parseQueryString(window.location.search);
    if (params.state && params.access_token && params.state === session.state) {
      try {
        const response = await m.request({
          method: 'GET',
          url: `${apiUrl}/sessions?where={"token":"${params.access_token}"}`,
          headers: {
            Authorization: params.access_token,
          },
        });
        if (response._items.length === 1) {
          const dt2 = new Date();
          session = {
            userId: response._items[0].user,
            token: params.access_token,
            etag: response._items[0]._etag,
            id: response._items[0]._id,
            state: undefined,
            lastChecked: dt2.getTime(),
          };
          saveSession();
          log('User logged in!');
        } else {
          throw new Error({ _error: { code: 500 } });
        }
      } catch ({ _error: { code } }) {
        session = {};
        saveSession();
        log(`Login failed! (Code: ${code})`);
      }
    }
  } else if (dt.getTime() > session.lastChecked + 5000) {
    try {
      await m.request({
        method: 'GET',
        url: `${apiUrl}/sessions/${session.id}`,
        headers: {
          Authorization: session.token,
        },
      });
      log('session is still valid!');
      const dt2 = new Date();
      session.lastChecked = dt2.getTime();
    } catch (err) {
      log('session is not valid');
      session = {};
      saveSession();
    }
  }
}
