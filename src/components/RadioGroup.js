import m from 'mithril';
import { RadioGroup } from 'polythene-mithril';
// import { RadioGroupCSS } from 'polythene-css';

// RadioGroupCSS.addStyle('', {})

/**
 * Generic RadioGroup component
 *
 * Attributes:
 *
 *   - `buttons` list of radio button options
 *   - `name` field name
 *   - `className` *optional*
 *   - `onChange` *optional*
 *
 * Examples:
 *
 *     m(RadioGroupComponent, {
 *         buttons: ['Option 1', 'Option 2'],
 *         name: 'optionName',
 *     })
 *
 * @return {RadioGroupComponent} generic checkbox as mithril component.
 */
export default class RadioGroupComponent {
  constructor() {
    this.defaultProps = {
      // className: 'blue-RadioGroup',
    };
  }

  view(vnode) {
    return m(RadioGroup, { ...this.defaultProps, ...vnode.attrs });
  }
}
