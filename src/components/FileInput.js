import m from 'mithril';
import './FileInput.less';

export default class FileInputComponent {
  constructor() {
    this.defaultProps = { type: 'file' };
  }

  view(vnode) {
    return m('input', { ...this.defaultProps, ...vnode.attrs });
  }
}
