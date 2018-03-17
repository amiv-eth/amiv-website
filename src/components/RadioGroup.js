import m from 'mithril';
import { RadioGroup } from 'polythene-mithril';
// import { RadioGroupCSS } from 'polythene-css';

// RadioGroupCSS.addStyle('', {})

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
