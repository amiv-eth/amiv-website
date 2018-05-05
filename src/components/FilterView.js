import m from 'mithril';
import { Button, Checkbox, TextField } from '../components';
import * as filter from '../models/filter';

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
    if (Object.keys(filter.state).length === 0) {
      filter.state = {};
      Object.keys(this.filterNames).forEach(key => {
        const filterValue = {};
        Object.keys(this.filterNames[key]).forEach(subKey => {
          filterValue[subKey] = false;
        });
        filter.state[key] = filterValue;
      });
      filter.updateFilter();
      vnode.attrs.onloadDoc(filter.query);
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
              // onsubmit: , add later...
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
                    onChange: state => {
                      filter.changeFilter(key, subKey, state.checked);
                      vnode.attrs.onloadDoc(filter.query);
                    },
                  })
                ),
              ])
            ),
          ]
        : null,
    ];
  }
}
