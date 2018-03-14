import m from 'mithril';
import { apiUrl } from './config';
import { getToken } from './auth';

const lang = 'de';
const date = `${new Date().toISOString().split('.')[0]}Z`;

let querySaved = {};

export function getList() {
  if (!this.list) {
    return [];
  }
  return this.list;
}

export function getSelectedOffer() {
  return this.selectedOffer;
}

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
        newOffer.title = newOffer[`title_${lang}`];
        newOffer.description = newOffer[`description_${lang}`];
        return newOffer;
      });
    });
}

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

export function reload() {
  return load(querySaved);
}
