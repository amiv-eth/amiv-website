import m from 'mithril';
import { RadioGroup } from 'polythene-mithril';

export default class RadioGroupComponent {
  constructor(vnode) {
    this.defaultProps = {
      className: 'blue-RadioGroup',
      element: 'RadioGroup',
      disabled: vnode.attrs.active === false,
      label: 'Unnamed RadioGroup',
    };
  }

  view(vnode) {
    return m(RadioGroup, { ...this.defaultProps, ...vnode.attrs });
  }
}
