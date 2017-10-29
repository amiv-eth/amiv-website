const m = require('mithril');
const Config = require('./config');
const log = require('./log');

const auth = {
  username: '',
  token: '',
  etag: '',
  error: '',
  id: '',
  authenticated: false,
  lastChecked: 0,
  login(username, password) {
    this.reloadLocalStorage();
    return m.request({
      method: 'POST',
      url: `${Config.api_url}/sessions`,
      data: { username, password },
    }).then((result) => {
      const dt = new Date();
      log.log('logged in!');
      this.token = result.token;
      this.etag = result._etag;
      this.id = result._id;
      this.authenticated = true;
      this.username = username;
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', username);
      localStorage.setItem('id', result._id);
      localStorage.setItem('etag', result._etag);
      this.lastChecked = dt.getTime();
      m.route.set('/');
    }).catch((e) => {
      this.error = e.message;
    });
  },
  logout() {
    this.reloadLocalStorage();
    this.authenticated = false;
    return m.request({
      method: 'DELETE',
      url: `${Config.api_url}/sessions/${this.id}`,
      headers: {
        Authorization: `Token ${this.token}`,
        'If-Match': this.etag,
      },
    }).then(() => {
      log.log('logged out!');
      this.token = '';
      this.authenticated = false;
      this.error = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('etag');
      m.route.set('/login');
    }).catch((e) => {
      this.error = e.message;
      this.authenticated = false;
      m.route.set('/login');
    });
  },
  checkLogin() {
    const dt = new Date();
    auth.reloadLocalStorage();
    if (this.authenticated === true) {
      log.log('no session found');
      m.route.set('/login');
      return new Promise(() => { });
    }
    if (dt.getTime() > this.lastChecked + 5000) {
      return m.request({
        method: 'GET',
        url: `${Config.api_url}/sessions/${this.token}`,
      }).then((result) => {
        const dt2 = new Date();
        log.log('session is still valid!');
        this.authenticated = true;
        this.etag = result._etag;
        this.lastChecked = dt2.getTime();
      }).catch((e) => {
        log.log('token is not valid');
        log.log(e);
        this.authenticated = false;
        localStorage.removeItem('session');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('etag');
        m.route.set('/login');
      });
    }
    return new Promise(() => { });
  },
  reloadLocalStorage() {
    log.log('checking stored session');
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.token;
      this.id = localStorage.id;
      this.username = localStorage.username;
      this.etag = localStorage.etag;
      this.authenticated = true;
    }
  },
};

module.exports = auth;
