import { apiUrl } from './config';
import { getToken } from './auth';

const m = require('mithril');

const lang = 'de';
const date = `${new Date().toISOString().split('.')[0]}Z`;

let querySaved = '';

export function getList() {
  if (typeof this.list === 'undefined') {
    return [];
  }
  return this.list;
}

export function getCurrent() {
  return this.current;
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

export function loadCurrent(eventId) {
  this.current = this.getList().find(item => item._id === eventId);
  if (typeof this.current === 'undefined') {
    this.load({
      where: {
        time_advertising_start: { $lte: date },
        time_advertising_end: { $gte: date },
        show_website: true,
      },
      sort: ['-priority', 'time_advertising_start'],
    }).then(() => {
      this.current = this.getList().find(item => item._id === eventId);
    });
  }
}

export function reload() {
  return load(querySaved);
}
