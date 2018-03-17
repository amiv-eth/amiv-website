import m from 'mithril';
import { Checkbox } from 'polythene-mithril';

export default class CheckboxComponent {
  constructor() {
    this.defaultProps = {};
  }

  view(vnode) {
    return m(Checkbox, { ...this.defaultProps, ...vnode.attrs });
  }
}
