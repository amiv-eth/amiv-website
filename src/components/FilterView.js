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
    this.filterNames = {};
    Object.keys(vnode.attrs.filterCheck).forEach(key => {
      this.filterNames[key] = vnode.attrs.filterCheck[key];
    });
    Object.keys(vnode.attrs.filterDrop).forEach(key => {
      this.filterNames[key] = vnode.attrs.filterDrop[key];
    });
    this.onloadDoc = vnode.attrs.onloadDoc;
    if (Object.keys(Filter.filter).length === 0) {
      Filter.filter = {};
      Object.keys(this.filterNames).forEach(key => {
        const filterValue = {};
        Object.keys(this.filterNames[key]).forEach(subKey => {
          filterValue[subKey] = false;
        });
        Filter.filter[key] = filterValue;
      });
    }
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

      vnode.attrs.checkbox && vnode.attrs.filterCheck
        ? [
            Object.keys(vnode.attrs.filterCheck).map(key =>
              m('div.check', [
                Object.keys(vnode.attrs.filterCheck[key]).map(subKey =>
                  m(Checkbox, {
                    label: vnode.attrs.filterCheck[key][subKey],
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
