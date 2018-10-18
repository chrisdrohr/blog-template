import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';

const styles = {
    root: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    paper: {
        backgroundColor: 'transparent'
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
};

class ToolbarCR extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes, content} = this.props;
        return (
            <Toolbar classes={classes}>
                {content}
            </Toolbar>
        )
    }
}

export default withStyles(styles)(ToolbarCR)