// handles all filter functions
export const state = {};

// set filter-state at key,value with checked
export function changeFilter(filterKey, filterValue, checked) {
  this.state[filterKey][filterValue] = checked;

  // get right query for filter-state
  const query = {};
  Object.keys(this.state).forEach(key => {
    let queryValue = '';
    Object.keys(this.state[key]).forEach(subKey => {
      if (this.state[key][subKey]) {
        queryValue += `${subKey}|`;
      }
    });
    if (queryValue.length > 0) {
      queryValue = queryValue.substring(0, queryValue.length - 1);
      query[key] = { $regex: `^(?i).*${queryValue}.*` };
    }
  });
  query.semester = { $regex: `^(?i).*${String(this.semester)}.*` };
  query.lecture = { $regex: `^(?i).*${this.lecture}.*` };
  // this.onloadDoc(query); add later again... due to api being down...
}
