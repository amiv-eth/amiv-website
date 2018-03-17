import m from 'mithril';
import { apiUrl } from './config';
import { getToken, getUserId, isLoggedIn } from './auth';

const lang = 'de';
const date = `${new Date().toISOString().split('.')[0]}Z`;

let querySaved = '';

/**
 * Get the loaded list of events.
 *
 * @return {array}
 */
export function getList() {
  if (typeof this.list === 'undefined') {
    return [];
  }
  return this.list;
}

/**
 * Get the selected event.
 *
 * @return {Object} `event` object returned by the AMIV API.
 */
export function getSelectedEvent() {
  return this.selectedEvent;
}

/**
 * Get signup data for the selected event and the authenticated user.
 *
 * @return {Object} `eventsignup` object returned by the AMIV API.
 */
export function getSignupForSelectedEvent() {
  return this.selectedEventSignup;
}

/**
 * Check if signup data of the authenticated user for the selected event have been loaded.
 *
 * @return {Boolean}
 */
export function signupForSelectedEventHasLoaded() {
  return this.selectedEventSignupLoaded;
}

/**
 * Load signup data of the authenticated user for the selected event.
 * @return {Promise} exports for additional response handling
 */
export function loadSignupForSelectedEvent() {
  const queryString = m.buildQueryString({
    where: JSON.stringify({
      user: getUserId(),
      event: this.getSelectedEvent()._id,
    }),
  });

  return m
    .request({
      method: 'GET',
      url: `${apiUrl}/eventsignups?${queryString}`,
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(result => {
      [this.selectedEventSignup] = result._items;
      this.selectedEventSignupLoaded = true;
    });
}

export function _signupUserForSelectedEvent(additionalFieldsString) {
  if (typeof this.selectedEventSignup !== 'undefined') {
    return m
      .request({
        method: 'PATCH',
        url: `${apiUrl}/eventsignups/${this.selectedEventSignup._id}`,
        data: {
          additional_fields: additionalFieldsString,
        },
        headers: getToken()
          ? {
              Authorization: `Token ${getToken()}`,
              'If-Match': this.selectedEventSignup._etag,
            }
          : { 'If-Match': this.selectedEventSignup._etag },
      })
      .then(() => {
        this.loadSignupForSelectedEvent();
      });
  }

  return m
    .request({
      method: 'POST',
      url: `${apiUrl}/eventsignups`,
      data: {
        event: this.selectedEvent._id,
        additional_fields: additionalFieldsString,
        user: getUserId(),
      },
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(() => {
      this.loadSignupForSelectedEvent();
    });
}

export function _signupEmailForSelectedEvent(additionalFieldsString, email) {
  return m
    .request({
      method: 'POST',
      url: `${apiUrl}/eventsignups`,
      data: {
        event: this.selectedEvent._id,
        additional_fields: additionalFieldsString,
        email,
      },
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(() => {
      this.loadSignupForSelectedEvent();
    });
}

/**
 * Sign up the authenticated user for the selected event.
 *
 * @return {Promise} exports for additional response handling
 */
export function signupForSelectedEvent(additionalFields, email = '') {
  let additionalFieldsString;
  if (
    this.selectedEvent.additional_fields === undefined ||
    additionalFields === null ||
    typeof additionalFields !== 'object'
  ) {
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

/**
 * Sign off the authenticated user from the selected event.
 *
 * @return {Promise} exports for additional response handling
 */
export function signoffForSelectedEvent() {
  if (isLoggedIn() && typeof this.selectedEventSignup !== 'undefined') {
    m
      .request({
        method: 'DELETE',
        url: `${apiUrl}/eventsignups/${this.selectedEventSignup._id}`,
        headers: getToken()
          ? {
              Authorization: `Token ${getToken()}`,
              'If-Match': this.selectedEventSignup._etag,
            }
          : { 'If-Match': this.selectedEventSignup._etag },
      })
      .then(() => {
        this.loadSignupForSelectedEvent();
      });
  }
}

/**
 * Load events from the AMIV API
 *
 * @param {*} query filter and sort query for the API request.
 * @return {Promise} exports for additional response handling
 */
export function load(query = {}) {
  querySaved = query;

  // Parse query such that the backend understands it
  const parsedQuery = {};
  Object.keys(query).forEach(key => {
    parsedQuery[key] = key === 'sort' ? query[key] : JSON.stringify(query[key]);
  });
  const queryString = m.buildQueryString(parsedQuery);

  return m
    .request({
      method: 'GET',
      url: `${apiUrl}/events?${queryString}`,
      headers: getToken()
        ? {
            Authorization: `Token ${getToken()}`,
          }
        : {},
    })
    .then(result => {
      this.list = result._items.map(event => {
        const newEvent = Object.assign({}, event);
        newEvent.title = newEvent[`title_${lang}`];
        newEvent.description = newEvent[`description_${lang}`];
        return newEvent;
      });
    });
}

/**
 * Select an event from the event list.
 *
 * @param {String} eventId event id from AMIV API
 */
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

/**
 * Reload event list with the same query as before.
 *
 * @return {Promise} exports for additional response handling
 */
export function reload() {
  return load(querySaved);
}
