import m from 'mithril';

/**
 * Query helper utility class
 */
export default class Query {
  /**
   * checks if two querys are equal
   * @param {object} query1
   * @param {object} query2
   * @return {boolean}
   */
  static isEqual(query1, query2) {
    return JSON.stringify(query1) === JSON.stringify(query2);
  }

  /**
   * Creates a deep copy from a query.
   * @param {object} query
   */
  static copy(query) {
    return JSON.parse(JSON.stringify(query || {}));
  }

  /**
   * Merges multiple queries together to one single query (deep copy included).
   *
   * *Please note that the value on the last parameter has the highest precedence.*
   * @param {*} queries
   */
  static merge(...queries) {
    const newQuery = {};
    const queryFunctions = [];
    queries.forEach(query => {
      if (typeof query === 'function') {
        queryFunctions.push(query);
        return;
      }
      Object.entries(query).forEach(([key, value]) => {
        if (newQuery[key]) {
          if (key === '$or') {
            if (!newQuery.$and) newQuery.$and = [];
            newQuery.$and.push({ $or: Query.copy(value) });
          } else if (key === '$and') {
            newQuery.$and = newQuery.$and.concat(Query.copy(value));
          } else if (typeof newQuery[key] === 'object') {
            newQuery[key] = Query.merge(newQuery[key], value);
          } else {
            newQuery[key] = value;
          }
        } else {
          newQuery[key] = Query.copy(value);
        }
      });
    });

    if (queryFunctions.length === 0) return newQuery;
    return () => Query.merge(newQuery, ...queryFunctions.map(queryFunction => queryFunction()));
  }

  /**
   * Builds a query string for use with a server request.
   *
   * Parses a query such that the backend understands it
   * @param {object} query
   */
  static buildQueryString(query) {
    const parsedQuery = {};
    Object.keys(query).forEach(key => {
      if (Array.isArray(query[key])) {
        parsedQuery[key] = query[key];
      } else if (key === 'sort') {
        parsedQuery[key] = query[key];
      } else {
        parsedQuery[key] = JSON.stringify(query[key]);
      }
    });
    return m.buildQueryString(parsedQuery);
  }
}
