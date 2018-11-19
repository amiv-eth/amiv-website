import m from 'mithril';
import { TextField } from 'polythene-mithril';

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
 *   - `onChange` *optional*
 *   - *optional* all HTML input field options available.
 *
 * Examples:
 *
 *      m(TextField, {
            label: 'Enter search...',
            onChange: state => {
                this.search = state.value;
            },
          },
          '',
        )
 *
 * @return {TextFieldComponent} generic text field as mithril component.
 */
export default class TextFieldComponent {
  constructor() {
    this.defaultProps = {
      label: 'Unnamed TextField',
    };
  }

  onbeforeupdate(vnode) {
    this.defaultProps.disabled = vnode.attrs.active === false;
  }

  view(vnode) {
    return m(TextField, { ...this.defaultProps, ...vnode.attrs });
  }
}
