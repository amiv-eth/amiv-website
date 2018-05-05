import m from 'mithril';
import { Button, Checkbox, TextField } from '../components';
import * as filter from '../models/filter';

export default class FilterViewComponent {
  constructor() {
    this.filterNames = null;
    this.defaultProps = {};
  }

  /**
   * Attributes:
   *
   *   - `searchfield` searchfield activated
   *   - `checkbox` checkboxes activated
   *   - `filterDrop` list of dropdown filters
   *   - `filterCheck` list of checkbox filters
   *   - `onloadDoc` function called to load doc with new query
   *
   */
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
      filter.state.searchField = '';
      filter.updateFilter();
      if (vnode.attrs.onloadDoc) vnode.attrs.onloadDoc(filter.query);
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
              onsubmit: () => {
                filter.updateFilter();
                vnode.attrs.onloadDoc(filter.query);
                return false;
              },
            },
            [
              m(
                TextField,
                {
                  label: 'Search',
                  onChange: state => {
                    filter.state.searchField = state.value;
                  },
                },
                ''
              ),
              m(Button, {
                label: 'Search',
              }),
            ]
          )
        : null,
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
