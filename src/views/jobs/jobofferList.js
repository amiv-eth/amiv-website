import m from 'mithril';
import { apiUrl } from 'config';
import { ExpansionPanel } from 'amiv-web-ui-components';
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
    super('jobs', dataStore);
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.offerId);
  }

  // eslint-disable-next-line class-methods-use-this
  _isItemLoaded(itemId) {
    return controller.isJobofferLoaded(itemId);
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

  // eslint-disable-next-line class-methods-use-this
  get _lists() {
    return [
      {
        name: 'joboffers',
        pages: controller,
        loadMore: this._hasMorePagesToLoad() ? this._loadNextPage : undefined,
      },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  _renderItem(joboffer, list, selectedId) {
    const animationDuration = 300; // in ms

    return m(ExpansionPanel, {
      id: this.getItemElementId(joboffer._id),
      expanded: joboffer._id === selectedId,
      separated: true,
      duration: animationDuration,
      onChange: expanded => {
        this.onChange(joboffer._id, expanded, animationDuration);
      },
      header: () =>
        m('div.job', [
          m('img', { src: `${apiUrl}${joboffer.logo.file}`, alt: joboffer.company }),
          m(
            'div',
            {
              class: 'list-title',
            },
            [
              m('h2', joboffer.getTitle()),
              m('div', [m('span', joboffer.getCompany()), m('span', joboffer.getDate())]),
            ]
          ),
        ]),
      content: () => m('div', joboffer.getDescription()),
    });
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
}
