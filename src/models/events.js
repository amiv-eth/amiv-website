import m from 'mithril';
import { apiUrl } from './config';
import { getToken, getUserId, isLoggedIn } from './auth';

const lang = 'de';
const date = `${new Date().toISOString().split('.')[0]}Z`;

let querySaved = '';

export function getList() {
  if (typeof this.list === 'undefined') {
    return [];
  }
  return this.list;
}

export function getSelectedEvent() {
  return this.selectedEvent;
}

export function getSignupForSelectedEvent() {
  return this.selectedEventSignup;
}

export function signupForSelectedEventHasLoaded() {
  return this.selectedEventSignupLoaded;
}

export function loadSignupForSelectedEvent() {
  const queryString = m.buildQueryString({
    where: JSON.stringify({
      user: getUserId(),
      event: this.getSelectedEvent()._id,
    }),
  });

  return m.request({
    method: 'GET',
    url: `${apiUrl}/eventsignups?${queryString}`,
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
    } : {},
  }).then((result) => {
    [this.selectedEventSignup] = result._items;
    this.selectedEventSignupLoaded = true;
  });
}

export function _signupUserForSelectedEvent(additionalFieldsString) {
  return m.request({
    method: 'POST',
    url: `${apiUrl}/eventsignups`,
    data: {
      event: this.selectedEvent._id,
      additional_fields: additionalFieldsString,
      user: getUserId(),
    },
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
    } : {},
  }).then(() => { this.loadSignupForSelectedEvent(); });
}

export function _signupEmailForSelectedEvent(additionalFieldsString, email) {
  return m.request({
    method: 'POST',
    url: `${apiUrl}/eventsignups`,
    data: {
      event: this.selectedEvent._id,
      additional_fields: additionalFieldsString,
      email,
    },
    headers: getToken() ? {
      Authorization: `Token ${getToken()}`,
    } : {},
  }).then(() => { this.loadSignupForSelectedEvent(); });
}

export function signupForSelectedEvent(additionalFields, email = '') {
  let additionalFieldsString;
  if (this.selectedEvent.additional_fields === undefined ||
    additionalFields === null || typeof additionalFields !== 'object') {
    additionalFieldsString = undefined;
  } else {
    additionalFieldsString = JSON.stringify(additionalFields);
  }

  if (isLoggedIn()) {
    return this._signupUserForSelectedEvent(additionalFieldsString);
  } else if (this.selectedEvent.allow_email_signup) {
    return this._signupEmailForSelectedEvent(additionalFieldsString, email);
  }
  return Promise.reject(new Error('Signup not allowed'));
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

export function selectEvent(eventId) {
  this.selectedEvent = this.getList().find(item => item._id === eventId);
  if (typeof this.selectedEvent === 'undefined') {
    this.load({
      where: {
        time_advertising_start: { $lte: date },
        time_advertising_end: { $gte: date },
        show_website: true,
      },
      sort: ['-priority', 'time_advertising_start'],
    }).then(() => {
      this.selectedEvent = this.getList().find(item => item._id === eventId);
    });
  }
}

export function reload() {
  return load(querySaved);
}
