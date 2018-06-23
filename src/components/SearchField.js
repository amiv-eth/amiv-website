import m from 'mithril';
import { Search, IconButton, Shadow } from 'polythene-mithril';
import { i18n } from '../models/language';
import TextFieldComponent from './TextField';
import './SearchField.less';

const iconSearchSVG =
  '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
const iconClearSVG =
  '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

const iconSearch = m.trust(iconSearchSVG);
const iconClear = m.trust(iconClearSVG);

const ClearButton = {
  view: ({ attrs }) =>
    m(IconButton, {
      icon: { svg: { content: iconClear } },
      ink: false,
      events: { onclick: attrs.clear },
    }),
};

const SearchIcon = {
  view: () =>
    m(IconButton, {
      icon: { svg: { content: iconSearch } },
      // make this appear as Icon Button but without interactivity:
      inactive: true,
    }),
};

/**
 * Generic search textfield component
 *
 * Examples:
 *
 *    m(SearchField, { textfield: { label: 'Lecture' } })
 */
export default class SearchFieldComponent extends TextFieldComponent {
  _getInputView(attrs) {
    return m(
      Search,
      Object.assign({}, attrs, {
        className: 'searchfield',
        textfield: {
          label: i18n('search'),
          onChange: attrs.onChange,
          events: attrs.events,
          value: this.value(),
        },
        buttons: {
          none: {
            after: m(SearchIcon),
          },
          focus: {
            after: m(SearchIcon),
          },
          focus_dirty: {
            after: m(ClearButton, {
              clear: () => this.clear(),
            }),
          },
          dirty: {
            after: m(ClearButton, {
              clear: () => this.clear(),
            }),
          },
        },
        before: m(Shadow),
      })
    );
  }

  clear() {
    this.value('');
    this._selectedListIndex(-1);
    this._listItems([]);
  }
}
