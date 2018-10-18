import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Grid from 'material-ui/Grid';
import ContactListItem from '../customComponents/ContactListItem';
import EmptyState from '../customComponents/EmptyState';
import IconButtonCR from "../customComponents/IconButtonCR";
import {Delete, Message} from '@material-ui/icons';


class AdminContacts extends Component {

    componentWillMount() {
        const {fetchContacts, contacts} = this.props;
        if (!contacts.fetching) {fetchContacts()}
    }
    getContacts() {
        const {contacts, deleteContact} = this.props;
        if (contacts.fetched) {
            if (contacts.data.length !== 0) {
                const contactsList = Object.values(contacts.data).map((contact, i) => {
                    return (
                        <Grid key={i} item lg={4} md={4} sm={6} xs={12}>
                            <ContactListItem
                                key={i}
                                contact={contact}
                                actions={[
                                    <IconButtonCR
                                        key={0}
                                        icon={<Delete/>}
                                        onClickFunction={() => deleteContact(contact.key)}/>
                                ]}/>
                        </Grid>
                    )
                });
                return (
                    <Grid container spacing={8}>
                        {contactsList}
                    </Grid>
                )
            }
        } else {
            return <EmptyState title={'No new messages'} icon={<Message color={'white'}/>}/>
        }
    }

    render() {
        const {height} = this.props;
        return (
            <div style={{height: height}} className={'adminContacts-container'}>
                {this.getContacts()}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        contacts: state.contacts,
    }
}
export default connect(mapStateToProps, actions)(AdminContacts)