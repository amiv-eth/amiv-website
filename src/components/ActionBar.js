import m from 'mithril';
import './ActionBar.less';

export default class ActionBarComponent {
  /**
   * Generic action bar component
   *
   * @param {string}  attrs        All other attributes are assigned to the container.
   * @param {string}  attrs.left   Buttons to place on the left side.
   * @param {string}  attrs.right  Buttons to place on the right side.
   *
   * Example:
   *   ```javascript
   *     m(TooltipComponent, {
   *         left: [m(Button, { label: 'btn left'})],
   *         right: [m(Button, { label: 'btn right'})],
   *     })
   *   ```
   */

  static view({ attrs: { left, right, ...attrs } }) {
    return m('.pe-actionbar', attrs, m('div', left), m('div', right));
  }
}
