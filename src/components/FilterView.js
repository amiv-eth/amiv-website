import m from 'mithril';
import { Button, Checkbox, TextField, Dropdown } from '../components';

export default class FilterViewComponent {

  constructor() {
    this.search = '';
    this.defaultProps = {};
  }

  /*
      Attributes:
      - search: whether filter has a search field
  */

  view(vnode) {
    return [
      (vnode.attrs.searchField ? m(
        'form',
        {
          //onsubmit: ,
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
      ): null),
    ];
  }
}

/*Object.keys(filterNames).map(key =>
        m('div.check', [
          Object.keys(filterNames[key]).map(subKey =>
            m(Checkbox, {
              label: filterNames[key][subKey],
              onChange: state => this.changeFilter(key, subKey, state.checked),
            })
          ),
        ])
      ),
      m('div.drop', [
        m(Dropdown, {
          data: [
            { id: 1, name: '1. Semester' },
            { id: 2, name: '2. Semester' },
            { id: 3, name: '3. Semester' },
            { id: 4, name: '4. Semester' },
            { id: 5, name: '5. Semester' },
            { id: 6, name: '6. Semester' },
          ],
          onchange: event => {
            this.semester = event.target.value;
            this.updateFilter();
          },
        }),
        m(Dropdown, {
          data: this.lectureData(),
          onchange: event => {
            this.lecture = event.target.value;
            this.updateFilter();
          },
        }),
      ]),
      m(Button, {
        label: 'Add new',
        events: { onclick: () => m.route.set('/studydocuments/new') },
      }),
    ];
  }
}
*/
