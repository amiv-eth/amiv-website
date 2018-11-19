import PaginationController from './pagination';

/**
 * GroupsController class (inherited from `PaginationController`)
 *
 * Used to handle a list of groups.
 */
export default class GroupsController extends PaginationController {
  constructor(query = {}, additionalQuery = {}) {
    super('groups', query, additionalQuery);
  }
}
