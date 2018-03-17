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

export default class TabComponent {
  constructor() {
    this.defaultProps = {
      className: 'themed-tabs',
    };
  }

  view(vnode) {
    return m(Tabs, { ...this.defaultProps, ...vnode.attrs });
  }
}
