import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from './auth';
import PaginationController from './pagination';

/**
 * StudydocsController class
 *
 * Managing studydocument list and handling of the currently selected event.
 */
export default class StudydocsController extends PaginationController {
  constructor(query = {}, additionalQuery = {}) {
    super('studydocuments', query, additionalQuery);
  }

  /**
   * Set a new query to load the configured resource
   *
   * @public
   */
  async setQuery(query) {
    const newQuery = JSON.stringify(query || {});
    const oldQuery = JSON.stringify(this.query);

    // ignore if query has not changed
    if (newQuery === oldQuery) return false;

    super.setQuery(query);
    return this.loadPageData(1);
  }

  /**
   * Load a specific document from the AMIV API
   *
   * @param {String} documentId
   * @public
   */
  async loadDocument(documentId) {
    this._selectedDocument = await m.request({
      method: 'GET',
      url: `${apiUrl}/studydocuments/${documentId}`,
      headers: {
        Authorization: getToken(),
      },
    });
    return this._selectedDocument;
  }

  /**
   * Get the previously loaded event
   * @return {object} studydocument from the AMIV API
   * @public
   */
  get selectedDocument() {
    return this._selectedDocument;
  }

  /**
   * Store a new studydocument in the AMIV API.
   *
   * @param {Object} doc studydocument object to be stored in the AMIV API.
   * @return {Promise}
   * @static
   */
  static addNew(doc) {
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

  /**
   * Get Suggestions from already existing entries for a specified field of `studydocument`.
   *
   * @param {String} field entity field which should be searched.
   * @param {String} input search string
   * @return {String} suggestion
   * @static
   */
  static getInputSuggestions(field, input) {
    const query = {};
    query[field] = { $regex: `^(?i).*${input}.*` };
    // TODO: debug Error 502 Bad Gateway returned by API
    // const projection = {};
    // projection[field] = 1;
    const queryEncoded = m.buildQueryString({
      where: JSON.stringify(query),
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
}
