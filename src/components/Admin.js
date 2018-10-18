import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import SignIn from './SignIn';
import AdminDrawerContent from './AdminDrawerContent';
import {withStyles} from '@material-ui/core/styles';
import {Slide} from '@material-ui/core';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 'calc(30vh - 112px)'
    }
};
const Admin = props => {
    const {classes} = props;
        if (props.user.loggedIn && props.isAdmin) {
            return (
                <div>
                    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    {/*<ButtonCR*/}
                        {/*raised={true}*/}
                        {/*label={'do stuff'}*/}
                        {/*onClickFunction={props.doStuff}/>*/}
                    <AdminDrawerContent/>
                    </Slide>
                </div>

            )
        }
        return (
            <div className={classes.container}>
                <SignIn/>
            </div>
        )

};
function mapStateToProps(state) {
    return {
        user: state.user,
        isAdmin: state.admin,
    }
}
export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(Admin)))