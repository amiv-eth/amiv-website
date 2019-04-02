import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from './auth';
import Query from './query';

/**
 * PaginationController class
 *
 * This is a generic class for different API resources.
 */
export default class PaginationController {
  /**
   * Constructor
   *
   * @param {*} resource resource name (e.g. `events`)
   * @param {*} query initial query
   * @param {*} additionalQuery additional query to be added to every query
   * @public
   */
  constructor(resource, query = {}, additionalQuery = {}) {
    this.resource = resource;
    this.query = query;
    this.additionalQuery = additionalQuery;
    this._lastLoadedPage = 0;
    this._totalPages = 1;
    this._pages = [];
  }

  /**
   * Get the total number of pages available to load
   *
   * @return {int}
   * @public
   */
  get totalPages() {
    return this._totalPages;
  }

  /**
   * Get last loaded page number
   *
   * @return {int}
   * @public
   */
  get lastLoadedPage() {
    return this._lastLoadedPage;
  }

  /**
   * Set a new query to load the configured resource
   *
   * @return {boolean} `true` - if query has changed; `false` - otherwise
   * @public
   */
  setQuery(query) {
    // ignore if query has not changed
    if (Query.isEqual(this.query, query)) return false;

    this.query = Query.copy(query);
    this._pages = [];
    this._lastLoadedPage = 0;
    this._totalPages = 1;
    return true;
  }

  /**
   * Load all pages of this resource query
   *
   * @return {Promise}
   * @public
   */
  async loadAll() {
    let currentPage = 1;
    const promiseList = [];
    while (currentPage <= this._totalPages) {
      promiseList.push(this.loadPageData(currentPage));
      currentPage += 1;
    }
    await Promise.all(promiseList);
  }

  /**
   * Map over all loaded pages (missing pages are skipped!)
   *
   * @param {function} callback function called with every loaded page
   * @public
   */
  map(callback) {
    return this._pages.map(page => callback(page.items));
  }

  /**
   * Test whether some element passes the test implemented by the provided function.
   *
   * @param {function} test function implementing a test
   * @public
   */
  some(test) {
    let result = false;
    this._pages.forEach(page => {
      result = result || page.items.some(test);
    });
    return result;
  }

  /**
   * Get number of loaded items
   *
   * @return {int}
   * @public
   */
  get length() {
    let length = 0;
    this._pages.forEach(page => {
      length += page.items.length;
    });
    return length;
  }

  /**
   * Get data of a specific page
   *
   * @param {int} pageNum page number to load the data from
   * @return {Promise}
   * @public
   */
  async getPageData(pageNum) {
    if (
      this._pages[pageNum] &&
      new Date() < new Date(this._pages[pageNum].datetime.getTime() + 60000)
    ) {
      return this._pages[pageNum].items;
    }
    await this.loadPageData(pageNum);
    return this._pages[pageNum].items;
  }

  /**
   * Load data of a specific page (This function does not return any data!)
   *
   * @param {int}    pageNum         page number to load the data from
   * @param {object} additionalQuery additional query for the API request.
   *   This additional query parameters should be used to request additional
   *   fields (e.g. available filter values).
   * @return {Promise}
   * @public
   */
  async loadPageData(pageNum, additionalQuery = {}) {
    let modelAdditionalQuery;
    if (typeof this.additionalQuery === 'function') {
      modelAdditionalQuery = this.additionalQuery();
    } else {
      modelAdditionalQuery = this.additionalQuery;
    }
    const query = Query.merge(this.query, modelAdditionalQuery, additionalQuery, {
      max_results: this.query.max_results || 10,
      page: pageNum,
    });

    const data = await this._loadData(query);
    this._pages[pageNum] = { datetime: new Date(), items: data };

    if (this._lastLoadedPage < pageNum) {
      this._lastLoadedPage = pageNum;
    }

    return data;
  }

  /**
   * Reload the data from the API using the configured query.
   * @return {Promise}
   * @public
   */
  async reload() {
    const numberOfLoadedPages = this.lastLoadedPage;
    this._pages = [];

    // load first page to get the number of available pages.
    await this.loadPageData(1);

    let currentPage = 2;
    const pagesToLoad = Math.min(numberOfLoadedPages, this.totalPages);
    const promiseList = [];
    while (currentPage <= pagesToLoad) {
      promiseList.push(this.loadPageData(currentPage));
      currentPage += 1;
    }
    await Promise.all(promiseList);
  }

  /**
   * Process a response from the API.
   *
   * You can override this function to further process the API data.
   *
   * @param {object} response JSON response data
   * @returns {array} items loaded from the API
   * @protected
   */
  _processResponse(response) {
    this._totalPages = Math.ceil(response._meta.total / response._meta.max_results);
    return response._items;
  }

  /**
   * Load data with the given query from the API
   *
   * @param {object} query
   * @private
   */
  async _loadData(query) {
    const queryString = Query.buildQueryString(query);

    const response = await m.request({
      method: 'GET',
      url: `${apiUrl}/${this.resource}?${queryString}`,
      headers: {
        Authorization: getToken(),
      },
    });
    return this._processResponse(response);
  }
}
