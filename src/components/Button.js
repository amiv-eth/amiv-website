import m from "mithril";
import { Button } from "polythene-mithril";
import "polythene-css";

const defaultProps = {
    element: 'button',
}

const ButtonComponent = props => {
    return m(Button, {...defaultProps, ...props});
}

export default ButtonComponent;