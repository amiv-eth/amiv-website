import m from 'mithril';
import { apiUrl } from 'config';
import { i18n, currentLanguage } from '../../models/language';
import { JobofferController } from '../../models/joboffers';
import { FilteredListPage, FilteredListDataStore } from '../filteredListPage';
import JobofferDetails from './jobofferDetails';

const controller = new JobofferController();
const dataStore = new FilteredListDataStore();

/**
 * JobOfferList class
 *
 * Used to show the job offers page including the FilterView and the job offer details page.
 */
export default class JobofferList extends FilteredListPage {
  constructor() {
    super('joboffer', dataStore, true);
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.offerId);
  }

  // eslint-disable-next-line class-methods-use-this
  _loadItem(offerId) {
    return controller.loadJoboffer(offerId);
  }

  // eslint-disable-next-line class-methods-use-this
  _reloadData() {
    return controller.loadPageData(1);
  }

  get _filterViewAttributes() {
    return {
      fields: [
        {
          type: 'text',
          key: 'title',
          label: i18n('joboffers.searchfield'),
          min_length: 3,
        },
        {
          type: 'button',
          label: i18n('search'),
          events: {
            onclick: 'search',
          },
        },
        {
          type: 'button',
          label: i18n('reset'),
          className: 'red-button',
          events: {
            onclick: 'reset',
          },
        },
      ],
      onchange: values => {
        const query = {};
        this.dataStore.filterValues = values;
        Object.keys(values).forEach(key => {
          const value = values[key];

          if (key === 'title' && value.length > 0) {
            query.$or = [
              { title_en: { $regex: `^(?i).*${value}.*` } },
              { title_de: { $regex: `^(?i).*${value}.*` } },
              { description_en: { $regex: `^(?i).*${value}.*` } },
              { description_de: { $regex: `^(?i).*${value}.*` } },
              { company: { $regex: `^(?i).*${value}.*` } },
              { company: { $regex: `^(?i).*${value}.*` } },
            ];
          }
        });
        controller.setQuery({ where: query }).finally(() => m.redraw());
      },
    };
  }

  get _listView() {
    return controller.map(page =>
      page.map(joboffer => this.constructor._renderJobofferListItem(joboffer))
    );
  }

  // eslint-disable-next-line class-methods-use-this
  get _detailsView() {
    return m(JobofferDetails, { controller });
  }

  // eslint-disable-next-line class-methods-use-this
  get _detailsPlaceholderView() {
    return m('h1', i18n('joboffers.no_selection'));
  }

  // eslint-disable-next-line class-methods-use-this
  async _loadNextPage() {
    const newPage = controller.lastLoadedPage + 1;
    if (newPage <= controller.totalPages) {
      await controller.loadPageData(newPage);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _hasMorePagesToLoad() {
    return controller.lastLoadedPage < controller.totalPages;
  }

  static _renderJobofferListItem(joboffer) {
    return m(
      'div',
      {
        class: 'list-item',
        onclick: () => {
          m.route.set(`/${currentLanguage()}/jobs/${joboffer._id}`);
        },
      },
      [
        m('img', { src: `${apiUrl}${joboffer.logo.file}`, alt: joboffer.company }),
        m(
          'div',
          {
            class: 'job-title',
          },
          [
            m('h2', joboffer.getTitle()),
            m('div', [m('span', joboffer.getCompany()), m('span', joboffer.getDate())]),
          ]
        ),
      ]
    );
  }
}
