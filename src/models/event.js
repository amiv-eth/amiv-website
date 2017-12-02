import { apiUrl } from './config';
import { getToken } from './auth';

const m = require('mithril');

const lang = 'de';

let querySaved = '';

export function getList() {
  if (typeof this.list === 'undefined') {
    return [];
  }
  return this.list;
}

export function load(query = {}) {
  querySaved = query;

  // Parse query such that the backend understands it
  const parsedQuery = {};
  Object.keys(query).forEach((key) => {
    parsedQuery[key] = (key === 'sort') ? query[key] : JSON.stringify(query[key]);
  });
  const queryString = m.buildQueryString(parsedQuery);

  return m.request({
    method: 'GET',
    url: `${apiUrl}/events?${queryString}`,
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((result) => {
    this.list = result._items.map((event) => {
      const newEvent = Object.assign({}, event);
      newEvent.title = newEvent[`title_${lang}`];
      newEvent.description = newEvent[`description_${lang}`];
      return newEvent;
    });
  });
}

export function reload() {
  return load(querySaved);
}
