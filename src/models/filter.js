// handles all filter functions
export const state = {};
export const query = {};
// set filter-state at key,value with checked
export function updateFilter() {
  this.query = {};
  Object.keys(this.state).forEach(key => {
    let queryValue = '';
    Object.keys(this.state[key]).forEach(subKey => {
      if (this.state[key][subKey] && subKey !== 'all') {
        queryValue += `${subKey}|`;
      }
    });
    if (queryValue.length > 0) {
      queryValue = queryValue.substring(0, queryValue.length - 1);
      this.query[key] = { $regex: `^(?i).*${queryValue}.*` };
    }
  });
}
export function changeFilter(filterKey, filterValue, checked) {
  this.state[filterKey][filterValue] = checked;

  // get right query for filter-state
  this.updateFilter();
}
