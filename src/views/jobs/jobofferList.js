import m from 'mithril';
import { apiUrl } from 'config';
import ExpansionPanel from 'amiv-web-ui-components/src/expansionPanel';
import { i18n } from '../../models/language';
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
  _hasItems() {
    return controller.length > 0;
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
          type: 'search',
          key: 'title',
          label: i18n('search'),
          min_length: 3,
        },
        {
          type: 'hr',
        },
        {
          type: 'button',
          label: i18n('reset'),
          className: 'flat-button',
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
            const regex = { $regex: `^(?i).*${value}.*` };
            query.$or = [
              { title_en: regex },
              { title_de: regex },
              { description_en: regex },
              { description_de: regex },
              { company: regex },
              { company: regex },
            ];
          }
        });
        return controller.setQuery({ where: query });
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
    const imageurl = apiUrl + joboffer.logo.file;
    const dayFactor = 1000 * 3600 * 24;
    // Set createdDay to timestamp with hour set to 0 to ensure
    // correct time phrase rendering (today, yesterday, etc.)
    const createdDay = Math.floor(Date.parse(joboffer._created) / dayFactor);
    const days = Math.floor(Date.now() / dayFactor) - createdDay;
    let datePhrase;

    if (days === 0) {
      datePhrase = i18n('joboffers.publishedToday');
    } else if (days === 1) {
      datePhrase = i18n('joboffers.publishedYesterday');
    } else {
      datePhrase = i18n('joboffers.publishedDaysAgo', { days });
    }

    return m(ExpansionPanel, {
      id: this.getItemElementId(joboffer._id),
      expanded: joboffer._id === selectedId,
      separated: true,
      duration: animationDuration,
      onChange: expanded => {
        this.onChange(joboffer._id, expanded, animationDuration);
      },
      header: () =>
        m('div.joboffer-header', [
          m('div.image.ratio-3to2', m('img', { src: imageurl, alt: joboffer.company })),
          m('div.joboffer-content', [
            m('h2.title', joboffer.getTitle()),
            m('div.date', datePhrase),
          ]),
        ]),
      content: ({ expanded }) => {
        if (expanded) {
          return m(JobofferDetails, { joboffer });
        }
        return m('');
      },
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
