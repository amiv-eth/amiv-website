import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from './auth';

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
    this.query = JSON.parse(JSON.stringify(query || {}));
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
    const query = JSON.parse(
      JSON.stringify(
        Object.assign({}, this.query, additionalQuery, {
          where: Object.assign({}, this.query.where, additionalQuery.where),
        })
      )
    );

    if (
      this.query.where &&
      this.query.where.$or &&
      additionalQuery.where &&
      additionalQuery.where.$or
    ) {
      query.where.$and = query.where.$and || [];
      query.where.$and.push(
        JSON.parse(JSON.stringify({ $or: this.query.where.$or })),
        JSON.parse(JSON.stringify({ $or: additionalQuery.where.$or }))
      );
      delete query.where.$or;
    }
    if (this.query.where && this.query.where.$and) {
      query.where.$and = query.where.$and.concat(JSON.parse(JSON.stringify(this.query.where.$and)));
    }
    if (additionalQuery.where && additionalQuery.where.$and) {
      query.where.$and = query.where.$and.concat(
        JSON.parse(JSON.stringify(additionalQuery.where.$and))
      );
    }

    query.where.show_website = true;
    query.where.time_advertising_start = { $lt: date };
    query.max_results = query.max_results || 10;
    query.page = pageNum;

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
    // Parse query such that the backend understands it
    const parsedQuery = {};
    Object.keys(query).forEach(key => {
      parsedQuery[key] = key === 'sort' ? query[key] : JSON.stringify(query[key]);
    });
    const queryString = m.buildQueryString(parsedQuery);

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
