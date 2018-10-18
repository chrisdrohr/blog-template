import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Slide} from '@material-ui/core';

const styles = theme => ({
    // container: {
    //     minHeight: 'calc(100vh - 168px)',
    //     padding: 8,
    //     display: 'flex',
    //     alignItems: 'center',
    //     [theme.breakpoints.up('sm')]: {
    //         minHeight: 'calc(100vh - 300px)',
    //         padding: 8
    //     }
    // }
});
const Display = withStyles(styles)(props => {
    return (
        <div>

        </div>
    )
});
const Home = props => {
    return (

        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div>
            </div>
        </Slide>

    )
};
export default withStyles(styles)(Home)