import m from 'mithril';
import { Checkbox } from 'polythene-mithril';
import { CheckboxCSS } from 'polythene-css';

CheckboxCSS.addStyle('.my-checkbox', {});

export default class CheckboxComponent {
  constructor() {
    this.defaultProps = {
      className: 'my-checkbox',
      label: 'Unnamed checkbox',
    };
  }

  view(vnode) {
    return m(Checkbox, { ...this.defaultProps, ...vnode.attrs });
  }
}
