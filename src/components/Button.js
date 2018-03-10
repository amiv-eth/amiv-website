import m from "mithril";
import { Button } from "polythene-mithril";
import "polythene-css";

export default class ButtonComponent {
    static view(vnode) {
        const defaultProps = {
            element: 'button',
            disabled: vnode.attrs.active === false,
            label: 'Unnamed button',
        }
        return m(Button, {...defaultProps, ...vnode.attrs});
    }
  }
  