import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Slide,
    withStyles
} from '@material-ui/core';
import YouTube from '../YouTube';

const styles = theme => ({});

class Vlog extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <div>
                    <YouTube/>
                </div>
            </Slide>
        )
    }
}

export default withRouter(withStyles(styles)(Vlog))