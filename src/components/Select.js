import m from 'mithril';
import { Menu, List, ListTile } from 'polythene-mithril';
import { vars as theme } from 'polythene-theme';
import './Select.less';

const arrowDropdownIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

export default class SelectComponent {
  /**
   * Generic select component
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
   *     Example: `[{ label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2', disabled: true }]`
   * @param {string}   attrs.value             Selected value
   * @param {boolean}  attrs.multiple          Specifies if multiple values can be selected (Default: false)
   * @param {boolean}  attrs.required          Specifies if this field is mandatory (Default: false)
   * @param {string}   attrs.requiredIndicator Indicator that this field is required (Default: "*")
   * @param {boolean}  attrs.disabled          Disable/enable the select field (Default: false)
   * @param {string}   attrs.error             Error message to be shown (Default: "Error")
   * @param {string}   attrs.hint              Hint message to be shown (Default: "")
   *
   * Example:
   *   ```javascript
   *     m(SelectComponent, {
   *         options: [
   *             { label: 'Label 1', value: 'value1' },
   *             { label: 'Label 2', value: 'value2', disabled: true },
   *         ],
   *         required: true,
   *         value: 'value1',
   *         onChange: ({ value }) => {
   *             // some event handling
   *         },
   *     })
   *   ```
   */

  constructor({
    attrs: {
      name,
      multiple = false,
      onChange = () => {},
      value = multiple ? [] : null,
      requiredIndicator = '*',
    },
  }) {
    this.name = name;
    this.value = value;
    this.multiple = multiple;
    this.requiredIndicator = requiredIndicator;
    this.onChange = onChange;
    this.focused = false;
    this.isOpen = false;
    this.valid = true;
  }

  validate() {
    this.valid =
      !this.required || (this.value !== null && (!this.multiple || this.value.length > 0));
  }

  view({
    attrs: {
      label = this.name,
      options,
      value,
      hint,
      error = 'Error',
      required = false,
      disabled = false,
    },
  }) {
    this.required = required;
    // update the selected value if set.
    if (value !== undefined) {
      this.value = value;
    }

    const focusedColorStyle = { color: `rgb(${theme.color_primary})` };
    const focusedBorderColorStyle = { borderColor: `rgb(${theme.color_primary})` };

    let textView = null;
    if (!this.valid) {
      textView = m('p.pe-select--error', error);
    } else if (hint) {
      textView = m('p', hint);
    }

    return m(
      'div',
      {
        id: `${this.name}-select`,
        className: [
          'pe-select',
          disabled ? 'pe-select--disabled' : null,
          !this.valid ? 'pe-select--invalid' : null,
        ].join(' '),
      },
      [
        m(
          'label',
          {
            for: `${this.name}-input`,
            className:
              this.focused || (this.value !== null && this.value.length > 0) ? 'transformed' : null,
            style: this.focused ? focusedColorStyle : null,
          },
          [label, required ? m('span', this.requiredIndicator) : undefined]
        ),
        m(
          '.pe-select--field',
          {
            id: `${this.name}-field`,
            role: 'button',
            tabIndex: disabled ? undefined : 0,
            style: this.focused ? focusedBorderColorStyle : null,
            onfocus: () => {
              this.focused = !disabled;
            },
            onblur: () => {
              this.focused = false;
            },
            onclick: () => {
              if (!disabled) {
                this.focused = true;
                this.isOpen = true;
              }
            },
          },
          m('div', [
            m('.pe-select--value', this._renderValue(options)),
            m('input', {
              type: 'hidden',
              name: this.name,
              id: `${this.name}-input`,
              value: this.value,
            }),
            m.trust(arrowDropdownIcon),
          ])
        ),
        textView,
        this._renderMenu(options),
      ]
    );
  }

  _renderValue(options) {
    if (this.value === null || this.value.length === 0) return '';

    if (this.multiple) {
      const labels = [];
      this.value.forEach(value => {
        const label = this.constructor._resolveLabel(value, options);
        labels.push(label);
      });
      return labels.join(', ');
    }
    return this.constructor._resolveLabel(this.value, options);
  }

  static _resolveLabel(value, options) {
    let label;
    options.some(option => {
      // Get label for the given value (if labels are provided)
      if (typeof option === 'object' && option !== null && value === option.value) {
        // eslint-disable-next-line prefer-destructuring
        label = option.label;
        return true;
      }
      if (value === option) {
        label = option;
        return true;
      }
      return false;
    });
    return label;
  }

  _renderMenu(options) {
    return m(Menu, {
      className: 'pe-select--menu',
      target: `#${this.name}-select`,
      show: this.isOpen,
      offsetV: 0,
      didHide: () => {
        this.isOpen = false;
      },
      content: m(
        List,
        options.map(option => {
          const isObject = typeof option === 'object' && option !== null;
          const label = isObject ? option.label : option;
          let selected;
          if (this.multiple) {
            selected = this.value && this.value.indexOf(isObject ? option.value : option) !== -1;
          } else {
            selected = this.value === (isObject ? option.value : option);
          }

          return m(ListTile, {
            title: label,
            hoverable: true,
            ink: true,
            highlight: selected,
            selected: !this.multiple ? selected : null,
            events: {
              onclick: () => {
                const value = isObject ? option.value : option;
                if (this.multiple) {
                  const i = this.value.indexOf(value);
                  if (i !== -1) {
                    this.value.splice(i, 1);
                  } else {
                    const newValue = [];
                    options.forEach(item => {
                      const isItemObject = typeof item === 'object' && item !== null;
                      const itemValue = isItemObject ? item.value : item;
                      if (this.value.indexOf(itemValue) !== -1 || value === itemValue) {
                        newValue.push(itemValue);
                      }
                    });
                    this.value = newValue;
                  }
                } else {
                  this.value = value;
                }
                this.validate();
                this.onChange({ value: this.value });
              },
            },
          });
        })
      ),
    });
  }
}
