import m from 'mithril';

/**
 * Generic Dropdown component
 *
 * Attributes:
 *
 *   - `data` array containing objects like `{ id: 1, name: 'Value 1' }`
 *   - `onchange` *optional*
 *
 * Examples:
 *
 *     m(DropdownComponent, {
 *         data: [
 *             { id: 1, name: 'Value 1' },
 *             { id: 2, name: 'Value 2' },
 *         ],
 *         onchange: event => {
 *             // some event handling
 *         },
 *     })
 *
 * @return {DropdownComponent} generic dropdown input as mithril component.
 */
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
