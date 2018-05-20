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
        event: this._id,
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
      [this._signup] = response._items;
    } else {
      this._signup = undefined;
    }
    this.signupLoaded = true;
    return this._signup;
  }

  /**
   * Checks if the signup data has been loaded.
   * @return {Boolean}
   */
  get hasSignupDataLoaded() {
    return this.signupLoaded;
  }

  /**
   * Get signup data of the authenticated user.
   * @return {object} signup data
   */
  get signupData() {
    return this._signup;
  }

  /**
   * Sign off the authenticated user from this event.
   * @return {Promise}
   */
  async signoff() {
    if (!this._signup) return;

    await m.request({
      method: 'DELETE',
      url: `${apiUrl}/eventsignups/${this._signup._id}`,
      headers: {
        Authorization: getToken(),
        'If-Match': this._signup._etag,
      },
    });
    this._signup = undefined;
  }

  /**
   * Sign up the authenticated user for this event.
   * @param {*} additionalFields
   * @param {string} email email address (required if not logged in!)
   * @return {Promise}
   */
  async signup(additionalFields, email = '') {
    let additionalFieldsString;
    if (this.additional_fields) {
      additionalFieldsString = JSON.stringify(additionalFields);
    }

    if (this._signup) {
      return this._updateSignup(additionalFieldsString);
    }
    return this._createSignup(additionalFieldsString, email);
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

    this._signup = await m.request({
      method: 'POST',
      url: `${apiUrl}/eventsignups`,
      data,
      headers: {
        Authorization: getToken(),
      },
    });
    return this._signup;
  }

  async _updateSignup(additionalFieldsString) {
    this._signup = await m.request({
      method: 'PATCH',
      url: `${apiUrl}/eventsignups/${this._signup._id}`,
      data: {
        additional_fields: additionalFieldsString,
      },
      headers: {
        Authorization: getToken(),
        'If-Match': this._signup._etag,
      },
    });
    return this._signup;
  }
}

export class EventController {
  constructor(query = {}) {
    this.query = query || {};
    // state pointer that is counted up every time the table is refreshed so
    // we can tell infinite scroll that the data-version has changed.
    this._stateCounter = Stream(0);
  }

  get stateCounter() {
    return this._stateCounter();
  }

  refresh() {
    this._stateCounter(this.stateCounter + 1);
  }

  infiniteScrollParams(item, before) {
    const date = `${new Date().toISOString().split('.')[0]}Z`;
    return {
      item,
      before,
      pageData: pageNum =>
        this.getPageData(pageNum, {
          where: {
            time_advertising_end: { $lt: date },
            $and: [
              { $or: [{ time_start: null }, { time_start: { $lt: date } }] },
              { $or: [{ time_end: null }, { time_end: { $lt: date } }] },
            ],
          },
        }),
      pageKey: pageNum => `${pageNum}-${this.stateCounter}`,
    };
  }

  /**
   * Get page data according to saved query
   * @param {number} pageNum
   */
  async getPageData(pageNum, additionalQuery = {}) {
    const date = `${new Date().toISOString().split('.')[0]}Z`;
    // for some reason this is called before the object is instantiated.
    const query = Object.assign({}, this.query, additionalQuery);
    query.where = query.where || {};
    query.where.show_website = true;
    query.where.time_advertising_start = { $lt: date };
    query.max_results = query.max_results || 10;
    query.page = pageNum;

    return EventController._getData(query);
  }

  /**
   * Get all events with their registration open
   */
  async getWithOpenRegistration() {
    const date = `${new Date().toISOString().split('.')[0]}Z`;
    // for some reason this is called before the object is instantiated.
    const query = Object.assign({}, this.query);
    query.where = query.where || {};
    query.where.show_website = true;
    query.where.time_register_start = { $lt: date };
    query.where.time_register_end = { $gt: date };

    return EventController._getData(query);
  }

  /**
   * Get all upcoming events
   * @param {Boolean} skipRegistrationOpen skip events which have their registration open
   */
  async getUpcoming(skipRegistrationOpen = false) {
    const date = `${new Date().toISOString().split('.')[0]}Z`;
    // for some reason this is called before the object is instantiated.
    const query = Object.assign({}, this.query);
    query.where = query.where || {};
    query.where.show_website = true;
    if (!skipRegistrationOpen) {
      query.where.time_start = { $gt: date };
      query.where.time_advertising_end = { $gt: date };
    } else {
      query.where.time_start = { $gt: date };
      query.where.time_advertising_end = { $gt: date };
      query.where.$or = [
        { time_register_end: { $lt: date } },
        { time_register_start: { $gt: date } },
      ];
    }
    query.where.time_advertising_start = { $lt: date };

    return EventController._getData(query);
  }

  static async _getData(query) {
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
      const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
      const newEvent = Object.assign({}, event);
      newEvent.title = newEvent[`title_${currentLanguage()}`] || newEvent[`title_${otherLanguage}`];
      newEvent.description =
        newEvent[`description_${currentLanguage()}`] || newEvent[`description_${otherLanguage}`];
      return new Event(newEvent);
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
  async loadEvent(eventId) {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
    const event = await m.request({
      method: 'GET',
      url: `${apiUrl}/events/${eventId}`,
      headers: {
        Authorization: getToken(),
      },
    });
    event.title = event[`title_${currentLanguage()}`] || event[`title_${otherLanguage}`];
    event.description =
      event[`description_${currentLanguage()}`] || event[`description_${otherLanguage}`];
    if (!event.show_website) {
      throw new Error('Event not found');
    }
    this._selectedEvent = new Event(event);
    return this._selectedEvent;
  }

  /**
   * Get the previously loaded event
   */
  get selectedEvent() {
    return this._selectedEvent;
  }
}
