//@flow
import React, {PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {
    Button,
    Divider,
    Drawer,
    withStyles,
} from '@material-ui/core';
import AdminDrawerContent from '../components/AdminDrawerContent';
import {Close, Edit} from "@material-ui/icons";
import ToggleIcon from 'material-ui-toggle-icon';

type Props = {
    classes: Object,
    isAdmin: boolean,
}
type State = {
    open: boolean,
}
const styles = ({breakpoints, zIndex}) => ({
    button: {
        position: 'fixed',
        bottom: 82,
        right: 32,
        zIndex: zIndex.drawer + 200,
        [breakpoints.down('sm')]: {
            right: 16,
        }
    },
    container: {},
    drawer: {}
});

class AdminDrawer extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleOpen = () => this.setState({open: true});
    handleClose = () => this.setState({open: false});

    render() {
        const {classes, isAdmin} = this.props;
        const state = this.state;
        if (isAdmin) {
            return (
                <Fragment>
                    <Button
                        className={classes.button}
                        variant={'fab'}
                        color={'secondary'}
                        onClick={state.open ? this.handleClose : this.handleOpen}>
                        <ToggleIcon
                            on={state.open}
                            onIcon={<Close/>}
                            offIcon={<Edit/>}/>
                    </Button>
                    <Drawer
                        classes={{paper: classes.drawer}}
                        anchor={'bottom'}
                        open={state.open}>
                        <AdminDrawerContent drawerMode={true}/>
                    </Drawer>
                </Fragment>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.admin,
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(AdminDrawer))