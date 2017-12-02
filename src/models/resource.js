// Generic API resource
import { apiUrl } from './config';
import { getToken, logout } from './auth';

const m = require('mithril');

export default class Resource {
  constructor(name, query = {}) {
    this.name = name;
    this.list = [];
    this.query = query;
  }

  load() {
    // Parse query such that the backend understands it
    const parsedQuery = {};
    Object.keys(this.query).forEach((key) => {
      parsedQuery[key] = JSON.stringify(this.query[key]);
    });
    const queryString = m.buildQueryString(parsedQuery);

    return m.request({
      method: 'GET',
      url: `${apiUrl}/${this.resource}/?${queryString}`,
      headers: { Authorization: `Token ${getToken()}` },
    }).catch((err) => {
      // If the error is 401, the token is invalid -> auto log out
      if (err._error.code === 401) { logout(); }

      // Actual error information is in the '_error' field, pass this on
      throw err._error;
    });
  }
}
