import m from 'mithril';
import { apiUrl } from 'config';
import AmivLogo from '../../images/logoNoText.svg';
import { i18n, currentLanguage } from '../../models/language';
import { EventController } from '../../models/events';
import EventDetails from './eventDetails';
import { FilteredListPage, FilteredListDataStore } from '../filteredListPage';

const controller = new EventController({}, true);
const dataStore = new FilteredListDataStore();

/**
 * EventList class
 *
 * Used to show the events page including the FilterView and the event details page.
 */
export default class EventList extends FilteredListPage {
  constructor() {
    super('event', dataStore, true);
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.eventId);
  }

  // eslint-disable-next-line class-methods-use-this
  _loadItem(eventId) {
    return controller.loadEvent(eventId);
  }

  // eslint-disable-next-line class-methods-use-this
  _reloadData() {
    return controller.refresh();
  }

  get _filterViewAttributes() {
    return {
      fields: [
        {
          type: 'text',
          key: 'title',
          label: i18n('events.searchfield'),
          min_length: 3,
        },
        {
          type: 'button',
          label: i18n('search'),
        },
        {
          type: 'checkbox',
          key: 'price',
          label: i18n('events.price'),
          default: ['free', 'small_fee'],
          values: [
            { value: 'free', label: i18n('events.free') },
            { value: 'small_fee', label: i18n('events.small_fee') },
          ],
        },
        {
          type: 'radio',
          label: i18n('events.restrictions'),
          key: 'signup_restrictions',
          default: 'members_only',
          values: [
            { label: i18n('events.open_for_all'), value: 'all' },
            { label: i18n('events.open_for_amiv_members_only'), value: 'members_only' },
          ],
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

          if (key === 'price' && value.length === 1) {
            const conditions = [];

            if (value.includes('free')) {
              conditions.push({ price: null }, { price: 0 });
            }
            if (value.includes('small_fee')) {
              conditions.push({ price: { $gt: 0 } });
            }
            if (conditions.length > 0) {
              query.$and = [{ $or: conditions }];
            }
          } else if (key === 'signup_restrictions') {
            if (value === 'all') {
              query.allow_email_signup = true;
            }
          } else if (key === 'title' && value.length > 0) {
            query.title_en = { $regex: `^(?i).*${value}.*` };
            query.title_de = { $regex: `^(?i).*${value}.*` };
            query.catchphrase_en = { $regex: `^(?i).*${value}.*` };
            query.catchphrase_de = { $regex: `^(?i).*${value}.*` };
            query.description_en = { $regex: `^(?i).*${value}.*` };
            query.description_de = { $regex: `^(?i).*${value}.*` };
          }
        });
        controller.setQuery({ where: query }).finally(() => m.redraw());
      },
    };
  }

  get _listView() {
    const openRegistrationList = [];
    const upcomingList = [];

    if (controller.openRegistrationEvents.length > 0) {
      openRegistrationList.push(
        m('div.list-header', m('h4', i18n('events.header_open_registration'))),
        ...controller.openRegistrationEvents.map(page =>
          page.map(event => this.constructor._renderEventListItem(event, 'registration'))
        )
      );
    }

    if (controller.upcomingEvents.length > 0) {
      upcomingList.push(
        m('div.list-header', m('h4', i18n('events.header_upcoming'))),
        ...controller.upcomingEvents.map(page =>
          page.map(event => this.constructor._renderEventListItem(event, 'upcoming'))
        )
      );
    } else if (controller.openRegistrationEvents.length === 0) {
      upcomingList.push(m('div.list-placeholder', i18n('events.no_upcoming')));
    }

    return [
      m('div.registration', openRegistrationList),
      m('div.upcoming', upcomingList),
      m('div.past', [
        m('div.list-header', m('h4', i18n('events.header_past'))),
        ...controller.pastEvents.map(page =>
          page.map(event => this.constructor._renderEventListItem(event, 'past'))
        ),
      ]),
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  get _detailsView() {
    return m(EventDetails, { controller });
  }

  // eslint-disable-next-line class-methods-use-this
  get _detailsPlaceholderView() {
    return m('h1', i18n('events.no_selection'));
  }

  // eslint-disable-next-line class-methods-use-this
  async _loadNextPage() {
    const newPage = controller.pastEvents.lastLoadedPage + 1;
    if (newPage <= controller.pastEvents.totalPages) {
      await controller.pastEvents.loadPageData(newPage);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _hasMorePagesToLoad() {
    return controller.pastEvents.lastLoadedPage < controller.pastEvents.totalPages;
  }

  static _renderEventListItem(event, className = '') {
    const imageurl = event.img_poster ? `${apiUrl}${event.img_poster.file}` : AmivLogo;
    const price = event.price ? `Fr. ${event.price}` : i18n('events.free');
    return m(
      'div',
      {
        class: `list-item ${className}`,
        onclick: () => {
          m.route.set(`/${currentLanguage()}/events/${event._id}`);
        },
      },
      [
        m('img', { src: imageurl }),
        m(
          'div',
          {
            class: 'event-title',
          },
          [
            m('h2', event.getTitle()),
            m('div', [m('span', price), m('span', event.time_start.slice(0, -10))]),
          ]
        ),
      ]
    );
  }
}
