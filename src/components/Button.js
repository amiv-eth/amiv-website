import m from "mithril";
import { Button } from "polythene-mithril";
import { ButtonCSS } from "polythene-css";

ButtonCSS.addStyle(".blue-button", {
    color_light_background: "blue",
    color_light_text:       "white"
})

export default class ButtonComponent {
    static view(vnode) {
        const defaultProps = {
            className: "blue-button",
            element: 'button',
            disabled: vnode.attrs.active === false,
            label: 'Unnamed button',
        }
        return m(Button, {...defaultProps, ...vnode.attrs});
    }
  }
  