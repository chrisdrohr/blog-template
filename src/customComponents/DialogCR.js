import React, {PureComponent} from 'react';
import {
    Dialog,
    Grow,
    withStyles,
    withWidth,
} from '@material-ui/core';
import * as classnames from "classnames";
import {dev} from "../Constants";

function Transition(props) {
    return <Grow
        style={{
            transformOrigin: '' + props.x + 'px ' + props.y + 'px'
        }}
        {...props} />;
}

const styles = theme => ({
    dialog: {
        transition: theme.transitions.create('transform',
            theme.transitions.duration.standard,
            theme.transitions.easing.easeInOut) + '!important',
    },
});

class DialogCR extends PureComponent {
    getDem = async id => {
        const element = await document.getElementById(id);
        if (element !== null) {
            const node = await element.getBoundingClientRect();
            const {height, width, x, y} = node;
            {
                dev && console.log(id, height, width, x, y)
            }
            this.setState({
                height: height,
                width: width,
                x: x,
                y: y,
                ready: true,
            });
        } else {
            {
                dev && console.log(id, "element is null :")
            }
        }
    };
    setEntered = () => this.setState({entered: true});

    constructor(props) {
        super(props);
        this.state = {
            entered: false,
            height: null,
            width: null,
            x: null,
            y: null,
            ready: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.ready && this.props.open) {
            this.getDem(this.props.targetKey);
        }
        if (prevState.ready && !this.props.open) {
            this.setState({
                entered: false,
                height: null,
                width: null,
                x: null,
                y: null,
                ready: false
            })
        }
    }

    render() {
        const {
            className,
            classes,
            children,
            targetKey,
            onClose,
            open,
            width,
        } = this.props;

        const {height, x, y, ready, entered} = this.state;
        const dem = {
            height: height,
            width: width,
            x: x,
            y: y,
        };
        return (
            <Dialog
                classes={{
                    paper: classnames({
                        [classes.dialog]: true,
                        [className]: Boolean(className)
                    }),
                    root: classnames({})
                }}
                open={open && ready}
                onClose={onClose}
                onEntered={this.setEntered}
                TransitionComponent={Transition}
                TransitionProps={{
                    x: x,
                    y: y,
                }}>
                {children}
            </Dialog>
        )
    }
}

export default withStyles(styles)(withWidth()(DialogCR))