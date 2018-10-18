import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {
    BottomNavigation,
    BottomNavigationAction,
    Hidden
} from '@material-ui/core';
import {links} from "../Constants";
import {withRouter} from 'react-router-dom';
import {Home, ContactMail, FormatQuote, Portrait, Subscriptions, AccountBox} from '@material-ui/icons';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    nav: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0
    },
    spacer: {
        height: 56,
    }
};

class BottomNav extends PureComponent {
    getButtons() {
        const {history, isAdmin} = this.props;
        return Object.values(links).map((button, i) => {
            const isSignOutButton = button.title === links.signOut.title;
            // const isVlogButton = button.title === links.vlog.title;
            const isAdminButton = button.title === links.admin.title;
            if (isSignOutButton || isAdminButton && !isAdmin) {return null}
            {
                return (
                    <BottomNavigationAction
                        key={i}
                        value={i}
                        label={button.title}
                        icon={this.getIcon(button.icon)}
                        onClick={() => history.push(button.url)}/>
                )
            }
        })
    }
    getIcon(icon) {
        switch(icon) {
            case 'home': return <Home/>;
            case 'about': return <Portrait/>;
            // case 'blog': return <FormatQuote/>;
            case 'vlog': return <Subscriptions/>;
            case 'contact': return <ContactMail/>;
            case 'admin': return <AccountBox/>;
        }
    }
    render() {
        const {
            classes,
            pathName
        } = this.props;
        return (
                <Hidden smUp>
                        <BottomNavigation
                            className={classes.nav}
                            value={pathName.value}
                            onChange={this.handleChange}
                            showLabels={true}>
                            {this.getButtons()}
                        </BottomNavigation>
                    <div className={classes.spacer}></div>
                </Hidden>
        )
    }
}
function mapStateToProps(state) {
    return {
        pathName: state.pathName,
        isAdmin: state.admin,
    }
}
export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(BottomNav)))