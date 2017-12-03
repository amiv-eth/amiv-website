import { apiUrl } from './config';
import { log } from './log';

const m = require('mithril');

const APISession = {
  username: '',
  userId: '',
  token: '',
  etag: '',
  id: '',
  authenticated: false,
  lastChecked: 0,
};

export function getUserId() {
  return APISession.userId;
}

export function getUsername() {
  return APISession.username;
}

export function getToken() {
  return APISession.token;
}

export function isLoggedIn() {
  return APISession.authenticated;
}

function reloadLocalStorage() {
  log('checking stored session');
  if (localStorage.getItem('token') !== null) {
    APISession.token = localStorage.token;
    APISession.id = localStorage.id;
    APISession.username = localStorage.username;
    APISession.userId = localStorage.userId;
    APISession.etag = localStorage.etag;
    APISession.authenticated = true;
  }
}

export function login(username, password) {
  reloadLocalStorage();
  return m.request({
    method: 'POST',
    url: `${apiUrl}/sessions`,
    data: { username, password },
  }).then((result) => {
    const dt = new Date();
    log('logged in!');
    log(result);
    APISession.token = result.token;
    APISession.etag = result._etag;
    APISession.id = result._id;
    APISession.authenticated = true;
    APISession.username = username;
    APISession.userId = result.user;
    localStorage.setItem('token', result.token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', result.user);
    localStorage.setItem('id', result._id);
    localStorage.setItem('etag', result._etag);
    APISession.lastChecked = dt.getTime();
  });
}

export function logout() {
  reloadLocalStorage();
  APISession.authenticated = false;
  return m.request({
    method: 'DELETE',
    url: `${apiUrl}/sessions/${APISession.id}`,
    headers: {
      Authorization: `Token ${APISession.token}`,
      'If-Match': APISession.etag,
    },
  }).then(() => {
    log('logged out!');
    APISession.token = '';
    APISession.authenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('id');
    localStorage.removeItem('etag');
    // m.route.set('/login');
  }).catch(() => {
    APISession.authenticated = false;
    // m.route.set('/login');
  });
}

export function checkLogin() {
  const dt = new Date();
  reloadLocalStorage();
  if (this.authenticated === true) {
    log('no session found');
    m.route.set('/login');
    return new Promise(() => { });
  }
  if (dt.getTime() > this.lastChecked + 5000) {
    return m.request({
      method: 'GET',
      url: `${apiUrl}/sessions/${this.token}`,
    }).then((result) => {
      const dt2 = new Date();
      log('session is still valid!');
      this.authenticated = true;
      this.etag = result._etag;
      this.lastChecked = dt2.getTime();
    }).catch((e) => {
      log('token is not valid');
      log(e);
      this.authenticated = false;
      localStorage.removeItem('session');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('id');
      localStorage.removeItem('etag');
      m.route.set('/login');
    });
  }
  return new Promise(() => { });
}
