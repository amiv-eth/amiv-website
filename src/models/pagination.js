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
   * @public
   */
  setQuery(query) {
    this.query = Query.copy(query || {});
    this._pages = [];
    this._lastLoadedPage = 0;
    this._totalPages = 1;
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
   * @param {int} pageNum page number to load the data from
   * @return {Promise}
   * @public
   */
  async loadPageData(pageNum) {
    let additionalQuery;
    if (typeof this.additionalQuery === 'function') {
      additionalQuery = this.additionalQuery();
    } else {
      ({ additionalQuery } = this);
    }
    const date = `${new Date().toISOString().split('.')[0]}Z`;
    const query = Query.merge(this.query, additionalQuery, {
      where: { show_website: true, time_advertising_start: { $lt: date } },
      max_results: this.query.max_results || 10,
      page: pageNum,
    });

    const data = await this._loadData(query);
    this._pages[pageNum] = { datetime: new Date(), items: data };

    if (this._lastLoadedPage < pageNum) {
      this._lastLoadedPage = pageNum;
    }
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
    this._totalPages = Math.ceil(response._meta.total / response._meta.max_results);
    return response._items;
  }
}