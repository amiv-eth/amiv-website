import m from 'mithril';
import { Checkbox } from "polythene-mithril"
import { CheckboxCSS } from 'polythene-css';

export default class CheckboxComponent {
  constructor(vnode) {
    this.defaultProps = {
      className: 'themed-checkbox',
      element: 'checkbox',
      disabled: vnode.attrs.active === false,
      label: 'Unnamed checkbox',
    };
  }

  view(vnode) {
    return m(Checkbox, { ...this.defaultProps, ...vnode.attrs });
  }
}
