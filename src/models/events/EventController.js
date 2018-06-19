import m from 'mithril';
import { apiUrl } from 'config';
import { getToken } from '../auth';
import { currentLanguage } from '../language';
import EventListController from './EventListController';
import Event from './Event';

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

    this._pastEvents = new EventListController(query, () => {
      const date = `${new Date().toISOString().split('.')[0]}Z`;
      return {
        where: {
          time_advertising_end: { $lt: date },
          $and: [
            { $or: [{ time_start: null }, { time_start: { $lt: date } }] },
            { $or: [{ time_end: null }, { time_end: { $lt: date } }] },
          ],
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
            $or: [{ time_register_end: { $lt: date } }, { time_register_start: { $gt: date } }],
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
          time_register_start: { $lt: date },
          time_register_end: { $gt: date },
        },
      };
    });
  }

  /** Set a new query used by all EventListController to load events */
  async setQuery(query) {
    const newQuery = JSON.stringify(query || {});
    const oldQuery = JSON.stringify(this.query);

    if (newQuery === oldQuery) return false;

    this.query = JSON.parse(newQuery);
    this.openRegistrationEvents.setQuery(this.query);
    this.upcomingEvents.setQuery(this.query);
    this.pastEvents.setQuery(this.query);
    await this.refresh();
    return true;
  }

  /** Refresh all event data */
  async refresh() {
    await this.openRegistrationEvents.loadAll();
    await this.upcomingEvents.loadAll();
    await this.pastEvents.loadPageData(1);
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

  /**
   * Load a specific event
   * @param {String} eventId
   */
  async loadEvent(eventId) {
    const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
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
    event.getTitle = () => event[`title_${currentLanguage()}`] || event[`title_${otherLanguage}`];
    event.getDescription = () =>
      event[`description_${currentLanguage()}`] || event[`description_${otherLanguage}`];
    this._selectedEvent = new Event(event);
    return this._selectedEvent;
  }

  /**
   * Get the previously loaded event
   */
  get selectedEvent() {
    return this._selectedEvent;
  }
}
