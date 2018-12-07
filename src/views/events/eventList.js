import m from 'mithril';
import { apiUrl } from 'config';
import { ExpansionPanel } from 'amiv-web-ui-components';
import AmivLogo from '../../images/logoNoText.svg';
import { i18n } from '../../models/language';
import { EventController } from '../../models/events';
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
          type: 'text',
          key: 'title',
          label: i18n('events.searchfield'),
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
          label: i18n('events.agenda'),
          className: 'flat-button',
          events: {
            onclick: () => 
              window.open(
                'https://calendar.google.com/calendar/embed?src=mdk91hfvr18q8rrlh3sedlhgvo%40group.calendar.google.com',
                '_blank'
              )
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
      onchange: async values => {
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
        return controller.setQuery({ where: query });
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get _lists() {
    const lists = [];

    if (controller.openRegistrationEvents.length > 0) {
      lists.push({
        name: 'openRegistration',
        title: i18n('events.header_open_registration'),
        pages: controller.openRegistrationEvents,
      });
    }

    if (controller.upcomingEvents.length > 0) {
      lists.push({
        name: 'upcoming',
        title: i18n('events.header_upcoming'),
        pages: controller.upcomingEvents,
      });
    }

    lists.push({
      name: 'past',
      title: i18n('events.header_past'),
      pages: controller.pastEvents,
      loadMore: this._hasMorePagesToLoad() ? this._loadNextPage : undefined,
    });

    return lists;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderItem(event, list, selectedId) {
    const animationDuration = 300; // in ms
    const imageurl = event.img_thumbnail ? `${apiUrl}${event.img_thumbnail.file}` : AmivLogo;
    const price = event.price ? `Fr. ${event.price}` : i18n('events.free');

    return m(ExpansionPanel, {
      id: this.getItemElementId(event._id),
      expanded: event._id === selectedId,
      separated: true,
      duration: animationDuration,
      onChange: expanded => {
        this.onChange(event._id, expanded, animationDuration);
      },
      header: () =>
        m('div.event', [
          // m('div.image.ratio-1to1', m('img', { src: imageurl })),
          m(
            'div',
            {
              class: 'list-title',
            },
            [
              m('h2', event.getTitle()),
              m('div', [m('span', price), m('span', event.time_start.slice(0, -10))]),
            ]
          ),
        ]),
      content: () => m('div', event.getDescription()),
    });
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
