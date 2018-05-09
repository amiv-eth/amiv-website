import m from 'mithril';

/**
 * @return {DropdownComponent} generic dropdown input as mithril component.
 */
export default class DropdownComponent {
  oninit(vnode) {
    this.selectedId = vnode.attrs.selectedId || 0;
  }

  view(vnode) {
    return m(
      'select',
      { onchange: m.withAttr('value', this.selectedId), ...this.defaultProps, ...vnode.attrs },
      [
        vnode.attrs.data.map(item =>
          m(
            'option',
            { value: item.value, selected: vnode.attrs.selected === item.value },
            item.label
          )
        ),
      ]
    );
  }
}
