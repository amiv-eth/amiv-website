import m from 'mithril';
import { Button, Checkbox, Dropdown, TextField, RadioGroup } from '../components';

/**
 * FilterViewComponent
 *
 * Attributes:
 *
 *   - `onchange` used to apply the new filter.
 *   - `fields` specifies filter configuration
 *
 * `fields` example:
 *
 * ```json
 * [
 *   {
 *     type: 'text',
 *     key: 'key1',
 *     label: 'some label',
 *     default: 'default value',
 *     // minimum length required to trigger `onchange`
 *     min_length: 3,
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
 *     type: 'dropdown',
 *     key: 'key3',
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
 *     type: 'button',
 *     key: 'key5',
 *     label: 'some label',
 *     events: {
 *       onclick: () => dosomething(),
 *     },
 *   },
 * ]
 * ```
 *
 * Default behavior of buttons is to trigger `onchange`.
 */

export default class FilterViewComponent {
  oninit(vnode) {
    this.onchange = vnode.attrs.onchange;
    if (vnode.attrs.values) {
      this.values = vnode.attrs.values;
    } else {
      this.values = {};
      vnode.attrs.fields.forEach(field => {
        this.values[field.key] = field.default || '';
      });
    }
  }

  notify() {
    this.onchange(this.values);
  }

  _createTextField(field) {
    const min_length = field.min_length || 0;
    this.values[field.key] = this.values[field.key] || field.default || '';

    return m(TextField, {
      label: field.label || '',
      value: this.values[field.key],
      onChange: state => {
        this.values[field.key] = state.value;
        if (state.value.length >= min_length || state.value.length === 0) {
          this.notify();
        }
      },
    });
  }

  _createCheckboxGroup(field) {
    const items = [];
    this.values[field.key] = this.values[field.key] || field.default || [];

    if (field.label) {
      items.push(m('h4', field.label));
    }

    if (typeof field.values === 'function') {
      const values = field.values(this.values);
      values.map(item => items.push(this._createCheckbox(field.key, item.label, item.value)));
    } else {
      field.values.map(item => items.push(this._createCheckbox(field.key, item.label, item.value)));
    }

    return m('div.check', items);
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
    this.values[field.key] = this.values[field.key] || field.default || [];

    const radioValues = JSON.parse(JSON.stringify(field.values));

    return m('div.radio', [
      field.label ? m('h4', field.label) : m(''),
      m(RadioGroup, {
        buttons: radioValues.map(value => {
          const radioValue = value;
          if (this.values[field.key] === value.value) {
            radioValue.defaultChecked = true;
          }
          return radioValue;
        }),
        name: field.key,
        onChange: state => {
          this.values[field.key] = state.value;
          this.notify();
        },
      }),
    ]);
  }

  _createDropdown(field) {
    const options = {};
    this.values[field.key] = this.values[field.key] || field.default || '';

    if (typeof field.values === 'function') {
      options.data = field.values(this.values);
    } else {
      options.data = field.values;
    }

    if (field.disabled) {
      if (typeof field.disabled === 'function') {
        options.disabled = field.disabled();
      } else {
        options.disabled = field.disabled;
      }
    }

    let invalidSelection = true;
    options.data.forEach(item => {
      if (item.value === this.values[field.key]) {
        invalidSelection = false;
      }
    });
    if (invalidSelection) {
      this.values[field.key] = field.default || '';
    }

    options.selected = this.values[field.key];
    options.onchange = event => {
      this.values[field.key] = event.target.value;
      this.notify();
    };

    return m(Dropdown, options);
  }

  _createButton(options) {
    const events = options.events || {};
    if (!events.onclick) {
      // default onclick behavior
      events.onclick = () => this.notify();
    }

    return m(Button, {
      label: options.label,
      events,
    });
  }

  view(vnode) {
    const { fields } = vnode.attrs;
    const views = [];

    fields.forEach(field => {
      if (field.type === 'text') {
        views.push(this._createTextField(field));
      } else if (field.type === 'checkbox') {
        views.push(this._createCheckboxGroup(field));
      } else if (field.type === 'radio') {
        views.push(this._createRadioGroup(field));
      } else if (field.type === 'dropdown') {
        views.push(this._createDropdown(field));
      } else if (field.type === 'button') {
        views.push(this._createButton(field));
      }
    });

    return views;
  }
}
