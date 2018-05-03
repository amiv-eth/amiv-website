import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from './auth';
import { currentLanguage } from './language';

const date = `${new Date().toISOString().split('.')[0]}Z`;

let querySaved = {};

/**
 * Get the loaded list of joboffers.
 *
 * @return {array}
 */
export function getList() {
  if (!this.list) {
    return [];
  }
  return this.list;
}

/**
 * Get the selected joboffer.
 *
 * @return {Object} `joboffer` object returned by the AMIV API.
 */
export function getSelectedOffer() {
  return this.selectedOffer;
}

/**
 * Load joboffers from the AMIV API
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
      url: `${apiUrl}/joboffers?${queryString}`,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    })
    .then(result => {
      this.list = result._items.map(event => {
        const newOffer = Object.assign({}, event);
        newOffer.title = newOffer[`title_${currentLanguage()}`];
        newOffer.description = newOffer[`description_${currentLanguage()}`];
        return newOffer;
      });
    });
}

/**
 * Select a joboffer from the list.
 *
 * @param {String} offerId joboffer id from AMIV API
 */
export function selectOffer(offerId) {
  this.selectedOffer = this.getList().find(item => item._id === offerId);
  if (!this.selectedOffer) {
    this.load({
      where: {
        time_end: { $gte: date },
        show_website: true,
      },
      sort: ['time_end'],
    }).then(() => {
      this.selectedOffer = this.getList().find(item => item._id === offerId);
    });
  }
}

/**
 * Reload joboffer list with the same query as before.
 *
 * @return {Promise} exports for additional response handling
 */
export function reload() {
  return load(querySaved);
}
