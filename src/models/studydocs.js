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
    super('studydocuments', query, {
      ...additionalQuery,
      ...{ sort: ['lecture', 'type', 'course_year', 'title', 'author'] },
    });
    this._availableFilterValues = {};
  }

  /**
   * Set a new query to load the configured resource
   *
   * @return {boolean} `true` - if query has changed; `false` - otherwise
   * @public
   */
  async setQuery(query) {
    if (!super.setQuery(query)) return false;
    await this.loadPageData(1);
    // const data = await this.loadPageData(1);
    // TODO: extract available filter values from response.
    // this._availableFilterValues = data.<some-filter-field-values>
    return true;
  }

  /**
   * Set a new query to load the configured resource
   *
   * @return {boolean} `true` - if query has changed; `false` - otherwise
   * @public
   */
  async setFilterValues(filterValues) {
    const query = {};

    Object.keys(filterValues).forEach(key => {
      let value = filterValues[key];

      if (Array.isArray(value) && value.indexOf('all') === -1) {
        query[key] = { $in: value };
      } else if (key === 'title' && value.length > 0) {
        value = value.substring(0, value.length);
        query.$or = [
          { title: { $regex: `^(?i).*${value}.*` } },
          { lecture: { $regex: `^(?i).*${value}.*` } },
          { author: { $regex: `^(?i).*${value}.*` } },
          { professor: { $regex: `^(?i).*${value}.*` } },
        ];
      }

      // Remove from query is all document types are selected.
      if (query.type && query.type.$in.length === 4) {
        delete query.type;
      }
    });
    return this.setQuery({ where: query });
  }

  /** Check if the study document is already loaded */
  isDocumentLoaded(documentId) {
    const test = item => item._id === documentId;

    return this.some(test);
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
   * Get the available filter values based on the current query.
   *
   * These values are extracted from the API response (`_summary` field).
   * @return {object} collection of available filter values
   */
  get availableFilterValues() {
    return this._availableFilterValues;
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
   * Additional processing of the API responses to get the
   * `_summary` values for the studydocuments resource.
   *
   * @param {object} response JSON response data
   * @private
   */
  _processResponse(response) {
    this._availableFilterValues = response._summary;
    return super._processResponse(response);
  }
}
