import m from 'mithril';
import { ListTile } from 'polythene-mithril';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IconButton } from 'polythene-mithril-icon-button';
import Select from 'amiv-web-ui-components/src/select';
import './Filter.less';
import icons from '../images/icons';

export default class FilterComponent {
  /**
   * Generic filter component
   *
   * @param {object}   attrs                   unless specified below, attrs will be
   *   passed into the <select/> input field.
   * @param {string}   attrs.name              name of the form field.
   * @param {string}   attrs.label             Text which is shown above the selected value.
   * @param {function} attrs.onChange          function ({ value, valid }) -
   *   this function is called every time that the value of the select changes
   *   (i.e. not the focus, as would happen with polythene inputs)
   * @param {array}    attrs.options           Array containing the selectable items
   *   * as a list of strings (value and label will be the same)
   *     Example: `['item1', 'item2']`
   *   * as a list of objects (set label and value independently)
   *     Example:
   *       `[{ label: 'label1', value: 'value1', hideSelection: true }, { label: 'label2', value: 'value2', disabled: true }]`
   * @param {string}   attrs.value             Selected value as an array of values
   * @param {boolean}  attrs.dropdownThreshold Specifies the threshold to change from list only to list
   *   and select combination (Default: 4)
   *   Set a threshold of 0 to enforce dropdown layout!
   * @param {boolean}  attrs.disabled          Disable/enable the filter field (Default: false)
   *
   * Example:
   *   ```javascript
   *     m(FilterComponent, {
   *         options: [
   *             { label: 'Label 1', value: 'value1', hideSelection: true },
   *             { label: 'Label 2', value: 'value2', disabled: true },
   *         ],
   *         dropdownThreshold: 0,
   *         value: ['value1'],
   *         onChange: ({ value }) => {
   *             // some event handling
   *         },
   *     })
   *   ```
   */

  constructor({ attrs: { name, onChange = () => {}, value = [] } }) {
    this.name = name;
    this.value = value;
    this.onChange = onChange;
    this.focused = false;
    this.isOpen = false;
  }

  view({ attrs: { label = this.name, options, value, dropdownThreshold = 0 } }) {
    // update the selected value if set.
    if (Array.isArray(value)) {
      this.value = Array.from(value);
    }

    const showSelect = options.length > dropdownThreshold;
    const selectDisabled = this.value.length >= options.length;

    return m(
      'div',
      {
        id: `${this.name}-filter`,
        className: 'pe-filter',
      },
      [
        // m('label', label),
        ...(showSelect
          ? [
              this._renderSelect(
                label,
                this.name,
                selectDisabled,
                options.filter(option => {
                  const optionValue = this.constructor._isObject(option) ? option.value : option;
                  return this.value.indexOf(optionValue) === -1;
                })
              ),
              this._renderList(
                options.filter(option => {
                  const isObject = this.constructor._isObject(option);
                  const optionValue = isObject ? option.value : option;
                  const isSelectionHidden = isObject && option.hideSelection;
                  return !isSelectionHidden && this.value.indexOf(optionValue) !== -1;
                })
              ),
            ]
          : [this._renderList(options)]),
      ]
    );
  }

  static _isObject(option) {
    return typeof option === 'object' && option !== null;
  }

  _toggleValue(value) {
    const i = this.value.indexOf(value);
    if (i !== -1) {
      this.value.splice(i, 1);
    } else {
      this.value.push(value);
    }
    this.onChange({ value: Array.from(this.value) });
  }

  _renderSelect(label, name, disabled, options) {
    return m(Select, {
      containerAttrs: { className: 'pe-filter--select' },
      name,
      label,
      disabled,
      value: '',
      onChange: ({ value }) => {
        this._toggleValue(value);
      },
      options,
    });
  }

  _renderList(options) {
    if (options.length === 0) {
      return null;
    }

    return m(
      'div.pe-filter--list',
      options.map(option => {
        const isObject = this.constructor._isObject(option);
        const isSelected = this.value.indexOf(isObject ? option.value : option) !== -1;
        const isSelectionHidden = isObject && option.hideSelection;
        const label = isObject ? option.label : option;
        const value = isObject ? option.value : option;

        const handleClick = () => this._toggleValue(value);

        if (isSelectionHidden) {
          return null;
        }

        return m(ListTile, {
          className: `pe-filter--item ${isSelected ? 'pe-filter--item-selected' : ''}`,
          title: label,
          rounded: true,
          compact: true,
          events: {
            onclick: handleClick,
          },
          after:
            isSelected &&
            m(IconButton, {
              compact: true,
              icon: {
                svg: { content: m.trust(icons.close) },
              },
              events: {
                onclick: handleClick,
              },
            }),
        });
      })
    );
  }
}
