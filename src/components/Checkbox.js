import m from 'mithril';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Checkbox } from 'polythene-mithril-checkbox';

/**
 * Generic Checkbox component
 *
 * Attributes:
 *
 *   - `label` text label; no default value
 *   - `name` element name
 *   - `className` *optional*
 *   - `defaultChecked` *optional* static value; default `false`
 *   - `checked` *optional* managed state; default `false`
 *   - `disabled` *optional* set `true` to disable the checkbox
 *   - `onChange` *optional*
 *
 * Examples:
 *
 *     m(CheckboxComponent, { name: 'terms', label: 'Accept terms' })
 *
 * @return {CheckboxComponent} generic checkbox as mithril component.
 */
export default class CheckboxComponent {
  constructor() {
    this.defaultProps = {};
  }

  view(vnode) {
    return m(Checkbox, { ...this.defaultProps, ...vnode.attrs });
  }
}
