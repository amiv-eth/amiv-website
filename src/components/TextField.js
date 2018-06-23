import m from 'mithril';
import stream from 'mithril/stream';
import { TextField, List, ListTile, Shadow } from 'polythene-mithril';
import './TextField.less';

/**
 * Generic TextField component
 *
 * Attributes:
 *
 *   - `label` text label; default `Unnamed TextField`
 *   - `name` element name
 *   - `className` defaulting to `my-TextField`
 *   - `disabled` *optional* set `true` to disable the checkbox
 *   - `floatingLabel` *optional* defaulting to `false`
 *   - `multiLine` *optional* default `false`
 *   - `help` *optional* help text to be shown below the input field
 *   - `onAutocomplete` *optional* Return list with autocomplete values for the input passed as first parameter.
 *   - `onChange` *optional*
 *   - `
 *   - *optional* all HTML input field options available.
 *
 * Examples:
 *
 *      m(TextField, {
            label: 'Enter search...',
            onChange: state => {
                this.search = state.value;
            },
            onAutocomplete: value => {
              return ['One', 'Two', 'Three'];
            },
          },
        )
 *
 * @return {TextFieldComponent} generic text field as mithril component.
 */
export default class TextFieldComponent {
  constructor() {
    this.defaultProps = {
      label: 'Unnamed TextField',
    };
    this._listItems = stream([]);
    this._selectedListIndex = stream(-1);
    this._showList = false;
    this.value = stream('');
  }

  onbeforeupdate(vnode) {
    this.defaultProps.disabled = vnode.attrs.active === false;
  }

  view(vnode) {
    return m(
      'div.textfield-container',
      {
        // The container catches all keyboard events for both search field and result list
        onkeydown: e => this._handleKey(e),
      },
      [
        this._getInputView({
          ...this.defaultProps,
          ...vnode.attrs,
          ...{
            onChange: async ({ value }) => {
              if (this.value() !== value) {
                this.value(value);

                if (
                  vnode.attrs.onAutocomplete &&
                  (this._listItems().length <= this._selectedListIndex() ||
                    value !== this._listItems()[this._selectedListIndex()])
                ) {
                  this._selectedListIndex(-1);
                  this._showList = true;
                  this._listItems(await vnode.attrs.onAutocomplete(value));
                }
              }
              if (vnode.attrs.onChange) {
                vnode.attrs.onChange({ value });
              }
            },
            events: {
              onfocus: () => {
                this._showList = true;
              },
              onblur: () => {
                this._showList = false;
              },
            },
            value: this.value(),
          },
        }),
        this._getListView(),
      ]
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _getInputView(attrs) {
    return m(TextField, attrs);
  }

  _getListView() {
    return this._showList && this._listItems().length
      ? m(List, {
          key: `results${this.value()}`, // Use a unique key to make sure that the list tiles get registered again
          className: 'autocomplete-list',
          border: true,
          tiles: this._listItems().map((item, index) =>
            this.constructor._getListItemView({
              title: item,
              // Use a unique key to make sure that the list tiles get registered again
              key: item + this.value(),
              selected: index === this._selectedListIndex(),
              onSelect: () => {
                this._selectedListIndex(index);
                this.value(item);
              },
            })
          ),
        })
      : null;
  }

  static _getListItemView({ title, key, selected, onSelect }) {
    return m('div', [
      m(ListTile, {
        title,
        key,
        compactFront: true,
        selected,
        hoverable: true,
        events: {
          onclick: onSelect,
        },
      }),
      m(Shadow, {
        z: 1,
      }),
    ]);
  }

  _handleKey(e) {
    const index = this._selectedListIndex();
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      // 'Down' for IE11
      e.preventDefault();
      const newIndex = index + 1 > this._listItems().length - 1 ? -1 : index + 1;
      this._selectedListIndex(newIndex);
      this.value(this._listItems()[newIndex]);
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      // 'Up' for IE11
      e.preventDefault();
      const newIndex = index - 1 < -1 ? -1 : index - 1;
      this._selectedListIndex(newIndex);
      this.value(this._listItems()[newIndex]);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this._showList = false;
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      // 'Esc' for IE11
      e.preventDefault();
      this._selectedListIndex(-1);
    }
  }
}
