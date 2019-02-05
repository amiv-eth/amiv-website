import m from 'mithril';
import { apiUrl } from 'config';
import { ExpansionPanel } from 'amiv-web-ui-components';
import AmivLogo from '../../images/logoNoText.svg';
import { i18n, currentLocale } from '../../models/language';
import { EventController } from '../../models/events';
import { FilteredListPage, FilteredListDataStore } from '../filteredListPage';
import EventDetails from './eventDetails';

const controller = new EventController({}, true);
const dataStore = new FilteredListDataStore();

/**
 * EventList class
 *
 * Used to show the events page including the FilterView and the event details page.
 */
export default class EventList extends FilteredListPage {
  constructor() {
    super('events', dataStore);
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.eventId);
  }

  // eslint-disable-next-line class-methods-use-this
  _isItemLoaded(itemId) {
    return controller.isEventLoaded(itemId);
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
          type: 'search',
          key: 'title',
          label: i18n('search'),
        },
        {
          type: 'radio',
          key: 'price',
          label: i18n('events.price'),
          default: 'all',
          values: [
            { value: 'free', label: i18n('events.free') },
            { value: 'all', label: i18n('events.allEvents') },
          ],
        },
        {
          type: 'radio',
          label: i18n('events.restrictions.title'),
          key: 'signup_restrictions',
          default: 'members_only',
          values: [
            { label: i18n('events.restrictions.none'), value: 'all' },
            { label: i18n('events.restrictions.membersOnly'), value: 'members_only' },
          ],
        },
        { type: 'hr' },
        {
          type: 'button',
          label: i18n('events.agenda'),
          className: 'flat-button',
          events: {
            onclick: () =>
              window.open(
                'https://calendar.google.com/calendar/embed?src=mdk91hfvr18q8rrlh3sedlhgvo%40group.calendar.google.com',
                '_blank'
              ),
          },
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
      onchange: async values => {
        const query = { $and: [] };
        this.dataStore.filterValues = values;
        Object.keys(values).forEach(key => {
          const value = values[key];

          if (key === 'price') {
            if (value === 'free') {
              query.$and.push({ $or: [{ price: null }, { price: 0 }] });
            }
          } else if (key === 'signup_restrictions') {
            if (value === 'all') {
              query.allow_email_signup = true;
            }
          } else if (key === 'title' && value.length > 0) {
            const regex = { $regex: `^(?i).*${value}.*` };
            query.$and.push({
              $or: [
                { title_en: regex },
                { title_de: regex },
                { catchphrase_en: regex },
                { catchphrase_de: regex },
                { description_en: regex },
                { description_de: regex },
              ],
            });
          }
        });
        if (query.$and.length === 0) {
          delete query.$and;
        }
        return controller.setQuery({ where: query, sort: '-time_start,-time_advertising_start' });
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get _lists() {
    const lists = [];

    if (controller.openRegistrationEvents.length > 0) {
      lists.push({
        name: 'openRegistration',
        title: i18n('events.headers.openRegistration'),
        pages: controller.openRegistrationEvents,
      });
    }

    if (controller.upcomingEvents.length > 0) {
      lists.push({
        name: 'upcoming',
        title: i18n('events.headers.upcoming'),
        pages: controller.upcomingEvents,
      });
    }

    lists.push({
      name: 'past',
      title: i18n('events.headers.past'),
      pages: controller.pastEvents,
      loadMore: this._hasMorePagesToLoad() ? this._loadNextPage : undefined,
    });

    return lists;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderItem(event, list, selectedId) {
    const animationDuration = 300; // in ms
    const imageurl = event.img_thumbnail ? `${apiUrl}${event.img_thumbnail.file}` : AmivLogo;
    const properties = [
      {
        value: this.constructor._renderPrice(event.price),
        visible: true,
      },
      {
        value: this.constructor._renderFreeSpots(event.spots, event.signup_count),
        visible: event.spots,
      },
      {
        value: event.location,
        visible: event.location,
      },
    ];

    return m(ExpansionPanel, {
      id: this.getItemElementId(event._id),
      expanded: event._id === selectedId,
      separated: true,
      duration: animationDuration,
      onChange: expanded => {
        this.onChange(event._id, expanded, animationDuration);
      },
      header: () =>
        m('div.event-header', [
          m('div.image.ratio-1to1', m('img', { src: imageurl })),
          m('div.content', [
            m('h2.title', event.getTitle()),
            m('div.catchphrase', event.getCatchphrase()),
            m('div.date', this.constructor._renderEventTime(event.time_start, event.time_end)),
            m('div.properties', properties.map(item => this.constructor._renderProperty(item))),
          ]),
        ]),
      content: ({ expanded }) => {
        if (expanded) {
          return m(EventDetails, { event });
        }
        return m('');
      },
    });
  }

  static _renderProperty({ name = null, value, visible = false }) {
    if (!visible) return null;

    return m('div.property', [name ? m('span.name', name) : undefined, m('span', value)]);
  }

  static _renderPrice(price) {
    if (price) {
      const cents = price % 100;
      return `CHF ${`${Math.floor(price / 100)}.${
        cents === 0 ? '–' : (cents < 10 ? '0' : '') + cents
      }`}`;
    }
    return i18n('events.free');
  }

  static _renderFreeSpots(spots, signup_count) {
    if (spots > 0) {
      const available = spots - signup_count;
      if (available <= 0) {
        return i18n('events.noSpotsAvailable');
      }
      return i18n('events.spotsAvailable', { count: available });
    }
    return '';
  }

  static _renderEventTime(time_start, time_end) {
    const date_start = new Date(time_start);
    const date_end = new Date(time_end);

    if (
      date_start.getUTCDate() === date_end.getUTCDate() ||
      (date_start.getUTCDate() === date_end.getUTCDate() - 1 &&
        date_start.getUTCHours() > date_end.getUTCHours())
    ) {
      return [
        m(
          'span',
          date_start.toLocaleString(currentLocale(), {
            timeZone: 'UTC',
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
        ' – ',
        m(
          'span',
          date_end.toLocaleString(currentLocale(), {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
      ];
    }

    return [
      m(
        'span',
        date_start.toLocaleString(currentLocale(), {
          timeZone: 'UTC',
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      ),
      ' – ',
      m(
        'span',
        date_end.toLocaleString(currentLocale(), {
          timeZone: 'UTC',
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      ),
    ];
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
}
