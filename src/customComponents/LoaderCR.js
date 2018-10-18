import React from 'react';
import {CircularProgress, Paper} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';

const styles = {

    container: {
        display: 'flex',
        height: '50vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        height: 50,
        width: 50,
        borderRadius: '50%',
        padding: 5,
    }
};
const LoaderCR = props => (
    <div className={props.classes.container}>
        <div className={props.classes.paper}>
            <CircularProgress size={props.size ? props.size : 40}/>
        </div>
    </div>
);
export default withStyles(styles)(LoaderCR)