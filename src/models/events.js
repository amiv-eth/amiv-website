import { apiUrl } from './config';
import { getToken, getUserId, isLoggedIn } from './auth';
import { log } from './log';

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

export function getCurrentSignup() {
  return this.currentSignup;
}

export function currentSignupHasLoaded() {
  return this.currentSignupLoaded;
}

export function checkCurrentSignup() {
  const queryString = m.buildQueryString({
    where: JSON.stringify({
      user: getUserId(),
      event: this.getCurrent()._id,
    }),
  });

  return m.request({
    method: 'GET',
    url: `${apiUrl}/eventsignups?${queryString}`,
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
    } : {},
  }).then((result) => {
    [this.currentSignup] = result._items;
    this.currentSignupLoaded = true;
  });
}

export function signupCurrent(additionalFields, email = '') {
  let additionalFieldsString;
  if (this.current.additional_fields === undefined ||
    additionalFields === null || typeof additionalFields !== 'object') {
    additionalFieldsString = undefined;
  } else {
    additionalFieldsString = JSON.stringify(additionalFields);
  }

  if (isLoggedIn()) {
    log(`UserId: ${getUserId()}`);
    m.request({
      method: 'POST',
      url: `${apiUrl}/eventsignups`,
      data: {
        event: this.current._id,
        additional_fields: additionalFieldsString,
        user: getUserId(),
      },
      headers: getToken() ? {
        Authorization: `Token ${getToken()}`,
      } : {},
    }).then(() => { this.checkCurrentSignup(); });
  } else if (this.current.allow_email_signup) {
    log(`Email: ${email}`);
    m.request({
      method: 'POST',
      url: `${apiUrl}/eventsignups`,
      data: {
        event: this.current._id,
        additional_fields: additionalFieldsString,
        email,
      },
      headers: getToken() ? {
        Authorization: `Token ${getToken()}`,
      } : {},
    }).then(() => { this.checkCurrentSignup(); });
  }
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
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
    } : {},
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
