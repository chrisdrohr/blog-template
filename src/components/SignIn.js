// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from 'firebase';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {withStyles} from '@material-ui/core';
import * as actions from '../actions';

const styles = (theme: Object) => ({
    container: {
        margin: 'auto',
        // maxWidth: 'min-content',
        padding: 5
    },

});

type Props = {
    classes: Object,
};
type State = {
};

class Auth extends Component<Props, State> {
    constructor(props) {
        super(props);

    }

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    componentDidMount() {
        this.unregisterAuthObserver = auth().onAuthStateChanged((user: Object) => {
            if (user !== null) {
                console.log(user.uid, 'SignedIn')
            } else {
                console.log('User not signed in')
            }
        });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <StyledFirebaseAuth
                    firebaseAuth={auth()}
                    uiConfig={this.uiConfig}/>
            </div>
        );
    }
}

export default connect(null, actions)(withStyles(styles)(Auth))
