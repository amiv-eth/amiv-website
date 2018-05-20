import m from 'mithril';
import infinite from 'mithril-infinite';
import { i18n, currentLanguage } from '../../models/language';
import { EventController } from '../../models/events';
import { FilterView } from '../../components';
import { log } from '../../models/log';
import EventDetails from './eventDetails';

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
 * EventPromotionList
 *
 * Used to show upcoming events and events with open registration
 */
class EventPromotionList {
  oninit(vnode) {
    this.controller = vnode.attrs.controller;
    this.stateCounter = this.controller.stateCounter;
    this.withOpenRegistration = [];
    this.upcoming = [];
    this.controller.getWithOpenRegistration().then(events => {
      this.withOpenRegistration = events;
    });
    this.controller.getUpcoming(true).then(events => {
      this.upcoming = events;
    });
  }

  onbeforeupdate() {
    if (this.stateCounter !== this.controller.stateCounter) {
      this.controller.getWithOpenRegistration().then(events => {
        this.withOpenRegistration = events;
      });
      this.controller.getUpcoming(true).then(events => {
        this.upcoming = events;
      });
    }
  }

  view() {
    return [
      m('div', this.withOpenRegistration.map(event => renderEventListItem(event, 'registration'))),
      m('div', this.upcoming.map(event => renderEventListItem(event, 'upcoming'))),
    ];
  }
}

/**
 * EventList class
 *
 * Used to show the events page including the FilterView and the event details page.
 */
export default class EventList {
  constructor() {
    this.controller = new EventController();
    this.eventLoaded = false;
  }

  oninit(vnode) {
    if (vnode.attrs.eventId) {
      this.controller
        .loadEvent(vnode.attrs.eventId)
        .then(event => {
          this.eventLoaded = true;
          log(event);
        })
        .catch(err => {
          this.eventLoaded = true;
          log(err);
        });
    }
  }

  onbeforeupdate(vnode, old) {
    // when attrs are different it means we changed route
    if (vnode.attrs.id !== old.attrs.id) {
      this.controller.reload();
    }
  }

  view(vnode) {
    let detailView;
    if (vnode.attrs.eventId) {
      if (this.eventLoaded) {
        detailView = m('div.details', m(EventDetails, { controller: this.controller }));
      } else {
        // Do not show anything on details panel when event data has not been loaded.
        detailView = m('');
      }
    } else {
      detailView = m('div.details', m('h1', 'No event selected'));
    }

    return m('div#event-list', [
      m('div.filter', [
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
          onchange: () => {
            // TODO: implement event filtering
            // log('Event filtering not implemented yet.');
          },
        }),
      ]),
      // event list
      m('div.content', [
        m(
          infinite,
          this.controller.infiniteScrollParams(
            event => renderEventListItem(event, 'past'),
            m(EventPromotionList, { controller: this.controller })
          )
        ),
      ]),
      // event details
      detailView,
    ]);
  }
}
