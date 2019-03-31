import m from 'mithril';
import { Search } from 'polythene-mithril-search';
import { Shadow } from 'polythene-mithril-shadow';
import { IconButton } from 'polythene-mithril-icon-button';
import RadioGroup from 'amiv-web-ui-components/src/radioGroup';
import debounce from 'amiv-web-ui-components/src/debounce';
import icons from 'amiv-web-ui-components/src/icons';
import Button from './Button';
import Checkbox from './Checkbox';
import Select from './Select';
import TextField from './TextField';
import { isLsdTripEnabled, getTadaAnimation } from '../models/lsd';
import './FilterView.less';

/**
 * FilterViewComponent
 *
 * @param {function} onchange Callback function to apply the new filter
 *   Example: function callback(values) { ... }
 * @param {object}   values   Values to be applied to the filter fields
 * @param {object}   fields   Specifies the filter configuration
 * @param {integer}  delay    Time in milliseconds used to debounce the call to onchange
 *
 * `fields` example:
 *
 * ```javascript
 * [
 *   {
 *     type: 'text',
 *     key: 'key1',
 *     label: 'some label',
 *     default: 'default value',
 *   },
 *   {
 *     type: 'checkbox',
 *     key: 'key2',
 *     label: 'group label',
 *     default: ['value1', 'value2'],
 *     values: [
 *       { label: 'Label 1', value: 'value1' },
 *       { label: 'Label 2', value: 'value2' },
 *       { label: 'Label 3', value: 'value3' },
 *     ],
 *   },
 *   {
 *     type: 'radio',
 *     key: 'key_radio',
 *     default: 'value2',
 *     values: [
 *       { label: 'Label 1', value: 'value1' },
 *       { label: 'Label 2', value: 'value2' },
 *       { label: 'Label 3', value: 'value3' },
 *     ],
 *   },
 *   {
 *     type: 'select',
 *     key: 'key3',
 *     multiple: true,
 *     hint: 'hint message',
 *     // Called whenever the selection has changed.
 *     // This allows to add some additional logic to the
 *     // allowed selection when multiple is set to true.
 *     adjustSelection: (newValue, currentValue) => newValue,
 *     default: 'value2',
 *     values: [
 *       { label: 'Label 1', value: 'value1' },
 *       { label: 'Label 2', value: 'value2' },
 *       { label: 'Label 3', value: 'value3' },
 *     ],
 *   },
 *   {
 *     type: 'dropdown',
 *     key: 'key4',
 *     default: 'value2',
 *     values: values => [],
 *   },
 *   {
 *     type: 'hr',
 *     width: '1px',
 *   },
 *   {
 *     type: 'custom',
 *     content: m('div', 'This is a custom view!'),
 *   },
 *   {
 *     type: 'button',
 *     key: 'key5',
 *     label: 'some label',
 *     events: {
 *       onclick: () => dosomething(),
 *     },
 *   },
 *   {
 *     type: 'button',
 *     label: 'search button',
 *     events: {
 *       onclick: 'search',
 *     },
 *   },
 *   {
 *     type: 'button',
 *     label: 'reset button',
 *     events: {
 *       onclick: 'reset',
 *     },
 *   },
 * ]
 * ```
 *
 * Default behavior of buttons is to trigger `onchange`.
 * Other configurable values are `search` and `reset`.
 */

export default class FilterViewComponent {
  oninit({ attrs: { values, fields, delay = 500, onchange } }) {
    this.onchange = debounce(onchange, delay, false);

    if (values && Object.keys(values).length >= 0) {
      this.values = values;
      this.previousValues = JSON.stringify(this.values);
    } else {
      this.values = {};
      fields.forEach(field => {
        this.values[field.key] = field.default || '';
      });
      this.previousValues = JSON.stringify(this.values);
    }
    this.fields = fields;
    this.notify();
  }

  notify() {
    if (JSON.stringify(this.values) !== this.previousValues) {
      this.onchange(this.values);
    }
  }

  reset() {
    this.fields.forEach(field => {
      if (field.default instanceof Array) {
        this.values[field.key] = JSON.parse(JSON.stringify(field.default || []));
      } else {
        this.values[field.key] = field.default || '';
      }
    });
    this.notify();
  }

  _createSearchField(field) {
    this.values[field.key] = this.values[field.key] || field.default || '';

    const clearButton = m(IconButton, {
      icon: { svg: { content: m.trust(icons.clear) } },
      ink: false,
      events: {
        onclick: () => {
          this.values[field.key] = '';
          this.notify();
        },
      },
    });

    return m(Search, {
      style: isLsdTripEnabled() ? getTadaAnimation() : null,
      textfield: {
        label: field.label || '',
        value: this.values[field.key],
        onChange: state => {
          this.values[field.key] = state.value;
          this.notify();
        },
      },
      before: m(Shadow),
      buttons: {
        dirty: {
          after: clearButton,
        },
        focus_dirty: {
          after: clearButton,
        },
      },
    });
  }

