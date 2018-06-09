import m from 'mithril';
import { i18n, currentLanguage } from '../../models/language';
import { EventController } from '../../models/events';
import { FilterView } from '../../components';
import { log } from '../../models/log';
import EventDetails from './eventDetails';

const controller = new EventController({}, true);
const stickyPositionTop = { filterView: 0, detailsView: 0 };
let lastScrollPosition = 0;
let filterValues;
let listState = 'loading';
let loadMoreState = 'idle';
let eventLoaded = false;

function renderEventListItem(event, className = '') {
  return m(
    'div',
    {
      class: `list-item ${className}`,
      onclick: () => {
        m.route.set(`/${currentLanguage()}/events/${event._id}`);
      },
    },
    [m('h2', event.title), m('span', event.time_start), m('span', event.price)]
  );
}

/**
 * EventList class
 *
 * Used to show the events page including the FilterView and the event details page.
 */
export default class EventList {
  constructor(vnode) {
    document.addEventListener('scroll', EventList.onscroll);
    window.addEventListener('resize', EventList.onscroll);

    if (vnode.attrs.eventId) {
      controller
        .loadEvent(vnode.attrs.eventId)
        .then(() => {
          eventLoaded = true;
        })
        .catch(err => {
          eventLoaded = true;
          log(err);
        });
    }
  }

  static _reload() {
    listState = 'loading';
    controller
      .refresh()
      .then(() => {
        listState = 'loaded';
      })
      .catch(err => {
        log(err);
        listState = 'error';
      });
  }

  static onscroll() {
    const filterView = document.getElementById('eventListFilterView');
    const detailsView = document.getElementById('eventListDetailsView');
    EventList.updateViewPosition(filterView, 'filterView');
    EventList.updateViewPosition(detailsView, 'detailsView');
    lastScrollPosition = document.documentElement.scrollTop;
  }

  static updateViewPosition(element, positionKey) {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const scrollDelta = document.documentElement.scrollTop - lastScrollPosition;
    const maxPosition = Math.min(windowHeight - element.scrollHeight, 0);

    stickyPositionTop[positionKey] = Math.min(
      0,
      Math.max(stickyPositionTop[positionKey] - scrollDelta, maxPosition)
    );
    // eslint-disable-next-line no-param-reassign
    element.style.top = `${stickyPositionTop[positionKey]}px`;
  }

  view(vnode) {
    let detailView;
    if (vnode.attrs.eventId) {
      if (eventLoaded) {
        detailView = m(
          'div.details',
          {
            id: 'eventListDetailsView',
            style: {
              top: `${stickyPositionTop.detailsView}px`,
            },
          },
          m(EventDetails, { controller })
        );
      } else {
        // Do not show anything on details panel when event data has not been loaded.
        detailView = m('');
      }
    } else {
      detailView = m(
        'div.details',
        {
          id: 'eventListDetailsView',
          style: {
            top: `${stickyPositionTop.detailsView}px`,
          },
        },
        m('h1', i18n('events.no_selection'))
      );
    }

    return m('div#event-list', [
      m('div', this.constructor.filterView),
      m('div.content', this.constructor.listView),
      m('div', detailView),
    ]);
  }

  static get filterView() {
    return m(
      'div.filter',
      {
        id: 'eventListFilterView',
        style: {
          top: `${stickyPositionTop.filterView}px`,
        },
      },
      m(FilterView, {
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
        ],
        onchange: values => {
          const query = {};
          filterValues = values;
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
            } else if (key === 'title' && value.length > 0) {
              query.title_en = { $regex: `^(?i).*${value}.*` };
              query.title_de = { $regex: `^(?i).*${value}.*` };
              query.catchphrase_en = { $regex: `^(?i).*${value}.*` };
              query.catchphrase_de = { $regex: `^(?i).*${value}.*` };
              query.description_en = { $regex: `^(?i).*${value}.*` };
              query.description_de = { $regex: `^(?i).*${value}.*` };
            }
          });
          controller.setQuery({ where: query });
        },
        values: filterValues,
      })
    );
  }

  static get listView() {
    let listView;
    if (listState === 'loading') {
      listView = m('span', i18n('events.loading'));
    } else if (listState === 'loaded') {
      listView = [
        m(
          'div.registration',
          controller.openRegistrationEvents.map(page =>
            page.map(event => renderEventListItem(event, 'registration'))
          )
        ),
        m(
          'div.upcoming',
          controller.upcomingEvents.map(page =>
            page.map(event => renderEventListItem(event, 'upcoming'))
          )
        ),
        m(
          'div.past',
          controller.pastEvents.map(page => page.map(event => renderEventListItem(event, 'past')))
        ),
        EventList.loadMoreView,
      ];
    } else {
      listView = m('span', 'Error while loading events.');
    }
    return listView;
  }

  static get loadMoreView() {
    if (loadMoreState === 'loading') {
      return m('div.load-more-items', i18n('events.loading'));
    } else if (
      loadMoreState === 'noMorePages' ||
      controller.pastEvents.lastLoadedPage === controller.pastEvents.totalPages
    ) {
      return m('');
    }
    return m(
      'div.load-more-items.active',
      {
        onclick: () => {
          const newPage = controller.pastEvents.lastLoadedPage + 1;
          if (newPage <= controller.pastEvents.totalPages) {
            loadMoreState = 'loading';
            controller.pastEvents.loadPageData(newPage).then(() => {
              loadMoreState = 'idle';
              m.redraw();
            });
          }
        },
      },
      i18n('events.load_more')
    );
  }
}

EventList._reload();
