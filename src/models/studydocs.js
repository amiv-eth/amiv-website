import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from './auth';
import Query from './query';

let querySaved = {};

/**
 * Get the loaded list of studydocuments.
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
 * Load studydocuments from the AMIV API
 *
 * @param {*} query filter and sort query for the API request.
 * @return {Promise} exports for additional response handling
 */
export function load(query = {}) {
  querySaved = Query.copy(query);
  const queryEncoded = Query.buildQueryString({ where: query });

  return m
    .request({
      method: 'GET',
      url: `${apiUrl}/studydocuments?${queryEncoded}`,
      headers: {
        Authorization: getToken(),
      },
    })
    .then(result => {
      this.list = result._items;
    });
}

/**
 * Load a single document from the AMIV API
 *
 * @param {string} id
 */
export async function loadDocument(id) {
  return m.request({
    method: 'GET',
    url: `${apiUrl}/studydocuments/${id}`,
    headers: {
      Authorization: getToken(),
    },
  });
}

/**
 * Get Suggestions from already existing entries for a specified field of `studydocument`.
 *
 * @param {String} field entity field which should be searched.
 * @param {String} input search string
 */
export function getInputSuggestions(field, input) {
  const query = {};
  query[field] = { $regex: `^(?i).*${input}.*` };
  // TODO: debug Error 502 Bad Gateway returned by API
  // const projection = {};
  // projection[field] = 1;
  const queryEncoded = Query.buildQueryString({
    where: query,
    // projection: JSON.stringify(projection),
  });
  return m.request({
    method: 'GET',
    url: `${apiUrl}/studydocuments?${queryEncoded}`,
    headers: {
      Authorization: getToken(),
    },
  });
}

/**
 * Reload studydocument list with the same query as before.
 *
 * @return {Promise} exports for additional response handling
 */
export function reload() {
  return load(querySaved);
}

/**
 * Store a new studydocument in the AMIV API.
 *
 * @param {Object} doc studydocument object to be stored in the AMIV API.
 * @return {Promise} exports for additional response handling
 */
export function addNew(doc) {
  if (typeof doc !== 'object') {
    return new Promise(() => {}); // empty promise
  }
  const form = new FormData();
  Object.keys(doc).forEach(key => {
    if (key === 'files') {
      for (let i = 0; i < doc.files.length; i += 1) {
        form.append('files', doc.files[i]);
      }
    } else {
      form.append(key, doc[key]);
    }
  });

  return m.request({
    method: 'POST',
    url: `${apiUrl}/studydocuments`,
    data: form,
    headers: {
      Authorization: getToken(),
    },
  });
}
