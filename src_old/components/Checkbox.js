import m from 'mithril';
import { Checkbox } from 'polythene-mithril';

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
