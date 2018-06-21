import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from '../auth';
import Query from '../query';
import Joboffer from './Joboffer';
import PaginationController from '../pagination';

/**
 * JobofferController class (inherited from `PaginationController`)
 *
 * Used to handle a list of job offers
 */
export default class JobofferController extends PaginationController {
  constructor(query = {}, additionalQuery = {}) {
    super(
      'joboffers',
      query,
      Query.merge(additionalQuery, () => {
        const date = `${new Date().toISOString().split('.')[0]}Z`;
        return {
          where: {
            time_end: { $gte: date },
            show_website: true,
          },
          sort: ['time_end'],
        };
      })
    );
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
   * Load a specific job offer from the AMIV API
   *
   * @param {String} jobofferId
   * @public
   */
  async loadJoboffer(jobofferId) {
    this._selectedJoboffer = new Joboffer(
      await m.request({
        method: 'GET',
        url: `${apiUrl}/joboffers/${jobofferId}`,
        headers: {
          Authorization: getToken(),
        },
      })
    );
    return this._selectedJoboffer;
  }

  /**
   * Get the previously loaded job offer
   *
   * @return {object} job offer from the AMIV API
   * @public
   */
  get selectedJoboffer() {
    return this._selectedJoboffer;
  }

  async _loadData(query) {
    const items = await super._loadData(query);
    return items.map(joboffer => new Joboffer(joboffer));
  }
}
