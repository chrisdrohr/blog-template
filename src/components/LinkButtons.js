import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../actions';
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import {Home, ContactMail, FormatQuote, Portrait, Subscriptions, AccountBox, Person} from '@material-ui/icons';
import {links} from "../Constants";
import Link from '../customComponents/Link';
import YouTubeSubscribeButton from './YouTubeSubscribeButton';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
   icon: {
       height: 15,
       width: 15,
       marginRight: 5,
   },
    button: {
       color: 'white'
    }
});
const LinkButtons = props => {
        const {isAdmin, classes, theme} = props;
        const headerEnabled = theme.data.header;
        const getIcon = (icon) => {
            switch(icon) {
                case 'home': return <Home className={classes.icon}/>;
                case 'about': return <Portrait className={classes.icon}/>;
                case 'blog': return <FormatQuote className={classes.icon}/>;
                case 'vlog': return <Subscriptions className={classes.icon}/>;
                case 'contact': return <ContactMail className={classes.icon}/>;
                case 'admin': return <AccountBox className={classes.icon}/>;
                case 'signOut': return <Person className={classes.icon}/>;
                default: return null;
            }
        };
        const linkButtons = Object.values(links).map((button) => {
            const isSignOutButton = button.title === links.signOut.title;
            // const isVlogButton = button.title === links.vlog.title;
            const isAdminButton = button.title === links.admin.title;
            if (isSignOutButton && !isAdmin || isAdminButton && !isAdmin) {return null}
            if (props.type === 'list') {
                return (
                    <Link key={button.title} actual={true} to={button.url}>
                        <ListItem
                            onClick={isSignOutButton ? signOut() : undefined}
                            button={true}>
                            <ListItemIcon>
                            {getIcon(button.icon)}
                            </ListItemIcon>
                            <ListItemText secondary={button.title}/>
                        </ListItem>
                    </Link>
                )
            } else {
                return (
                    <Link
                        key={button.title}
                        actual={true}
                        to={button.url}>
                        <Button
                            className={headerEnabled ? classes.button : undefined}
                            onClick={isSignOutButton ? signOut() : undefined}>
                            {getIcon(button.icon)}
                            {button.title}
                        </Button>
                    </Link>
                )
            }
        });
        if (props.type === 'list') {
            return (
                <List>
                    {linkButtons}
                    <YouTubeSubscribeButton/>
                </List>
            )
        } else {
            return (linkButtons)
        }
};

function mapStateToProps(state) {
    return {
        theme: state.theme,
    }
}
export default connect(mapStateToProps, null)(withStyles(styles)(LinkButtons))
