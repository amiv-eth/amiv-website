import m from 'mithril';
import { Tabs } from 'polythene-mithril';
import { TabsCSS } from 'polythene-css';

TabsCSS.addStyle('.themed-tabs', {
  tab_max_width: 110,
  tab_min_width: 110,
  color_light: '#444',
  color_light_selected: '#ff1744',
  color_light_tab_indicator: '#ff1744',
  color_dark: '#ccc',
  color_dark_selected: '#c51162',
  color_dark_tab_indicator: '#c51162',
});

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
      className: 'themed-tabs',
      activeSelected: true,
    };
  }

  view(vnode) {
    return m(Tabs, { ...this.defaultProps, ...vnode.attrs });
  }
}
