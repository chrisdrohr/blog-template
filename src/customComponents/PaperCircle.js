import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {secondary} from "../Colors";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    roundedSm: {
        borderRadius: '50%',
        width: 40,
        height: 40,
        // backgroundColor: 'transparent',
        // background: ' rgba(255,255,255,.8)',
    },
    rounded: {
        borderRadius: '50%',
        borderStyle: 'solid',
        borderColor: 'white',
        width: 44,
        height: 44,
    },
    roundedColor: {
        borderRadius: '50%',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.light,
        width: 44,
        height: 44,
    },
    roundedMd: {
        borderRadius: '50%',
        width: 50,
        height: 50,
    },
    roundedLg: {
        borderRadius: '50%',
        width: 70,
        height: 70,
        margin: '0 auto',
        marginBottom: 5,
    },
    roundedXl: {
        borderRadius: '50%',
        width: 150,
        height: 150,
        margin: '0 auto',
        marginBottom: 5,
    },
});
class PaperCircle extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {classes, avatar, md, lg, sm, color, xl, children} = this.props;
        if (md) {this.class = classes.roundedMd}
        else if (lg) {this.class = classes.roundedLg}
        else if (xl) {this.class = classes.roundedXl}
        else if (sm) {this.class = classes.roundedSm}
        else if (color) {this.class = classes.roundedColor}
        else {this.class = classes.rounded}
        return (
            <div>
                <Paper className={this.class} elevation={4}>
                    {avatar}
                    {children}
                </Paper>
            </div>
        );
    }

}


PaperCircle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperCircle);