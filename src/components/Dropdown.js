import m from 'mithril';

export default class DropdownComponent {
  constructor() {
    this.selectedId = 0;
  }
  view(vnode) {
    return m(
      'select',
      { onchange: m.withAttr('value', vnode.selectedId), ...this.defaultProps, ...vnode.attrs },
      [vnode.attrs.data.map(label => m('option', { value: label.id }, label.name))]
    );
  }
}
