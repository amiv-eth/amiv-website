import { apiUrl } from './config';
import { log } from './log';
import { getToken } from './auth';

const m = require('mithril');

let querySaved = {};


export function getList() {
  if (typeof this.list === 'undefined') {
    return [];
  }
  return this.list;
}

export function load(query = {}) {
  querySaved = query;
  log('hallo');
  const queryEncoded = m.buildQueryString(JSON.stringify(query));

  return m.request({
    method: 'GET',
    url: `${apiUrl}/studydocuments?${queryEncoded}`,
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((result) => {
    this.list = result._items;
  });
}

export function reload() {
  return load(querySaved);
}