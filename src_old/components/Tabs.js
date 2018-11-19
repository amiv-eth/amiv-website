import m from 'mithril';
import { Tabs } from 'polythene-mithril';

/**
 * Generic Tab component
 *
 * Attributes:
 *
 *   - `tabs` list of button options
 *   - `className` defaulting to `themed-tabs`
 *   - `activeSelected` if true, the active tab is selected.
 *   - `onChange` *optional*
 *
 * Examples:
 *
 *     m(TabComponent, {
 *         tabs: [
 *             { label: 'Tab 1', url: { href: '/tab1', onupdate: m.route.link, index: 0 } },
 *             { label: 'Tab 2', url: { href: '/tab2', onupdate: m.route.link, index: 1 } },
 *         ],
 *         className: 'themed-tabs',
 *         activeSelected: true,
 *         element: 'tab',
 *         selectedTab: this._selectedTabIndex,
 *     })
 *
 * @return {TabComponent} generic tabs as mithril component.
 */
export default class TabComponent {
  constructor() {
    this.defaultProps = {
      activeSelected: true,
    };
  }

  view(vnode) {
    return m(Tabs, { ...this.defaultProps, ...vnode.attrs });
  }
}
