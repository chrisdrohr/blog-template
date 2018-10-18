import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';

class IconButtonCR extends Component {
    render() {
        const {onClickFunction, icon, id, className} = this.props;
        return (
            <IconButton className={className} id={id} onClick={onClickFunction}>
                {icon}
            </IconButton>
        )
    }
}
export default IconButtonCR