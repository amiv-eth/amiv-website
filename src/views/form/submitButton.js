import m from 'mithril';

export default class SubmitButton {
  static view(vnode) {
    const { args } = vnode.attrs;
    if (!vnode.attrs.active) {
      args.disabled = 'disabled';
    }
    return m('button[type=button]', args, vnode.attrs.text);
  }
}
