import m from 'mithril';
import { TextField } from 'polythene-mithril';
import { TextFieldCSS } from 'polythene-css';

TextFieldCSS.addStyle('.my-TextField', {});

export default class TextFieldComponent {
  constructor() {
    this.defaultProps = {
      className: 'my-TextField',
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
