import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from '../auth';
import EventListController from './EventListController';
import Event from './Event';
import Query from '../query';

/**
 * EventController class
 *
 * Managing multiple event lists of type EventListController
 * (with open registration, upcoming, past events) and
 * handling of the currently selected event.
 */
export default class EventController {
  /**
   * Constructor
   *
   * @param {object} query initial query
   * @param {boolean} upcomingSkipRegistrationOpen if `true`, skip all events with open registration in upcoming event list
   */
  constructor(query = {}, upcomingSkipRegistrationOpen = false) {
    this.query = query;

    // Because past events do not need some advertising tweaks anymore,
    // enforce sorting for past events to ensure the correct sort in time.
    const pastQuery = JSON.parse(JSON.stringify(query));
    pastQuery.sort = ['-time_start', '-time_advertising_start'];

    this._pastEvents = new EventListController(pastQuery, () => {
      const date = `${new Date().toISOString().split('.')[0]}Z`;
      return {
        where: {
          show_website: true,
          time_advertising_start: { $lt: date },
          $or: [{ time_start: null }, { time_start: { $lt: date } }],
        },
      };
    });

    let upcomingAdditionalQuery;
    if (upcomingSkipRegistrationOpen) {
      upcomingAdditionalQuery = () => {
        const date = `${new Date().toISOString().split('.')[0]}Z`;
        return {
          where: {
            show_website: true,
            time_start: { $gt: date },
            time_advertising_start: { $lt: date },
            $or: [
              { time_register_start: null },
              { time_register_end: null },
              { time_register_end: { $lt: date } },
              { time_register_start: { $gt: date } },
            ],
          },
        };
      };
    } else {
      upcomingAdditionalQuery = () => {
        const date = `${new Date().toISOString().split('.')[0]}Z`;
        return {
          where: {
            show_website: true,
            time_start: { $gt: date },
            time_advertising_start: { $lt: date },
          },
        };
      };
    }
    this._upcomingEvents = new EventListController(query, upcomingAdditionalQuery);

    this._openRegistrationEvents = new EventListController(query, () => {
      const date = `${new Date().toISOString().split('.')[0]}Z`;
      return {
        where: {
          show_website: true,
          time_advertising_start: { $lt: date },
          time_register_start: { $lt: date },
          time_register_end: { $gt: date },
        },
      };
    });
  }

  /** Set a new query used by all EventListController to load events */
  async setQuery(query) {
    if (Query.isEqual(this.query, query)) return false;

    this.query = Query.copy(query);
    this.openRegistrationEvents.setQuery(this.query);
    this.upcomingEvents.setQuery(this.query);
    this.pastEvents.setQuery(this.query);

    const jobs = [
      this.openRegistrationEvents.loadAll(),
      this.upcomingEvents.loadAll(),
      this.pastEvents.loadPageData(1),
    ];
    await Promise.all(jobs);
    return true;
  }

  /** Reload all event data */
  async reload() {
    const jobs = [
      this.openRegistrationEvents.loadAll(),
      this.upcomingEvents.loadAll(),
      this.pastEvents.reload(),
    ];
    await Promise.all(jobs);
  }

  /** Get EventListController for all events with open registration window */
  get openRegistrationEvents() {
    return this._openRegistrationEvents;
  }

  /** Get EventListController for all upcoming events */
  get upcomingEvents() {
    return this._upcomingEvents;
  }

  /** Get EventListController for all past events */
  get pastEvents() {
    return this._pastEvents;
  }

  /** Check if the event is already loaded */
  isEventLoaded(eventId) {
    const test = item => item._id === eventId;

    return (
      this.openRegistrationEvents.some(test) ||
      this.upcomingEvents.some(test) ||
      this.pastEvents.some(test)
    );
  }

  /**
   * Load a specific event
   * @param {String} eventId
   */
  // eslint-disable-next-line class-methods-use-this
  async loadEvent(eventId) {
    const event = await m.request({
      method: 'GET',
      url: `${apiUrl}/events/${eventId}`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (!event.show_website) {
      throw new Error('Event not found');
    }
    return new Event(event);
  }
}
