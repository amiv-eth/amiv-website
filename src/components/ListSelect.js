import m from 'mithril';
import Stream from 'mithril/stream';
// eslint-disable-next-line import/no-extraneous-dependencies
import { List } from 'polythene-mithril-list';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ListTile } from 'polythene-mithril-list-tile';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Search } from 'polythene-mithril-search';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IconButton } from 'polythene-mithril-icon-button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Toolbar, ToolbarTitle } from 'polythene-mithril-toolbar';
import debounce from 'amiv-web-ui-components/src/debounce';
import icons from '../images/icons';

const ClearButton = {
  view: ({ attrs }) =>
    m(IconButton, {
      icon: { svg: m.trust(icons.clear) },
      ink: false,
      events: { onclick: attrs.clear },
    }),
};

class SearchField {
  // copy-paste from polythene-mithril examples
  oninit() {
    this.value = Stream('');
    this.setInputState = Stream();

    this.clear = () => this.value('');
    this.leave = () => this.value('');
  }

  view({ attrs }) {
    // incoming value and focus added for result list example:
    const value = attrs.value !== undefined ? attrs.value : this.value();
    return m(Search, {
      textfield: {
        label: attrs.placeholderText,
        onChange: newState => {
          this.value(newState.value);
          this.setInputState(newState.setInputState);
          // onChange callback added for result list example:
          if (attrs.onChange) attrs.onChange(newState, this.setInputState);
        },
        value,
        defaultValue: attrs.defaultValue,
      },
      buttons: {
        focus_dirty: {
          after: m(ClearButton, { clear: this.clear }),
        },
        dirty: {
          after: m(ClearButton, { clear: this.clear }),
        },
      },
      ...attrs,
    });
  }
}

export default class ListSelect {
  /**
   * A selection field where the value can be choosen from a large list of items
   * loaded from an API resource (e.g. select a user or an event).
   *
   * @param {object}      attrs.options                 Array containing the selectable items
   *   * as a list of strings (value and label will be the same)
   *     Example: `['item1', 'item2']`
   *   * as a list of objects (set label and value independently)
   *     Example: `[{ label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2', disabled: true }]`
   * @param {string}      attrs.placeholderText         placeholder text (default: 'type here')
   *     Shown when searchfield is empty
   * @param {function}    attrs.listTileAttrs           funtion(item)
   *     Function that maps an API object to attributes of a polythene 'ListTile' to display the
   *     possibilities out of which the user can select one.
   * @param {function}    attrs.onSelect                function(item)
   *     Callback when an item is selected
   * @param {object}      attrs.toolbarAttrs            attributes passed to the toolbar component
   * @param {string}      attrs.toolbarAttrs.background background color of the toolbar/searchfield
   *     (default: 'rgb(78, 242, 167)')
   * @param {object}      attrs.listAttrs               attributes passed to the list component
   * @param {string}      attrs.listAttrs.background    background color of the search result list
   *     (default: 'white')
   * @param {string|null} attrs.listAttrs.height        height of the search result list.
   *     Unrestricted if set to null. (default: '400px')
   * @param {boolean}     attrs.listAttrs.permanent     show the search result list permanently
   *     This is independent of focus state of the searchfield. (default: false)
   */

  constructor({ attrs: { options, listTileAttrs, onSelect = false } }) {
    this.showList = false;
    this.searchValue = '';
    this.listTileAttrs = listTileAttrs;
    // initialize the Selection
    this.selected = null;
    this.onSelect = onSelect;
    this.options = options;
    this.filteredOptions = options;
    this.debouncedSearch = debounce(search => {
      if (search) {
        const regex = RegExp(`.*(${search}).*`, 'gi');
        this.filteredOptions = options.filter(item => regex.test(item));
      } else {
        this.filteredOptions = this.options;
      }
      m.redraw();
    }, 100);
  }

  onupdate({ attrs: { options, selection = null } }) {
    // make it possible to change the selection from outside, e.g. to set the field to an
    // existing group moderator
    if (selection) this.selected = selection;
    this.options = options;
  }

  view({ attrs: { placeholderText = 'type here', toolbarAttrs, listAttrs } }) {
    const toolbarAppliedAttrs = { background: 'rgb(78, 242, 167)', ...toolbarAttrs };
    const listAppliedAttrs = {
      background: 'white',
      height: '400px',
      permanent: false,
      ...listAttrs,
    };

    return m('div', [
      m(
        Toolbar,
        {
          ...toolbarAppliedAttrs,
          compact: true,
          style: { ...toolbarAppliedAttrs.style, background: toolbarAppliedAttrs.background },
        },
        this.selected
          ? [
              m(IconButton, {
                icon: { svg: m.trust(icons.clear) },
                ink: false,
                events: {
                  onclick: () => {
                    if (this.onSelect) {
                      this.onSelect(null);
                    }
                    this.selected = null;
                  },
                },
              }),
              m(ToolbarTitle, { text: this.selected }),
            ]
          : [
              m(SearchField, {
                placeholderText,
                style: { background: toolbarAppliedAttrs.background },
                onChange: ({ value, focus }) => {
                  // onChange is called either if the value or focus of the SearchField
                  // changes.
                  // At value change we want to update the search
                  // at focus change we hide the list of results. As focus change also
                  // happens while clicking on an item in the list of results, the list
                  // is hidden after a short Timeout that has to be sufficiently long
                  // to register the onclick of the listitem. Can be a problem for different
                  // OS and browsers.
                  if (focus) {
                    this.showList = true;
                  } else if (!focus) {
                    // don't close the list immidiately, as 'out of focus' could
                    // also mean that the user is clicking on a list item
                    setTimeout(() => {
                      this.showList = false;
                      m.redraw();
                    }, 500);
                  }
                  if (value !== this.searchValue) {
                    // if we always update the search value, this would also happen
                    // immidiately in the moment where we click on the listitem.
                    // Then, the list get's updated before the click is registered.
                    // So, we make sure this state change is due to value change and
                    // not due to focus change.
                    this.searchValue = value;
                    this.debouncedSearch(value);
                  }
                },
              }),
            ]
      ),
      (this.showList || listAppliedAttrs.permanent) && !this.selected
        ? m(List, {
            ...listAppliedAttrs,
            style: {
              ...listAppliedAttrs.style,
              height: listAppliedAttrs.height,
              background: listAppliedAttrs.background,
            },
            tiles: this.filteredOptions.map(item => this._renderItem(item)),
          })
        : null,
    ]);
  }

  _renderItem(item) {
    return m(ListTile, {
      title: item,
      compactFront: true,
      hoverable: true,
      events: {
        onclick: () => {
          if (this.onSelect) {
            this.onSelect(item);
          }
          this.selected = item;
          this.showList = false;
        },
      },
    });
  }
}
