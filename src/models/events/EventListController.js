import { currentLanguage } from '../language';
import PaginationController from '../pagination';
import Query from '../query';
import Event from './Event';

/**
 * EventListController class (inherited from `PaginationController`)
 *
 * Used to handle a list of a specific type of event (e.g. all past events)
 */
export default class EventListController extends PaginationController {
  constructor(query = {}, additionalQuery = {}) {
    super('events', query, Query.merge(additionalQuery, { where: { show_website: true } }));
  }

  async _loadData(query) {
    const items = await super._loadData(query);
    return items.map(event => {
      const otherLanguage = currentLanguage() === 'en' ? 'de' : 'en';
      const newEvent = Object.assign({}, event);
      newEvent.getTitle = () =>
        newEvent[`title_${currentLanguage()}`] || newEvent[`title_${otherLanguage}`];
      newEvent.getDescription = () =>
        newEvent[`description_${currentLanguage()}`] || newEvent[`description_${otherLanguage}`];
      return new Event(newEvent);
    });
  }
}
