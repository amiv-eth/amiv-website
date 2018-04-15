// handles all filter functions
export const filter = {};

export function changeFilter(filterKey, filterValue, checked) {
  this.filter[filterKey][filterValue] = checked;
  const query = {};
  Object.keys(this.filter).forEach(key => {
    let queryValue = '';
    Object.keys(this.filter[key]).forEach(subKey => {
      if (this.filter[key][subKey]) {
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
  // this.onloadDoc(query);
  console.log(this.filter);
}
