import { currentLanguage } from '../language';

/**
 * Joboffer class
 *
 * Wrapper for the event object received from the API with additional functions.
 */
export default class Joboffer {
  /**
   * Constructor
   *
   * @param {object} joboffer object loaded from the API
   */
  constructor(joboffer) {
    // Expose all properties of `joboffer`
    Object.keys(joboffer).forEach(key => {
      this[key] = joboffer[key];
    });
  }

  getTitle() {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
    return this[`title_${currentLanguage()}`] || this[`title_${otherLanguage}`];
  }

  getCompany() {
    return this.company;
  }

  getDescription() {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
    const description =
      this[`description_${currentLanguage()}`] || this[`description_${otherLanguage}`];
    // Use regex to substitute headers in description with h3 headers
    const regex = /(#+\s+)(\w+)/g;
    return description.replace(regex, (match, p1, p2) => `### ${p2.toLowerCase()}`);
  }

  getDate() {
    const postedOn = Date.parse(this._created);
    const today = Date.now();
    const timeDiff = today - postedOn;
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const message = currentLanguage() === 'en' ? `${diffDays} days ago` : `vor ${diffDays} Tagen`;
    return message;
  }
}
