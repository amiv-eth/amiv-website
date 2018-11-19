import m from 'mithril';
import { apiUrl } from 'config';
import { getToken, getUserId, isLoggedIn } from '../auth';
import { currentLanguage } from '../language';

/**
 * Event class
 *
 * Wrapper for the event object received from the API with additional functions.
 */
export default class Event {
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

  getTitle() {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
    return this[`title_${currentLanguage()}`] || this[`title_${otherLanguage}`];
  }

  getCatchphrase() {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
    return this[`catchphrase_${currentLanguage()}`] || this[`catchphrase_${otherLanguage}`];
  }

  getDescription() {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
    return this[`description_${currentLanguage()}`] || this[`description_${otherLanguage}`];
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
    this.signupLoaded = false;
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
