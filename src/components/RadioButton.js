import m from 'mithril';
import { RadioButton } from 'polythene-mithril';

export default class RadioButtonComponent {
  constructor() {
    this.defaultProps = {
      // className: 'blue-RadioButton',
    };
  }

  view(vnode) {
    return m(RadioButton, { ...this.defaultProps, ...vnode.attrs });
  }
}
