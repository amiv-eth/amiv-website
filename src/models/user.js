import { apiUrl } from './config';
import { getToken, getUserId } from './auth';
import { log, error } from './log';

const m = require('mithril');

// update data of logged in user
export function update(options) {
  log(this.user._etag);

  return m.request({
    method: 'PATCH',
    url: `${apiUrl}/users/${getUserId()}`,
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
      'If-Match': this.user._etag,
    } : { 'If-Match': this.user._etag },
    data: options,
  }).then((result) => {
    this.user = result;
  }).catch((e) => {
    error(e.message);
  });
}

// get available data of logged in user
export function get() {
  if (typeof this.user === 'undefined') {
    return {};
  }
  return this.user;
}

// load information of logged in user
export function load() {
  return m.request({
    method: 'GET',
    url: `${apiUrl}/users/${getUserId()}`,
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
    } : {},
  }).then((result) => {
    this.user = result;
  }).catch((e) => {
    error(e.message);
  });
}
