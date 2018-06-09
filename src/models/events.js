import m from 'mithril';
import { apiUrl } from 'config';
import { getToken, getUserId, isLoggedIn } from './auth';
import { currentLanguage } from './language';
import PaginationController from './pagination';

/**
 * Event class
 */
export class Event {
  /**
   * Constructor
   *
   * @param {object} event object loaded from the API
   */
  constructor(event) {
    // Expose all properties of `event`
    Object.keys(event).forEach(key => {
      this[key] = event[key];
    });
  }

  /**
   * Load the signup data of the authenticated user.
   *
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
   *
   * @return {Boolean}
   */
  get hasSignupDataLoaded() {
    return this.signupLoaded;
  }

  /**
   * Get signup data of the authenticated user.
   *
   * @return {object} signup data
   */
  get signupData() {
    return this._signup;
  }

  /**
   * Sign off the authenticated user from this event.
   *
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
   *
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

/**
 * EventListController class (inherited from `PaginationController`)
 *
 * Used to handle a list of a specific type of event (e.g. all past events)
 */
export class EventListController extends PaginationController {
  constructor(query = {}, additionalQuery = {}) {
    super('events', query, additionalQuery);
  }

  async _loadData(query) {
    const items = await super._loadData(query);
    return items.map(event => {
      const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
      const newEvent = Object.assign({}, event);
      newEvent.title = newEvent[`title_${currentLanguage()}`] || newEvent[`title_${otherLanguage}`];
      newEvent.description =
        newEvent[`description_${currentLanguage()}`] || newEvent[`description_${otherLanguage}`];
      return new Event(newEvent);
    });
  }
}

/**
 * EventController class
 *
 * Managing multiple type of event lists and handling of the currently selected event.
 */
export class EventController {
  /**
   * Constructor
   *
   * @param {object} query initial query
   * @param {boolean} upcomingSkipRegistrationOpen if `true`, skip all events with open registration in upcoming event list
   */
  constructor(query = {}, upcomingSkipRegistrationOpen = false) {
    this.query = query;

    this._pastEvents = new EventListController(query, () => {
      const date = `${new Date().toISOString().split('.')[0]}Z`;
      return {
        where: {
          time_advertising_end: { $lt: date },
          $and: [
            { $or: [{ time_start: null }, { time_start: { $lt: date } }] },
            { $or: [{ time_end: null }, { time_end: { $lt: date } }] },
          ],
        },
      };
    });

    let upcomingAdditionalQuery;
    if (upcomingSkipRegistrationOpen) {
      upcomingAdditionalQuery = () => {
        const date = `${new Date().toISOString().split('.')[0]}Z`;
        return {
          where: {
            show_website: true,
            time_start: { $gt: date },
            time_advertising_start: { $lt: date },
            $or: [{ time_register_end: { $lt: date } }, { time_register_start: { $gt: date } }],
          },
        };
      };
    } else {
      upcomingAdditionalQuery = () => {
        const date = `${new Date().toISOString().split('.')[0]}Z`;
        return {
          where: {
            show_website: true,
            time_start: { $gt: date },
            time_advertising_start: { $lt: date },
          },
        };
      };
    }
    this._upcomingEvents = new EventListController(query, upcomingAdditionalQuery);

    this._openRegistrationEvents = new EventListController(query, () => {
      const date = `${new Date().toISOString().split('.')[0]}Z`;
      return {
        where: {
          show_website: true,
          time_register_start: { $lt: date },
          time_register_end: { $gt: date },
        },
      };
    });
  }

  /** Set a new query used by all EventListController to load events */
  async setQuery(query) {
    const newQuery = JSON.stringify(query || {});
    const oldQuery = JSON.stringify(this.query);

    if (newQuery === oldQuery) return false;

    this.query = JSON.parse(newQuery);
    this.openRegistrationEvents.setQuery(this.query);
    this.upcomingEvents.setQuery(this.query);
    this.pastEvents.setQuery(this.query);
    await this.refresh();
    return true;
  }

  /** Refresh all event data */
  async refresh() {
    await this.openRegistrationEvents.loadAll();
    await this.upcomingEvents.loadAll();
    await this.pastEvents.loadPageData(1);
  }

  /** Get EventListController for all events with open registration window */
  get openRegistrationEvents() {
    return this._openRegistrationEvents;
  }

  /** Get EventListController for all upcoming events */
  get upcomingEvents() {
    return this._upcomingEvents;
  }

  /** Get EventListController for all past events */
  get pastEvents() {
    return this._pastEvents;
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
    if (!event.show_website) {
      throw new Error('Event not found');
    }
    event.title = event[`title_${currentLanguage()}`] || event[`title_${otherLanguage}`];
    event.description =
      event[`description_${currentLanguage()}`] || event[`description_${otherLanguage}`];
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
