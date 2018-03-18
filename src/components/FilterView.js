import m from 'mithril';
import { Button, Checkbox, TextField } from '../components';

export default class FilterViewComponent {
  constructor() {
    this.filterNames = null;
    this.search = '';
    this.defaultProps = {};
  }
  changeFilter(filterKey, filterValue, checked) {
    this.filter[filterKey][filterValue] = checked;
    this.updateFilter();
  }

  updateFilter() {
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
    this.onloadDoc(query);
  }

  view(vnode) {
    this.filterNames = vnode.attrs.filterNames;
    this.filter = {};
    this.onloadDoc = vnode.attrs.onloadDoc;
    Object.keys(this.filterNames).forEach(key => {
      const filterValue = {};
      Object.keys(this.filterNames[key]).forEach(subKey => {
        filterValue[subKey] = false;
      });
      this.filter[key] = filterValue;
    });
    return [
      /*
          Attributes:
          - search: whether filter has a search field
      */
      vnode.attrs.searchField
        ? m(
            'form',
            {
              // onsubmit: ,
            },
            [
              m(
                TextField,
                {
                  label: 'Enter search...',
                  onChange: state => {
                    this.search = state.value;
                  },
                },
                ''
              ),
              m(Button, { label: 'Search' }),
            ]
          )
        : null,
      /*
    Attributes:
    - check boxes: whether filter has a check boxes lists
*/

      vnode.attrs.checkbox && this.filterNames
        ? [
            Object.keys(this.filterNames).map(key =>
              m('div.check', [
                Object.keys(this.filterNames[key]).map(subKey =>
                  m(Checkbox, {
                    label: this.filterNames[key][subKey],
                    onChange: state => this.changeFilter(key, subKey, state.checked),
                  })
                ),
              ])
            ),
          ]
        : null,
    ];
  }
}
