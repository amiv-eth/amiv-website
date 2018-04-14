import m from 'mithril';
import { Button, Checkbox, TextField } from '../components';
import * as Filter from '../models/Filter';

export default class FilterViewComponent {
  constructor() {
    this.filterNames = null;
    this.search = '';
    this.defaultProps = {};
  }

  view(vnode) {
    this.filterNames = vnode.attrs.filterNames;
    Filter.filter = {};
    this.onloadDoc = vnode.attrs.onloadDoc;
    Object.keys(this.filterNames).forEach(key => {
      const filterValue = {};
      Object.keys(this.filterNames[key]).forEach(subKey => {
        filterValue[subKey] = false;
      });
      Filter.filter[key] = filterValue;
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
                    onChange: state => Filter.changeFilter(key, subKey, state.checked),
                  })
                ),
              ])
            ),
          ]
        : null,
    ];
  }
}
