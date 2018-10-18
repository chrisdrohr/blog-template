import React, {Component} from 'react';
import {auth} from "../Firebase";
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
export default class SignOutCR extends Component {

    handleSignOut = () => {
        auth().signOut();
        console.log('Vendor signed out');
    };

    render() {
        return (
            <ListItem button={true}>
                <ListItemIcon>
                    <PersonOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary={"Sign Out"}/>
            </ListItem>
        )
    }
}