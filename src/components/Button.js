import m from 'mithril';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from 'polythene-mithril-button';
import { ButtonCSS } from 'polythene-css';

ButtonCSS.addStyle('.blue-button', {
  color_light_background: '#3f51b5',
  color_light_text: 'white',
  color_dark_background: '#1f2d54',
  color_dark_text: 'white',
});

ButtonCSS.addStyle('.red-button', {
  color_light_background: '#e8462b',
  color_light_text: 'white',
  color_dark_background: '#e8462b',
  color_dark_text: 'white',
});

ButtonCSS.addStyle('.blue-flat-button', {
  color_light_background: 'transparent',
  color_light_border: '#3f51b5',
  color_light_text: '#3f51b5',
});

ButtonCSS.addStyle('.red-flat-button', {
  color_light_background: 'transparent',
  color_light_border: '#e8462b',
  color_light_text: '#e8462b',
});

ButtonCSS.addStyle('.flat-button', {
  color_light_background: 'transparent',
  color_light_border: 'black',
  color_light_text: 'black',
});

/**
 * Generic button component
 *
 * Attributes:
 *
 *   - `className` defaulting to `blue-button`
 *   - `element` HTML tag; defaulting to `button`
 *   - `tone` either `light` or `dark`; defaulting to `light`
 *   - `active` enables/disables the component; defaulting to `true`
 *   - `label` text shown on the button; defaulting to `Unnamed button`
 *   - `onclick` *optional*
 *
 * Examples:
 *
 *     m(ButtonComponent, { label: 'submit' })
 *     m(ButtonComponent, { className: 'anotherclass', label: 'submit' })
 *
 * @return {ButtonComponent} generic button as mithril component.
 */
export default class ButtonComponent {
  constructor(vnode) {
    this.defaultProps = {
      className: 'blue-button',
      element: 'button',
      disabled: vnode.attrs.active === false,
      label: 'Unnamed button',
      tone: 'light',
    };
  }

  onbeforeupdate(vnode) {
    this.defaultProps.disabled = vnode.attrs.active === false;
  }

  view(vnode) {
    return m(Button, { ...this.defaultProps, ...vnode.attrs });
  }
}
