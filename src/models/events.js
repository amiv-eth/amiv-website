import m from 'mithril';
import Stream from 'mithril/stream';
import { apiUrl } from 'config';
import { getToken, getUserId, isLoggedIn } from './auth';
import { currentLanguage } from './language';

/**
 * Event class
 */
export class Event {
  constructor(event) {
    // Expose all properties of `event`
    Object.keys(event).forEach(key => {
      this[key] = event[key];
    });
  }

  /**
   * Load the signup data of the authenticated user.
   * @return {Promise}
   */
  async loadSignup() {
    if (!isLoggedIn()) return undefined;

    const queryString = m.buildQueryString({
      where: JSON.stringify({
        user: getUserId(),
        event: this.getSelectedEvent()._id,
      }),
    });

    const response = await m.request({
      method: 'GET',
      url: `${apiUrl}/eventsignups?${queryString}`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (response._items.length === 1) {
      [this.signup] = response._items;
    } else {
      this.signup = undefined;
    }
    this.signupLoaded = true;
    return this.signup;
  }

  /**
   * Checks if the signup data has been loaded.
   * @return {Boolean}
   */
  hasSignupLoaded() {
    return this.signupLoaded;
  }

  /**
   * Get signup data of the authenticated user.
   */
  getSignup() {
    return this.signup;
  }

  /**
   * Sign off the authenticated user from this event.
   * @return {Promise}
   */
  async signoff() {
    if (!this.signup) return;

    await m.request({
      method: 'DELETE',
      url: `${apiUrl}/eventsignups/${this.signup._id}`,
      headers: {
        Authorization: getToken(),
        'If-Match': this.signup._etag,
      },
    });
    this.signup = undefined;
  }

  /**
   * Sign up the authenticated user for this event.
   * @param {*} additionalFields
   * @param {string} email email address (required if not logged in!)
   * @return {Promise}
   */
  async signup(additionalFields, email = '') {
    let additionalFieldsString = '';
    if (this.selectedEvent.additional_fields) {
      additionalFieldsString = JSON.stringify(additionalFields);
    }

    if (this.signup) {
      this._updateSignup(additionalFieldsString);
    }
    this._createSignup(additionalFieldsString, email);
  }

  async _createSignup(additionalFieldsString, email = '') {
    const data = {
      event: this._id,
      additional_fields: additionalFieldsString,
    };

    if (isLoggedIn()) {
      data.user = getUserId();
    } else if (this.allow_email_signup) {
      data.email = email;
    } else {
      throw new Error('Signup not allowed');
    }

    this.signup = await m.request({
      method: 'POST',
      url: `${apiUrl}/eventsignups`,
      data,
      headers: {
        Authorization: getToken(),
      },
    });
  }

  async _updateSignup(additionalFieldsString) {
    this.signup = await m.request({
      method: 'PATCH',
      url: `${apiUrl}/eventsignups/${this.signup._id}`,
      data: {
        additional_fields: additionalFieldsString,
      },
      headers: {
        Authorization: getToken(),
        'If-Match': this.signup._etag,
      },
    });
  }
}

export class EventController {
  constructor(query = {}) {
    this.query = query || {};
    // state pointer that is counted up every time the table is refreshed so
    // we can tell infinite scroll that the data-version has changed.
    this.stateCounter = Stream(0);
  }

  refresh() {
    this.stateCounter(this.stateCounter() + 1);
  }

  infiniteScrollParams(item) {
    return {
      item,
      pageData: pageNum => this.getPageData(pageNum),
      pageKey: pageNum => `${pageNum}-${this.stateCounter()}`,
    };
  }

  async getPageData(pageNum) {
    // for some reason this is called before the object is instantiated.
    // check this and return nothing
    const query = Object.assign({}, this.query);
    query.max_results = 10;
    query.page = pageNum;

    // Parse query such that the backend understands it
    const parsedQuery = {};
    Object.keys(query).forEach(key => {
      parsedQuery[key] = key === 'sort' ? query[key] : JSON.stringify(query[key]);
    });
    const queryString = m.buildQueryString(parsedQuery);

    const response = await m.request({
      method: 'GET',
      url: `${apiUrl}/events?${queryString}`,
      headers: {
        Authorization: getToken(),
      },
    });
    return response._items.map(event => {
      const newEvent = Object.assign({}, event);
      newEvent.title = newEvent[`title_${currentLanguage()}`];
      newEvent.description = newEvent[`description_${currentLanguage()}`];
      return Event(newEvent);
    });
  }

  setQuery(query) {
    this.query = query;
    this.refresh();
  }

  /**
   * Load a specific event
   * @param {String} eventId
   */
  static async loadEvent(eventId) {
    const event = await m.request({
      method: 'GET',
      url: `${apiUrl}/events/${eventId}`,
      headers: {
        Authorization: getToken(),
      },
    });
    event.title = event[`title_${currentLanguage()}`];
    event.description = event[`description_${currentLanguage()}`];
    return Event(event);
  }
}
