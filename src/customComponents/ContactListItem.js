import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    withStyles,
} from '@material-ui/core';

const ContactListItem = props => {
        const {contact, actions} = props;
        const {email, message, name, date} = contact;
        return (
                    <Card>
                        <CardHeader
                            avatar={<Avatar>{name.charAt(0)}</Avatar>}
                            title={name}
                            subheader={email}/>
                        <CardContent>
                            <Typography
                                paragraph={true}
                                variant={'caption'}
                                color={'secondary'}>
                                {new Date(date).toDateString()}
                            </Typography>
                            <Typography align={'left'} variant={'body1'}>
                                {message}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {actions}
                        </CardActions>
                    </Card>
        )
};
export default ContactListItem