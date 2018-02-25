import m from 'mithril';

export default class Button {
  static view(vnode) {
    let { args } = vnode.attrs;
    if (args === undefined) {
      args = {};
    }
    if (args.type === undefined) {
      args.type = 'button';
    }
    if (!vnode.attrs.active) {
      args.disabled = 'disabled';
    }
    return m('button', args, vnode.attrs.title);
  }
}
