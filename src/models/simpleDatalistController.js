import { DatalistController } from 'amiv-web-ui-components';

/**
 * Controller for a list of data provided by a function.
 * This controller only supports a single page of data.
 */
export default class SimpleDatalistController extends DatalistController {
  /**
   * @param {function} get   function(search),
   *   returns results for the given search (using Promise). Search is a
   *   simple string that has to be defined by the get-function to perform any kind of
   *   string-matching that makes sense for the represented data
   */
  constructor(get) {
    super(get, {});

    this.setFilter = undefined;
    this.setQuery = undefined;
  }

  /**
   * Return the data of the only page.
   *
   * @param      {int}   pageNum - The page number
   * @return     {Promise}  The page data as a list.
   */
  getPageData(pageNum) {
    if (pageNum !== 1) return [];
    return this.get(this.search);
  }

  /**
   * Get all available pages
   */
  getFullList() {
    return this.getPageData(1);
  }

  setSearch(search) {
    this.search = search;
  }
}