  _createTextField(field) {
    this.values[field.key] = this.values[field.key] || field.default || '';

    return m(TextField, {
      style: isLsdTripEnabled() ? getTadaAnimation() : null,
      label: field.label || '',
      value: this.values[field.key],
      onChange: state => {
        this.values[field.key] = state.value;
        this.notify();
      },
    });
  }

  _createCheckboxGroup(field) {
    const items = [];
    this.values[field.key] =
      this.values[field.key] || JSON.parse(JSON.stringify(field.default || []));

    if (field.label) {
      items.push(m('h4', field.label));
    }

    if (typeof field.values === 'function') {
      const values = field.values(this.values);
      values.map(item => items.push(this._createCheckbox(field.key, item.label, item.value)));
    } else {
      field.values.map(item => items.push(this._createCheckbox(field.key, item.label, item.value)));
    }

    return m('div.check', { style: isLsdTripEnabled() ? getTadaAnimation() : null }, items);
  }

  _createCheckbox(key, label, value) {
    return m(Checkbox, {
      checked: this.values[key].includes(value),
      onChange: state => {
        if (state.checked) {
          this.values[key].push(value);
        } else {
          const i = this.values[key].indexOf(value);
          if (i !== -1) {
            this.values[key].splice(i, 1);
          }
        }
        this.notify();
      },
      label,
    });
  }

  _createRadioGroup(field) {
    return m('div.radio', { style: isLsdTripEnabled() ? getTadaAnimation() : null }, [
      field.label ? m('h4', field.label) : m(''),
      m(RadioGroup, {
        ...field,
        value: this.values[field.key],
        onChange: state => {
          this.values[field.key] = state;
          this.notify();
        },
      }),
    ]);
  }

  _createSelect(field) {
    const options = {};
    if (!this.values[field.key]) {
      this.values[field.key] = field.default || '';
    }

    let values;
    if (typeof field.values === 'function') {
      values = field.values(this.values);
    } else {
      // eslint-disable-next-line prefer-destructuring
      values = field.values;
    }

    if (field.disabled) {
      if (typeof field.disabled === 'function') {
        if (field.disabled()) {
          options.disabled = true;
        }
      } else {
        options.disabled = field.disabled;
      }
    }

    options.name = field.key;
    options.label = field.label;
    options.value = this.values[field.key];
    options.multiple = field.multiple || false;
    options.hint = field.hint;
    options.adjustSelection = field.adjustSelection ? field.adjustSelection : value => value;
    options.options = values;
    options.onChange = ({ value }) => {
      this.values[field.key] = options.adjustSelection(value, this.values[field.key]);
      this.notify();
    };

    return m(
      'div',
      { style: `width:100%;display:grid;${isLsdTripEnabled() ? getTadaAnimation() : ''}` },
      m(Select, options)
    );
  }

  _createButton(field) {
    const options = { label: field.label, events: field.events || {} };

    if (!options.events.onclick || options.events.onclick === 'search') {
      // default onclick behavior / search behavior
      options.events.onclick = () => this.notify();
    } else if (options.events.onclick === 'reset') {
      // reset behavior
      options.events.onclick = () => this.reset();
    }

    if (field.className) {
      options.className = field.className;
    }

    return m(
      'div',
      { style: `width:100%;display:grid;${isLsdTripEnabled() ? getTadaAnimation() : ''}` },
      m(Button, options)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _createHorizontalRule(field) {
    return m('hr.filter_view__hr', { style: { borderWidth: field.width } });
  }

  // eslint-disable-next-line class-methods-use-this
  _createCustomView(field) {
    return field.content;
  }

  view({ attrs: { values } }) {
    const argValuesJson = JSON.stringify(values);
    const curValuesJson = JSON.stringify(this.values);

    if (argValuesJson !== curValuesJson && argValuesJson !== this.previousValues) {
      this.previousValues = curValuesJson;
      this.values = values;
      this.notify();
    }

    const views = [];

    m('div#filter-page-style', [
      this.fields.forEach(field => {
        if (field.type === 'search') {
          views.push(this._createSearchField(field));
        } else if (field.type === 'text') {
          views.push(this._createTextField(field));
        } else if (field.type === 'checkbox') {
          views.push(this._createCheckboxGroup(field));
        } else if (field.type === 'radio') {
          views.push(this._createRadioGroup(field));
        } else if (field.type === 'select') {
          views.push(this._createSelect(field));
        } else if (field.type === 'button') {
          views.push(this._createButton(field));
        } else if (field.type === 'hr') {
          views.push(this._createHorizontalRule(field));
        } else if (field.type === 'custom') {
          views.push(this._createCustomView(field));
        }
      }),
    ]);

    return views;
  }
}
