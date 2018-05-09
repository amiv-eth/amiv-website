import m from 'mithril';

/**
 * Generic Dropdown component
 *
 * Attributes:
 *
 *   - `data` array containing available options for selection
 *   - `selected` *optional* set value of the option which should be selected (default: first option)
 *   - `onchange` *optional* event handler when the selection has changed
 *
 * Examples:
 *
 *     m(DropdownComponent, {
 *         data: [
 *             { label: 'Label 1', value: 'value1' },
 *             { label: 'Label 2', value: 'value2' },
 *         ],
 *         selected: this.values[field.key],
 *         onchange: event => {
 *             // some event handling
 *         },
 *     })
 *
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
