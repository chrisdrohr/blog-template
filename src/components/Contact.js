//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Paper,
    Slide,
    TextField,
    Typography,
    withStyles,
    withWidth,
} from '@material-ui/core';
import {Check, Send} from '@material-ui/icons';
import ImageUploader from '../customComponents/ImageUploader';
import {isString, isValid} from "../Helpers";
import ProgressButton from "../customComponents/ProgressButton";
import {user} from "../Constants";

type Props = {
    classes: Object,
    content: {
        data: {
            contact: {
                contactImage: string
            }
        },
        fetched: boolean,
        fetching: boolean,
    },
    setContact: Function
};
type State = {
    name: string,
    email: string,
    message: string,
    photoURL: string,
    saved: boolean,
};
const styles = ({breakpoints}) => ({
    avatar: {
        [breakpoints.down('xl')]: {
            height: 200,
            width: 200
        },
        [breakpoints.down('lg')]: {
            height: 200,
            width: 200
        },
        [breakpoints.down('md')]: {
            height: 180,
            width: 180
        },
        [breakpoints.down('sm')]: {
            height: 150,
            width: 150
        },
        [breakpoints.down('xs')]: {
            height: 100,
            width: 100
        },
    },
    container: {
        minHeight: 'calc(100vh - 200px)',
        padding: 8,
        display: 'flex',
        alignItems: 'center',
    },
    flexEnd: {
        justifyContent: 'flex-end'
    },
    header: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        margin: 'auto',
        borderRadius: '50%'
    },
    cardContainer: {
        margin: 'auto',
    },
    title: {
        paddingTop: 8,
    }
});
const ContactCard = withStyles(styles)(props => {

    const {
        name, email, message, avatar, saved,
        nameOnChange, emailOnChange, messageOnChange,

        buttonOnClick,
        classes
    } = props;

    return (
        <Card
            className={classes.card}
            raised={true}>
            <Grid container spacing={8}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <CardContent className={classes.header}>
                        <Paper
                            className={classes.paper}
                            elevation={6}>
                            <ImageUploader
                                className={classes.avatar}
                                avatar={true}
                                src={props.src}/>
                        </Paper>
                        <Typography
                            className={classes.title}
                            align={'center'}
                            variant={'headline'}>
                            {user.name}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <CardContent>
                        <TextField
                            fullWidth
                            onChange={nameOnChange}
                            id={'name'}
                            label={'Name'}
                            margin={'normal'}
                            value={name}/>
                        <TextField
                            fullWidth
                            onChange={emailOnChange}
                            id={'email'}
                            label={'Email'}
                            margin={'normal'}
                            value={email}/>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            onChange={messageOnChange}
                            id={'message'}
                            label={'Message'}
                            margin={'normal'}
                            value={message}/>
                    </CardContent>
                    <CardActions className={classes.flexEnd}>
                        <ProgressButton
                            disabled={saved ? true : !props.isValid}
                            variant={'raised'}
                            onClick={buttonOnClick}
                            color={'primary'}
                            icon={<Send/>}
                            label={'Submit'}
                            successIcon={<Check/>}
                            success={saved}
                            successLabel={'Sent!'}/>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
});

class Contact extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            photoURL: '',
            saved: false,
        }
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate() {
        this.setData();
    }

    setData = () => {
        const {
            content: {
                data,
                fetched,
                fetching,
            }
        } = this.props;
        const {photoURL} = this.state;
        if (fetched && !fetching && isValid(data.contact)) {
            if (isString(data.contact.contactImage) &&
                data.contact.contactImage !== photoURL) {
                this.setState({photoURL: data.contact.contactImage})
            }
        }
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    resetData = () => {
        this.setState({
            name: '',
            email: '',
            message: '',
        })
    };
    saveContact = () => {
        const {name, email, message} = this.state;
        const props = this.props;
        props.setContact({name, email, message}).then(() => {
            this.setState({saved: true});
            setTimeout(this.resetData, 1000);
        })
    };

    render() {
        const {name, email, message, photoURL, saved} = this.state;
        const props = this.props;
        const isValid = [name, email, message].every(v => v.length !== 0);
        return (
            <div className={props.classes.container}>
                <Slide
                    direction="right"
                    in={true}
                    mountOnEnter
                    unmountOnExit>
                    <CardContent
                        className={props.classes.cardContainer}>
                        <ContactCard
                            name={name}
                            email={email}
                            message={message}
                            saved={saved}
                            isValid={isValid}
                            src={photoURL}
                            nameOnChange={this.handleChange('name')}
                            emailOnChange={this.handleChange('email')}
                            messageOnChange={this.handleChange('message')}
                            buttonOnClick={this.saveContact}/>
                    </CardContent>
                </Slide>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        content: state.content,
        isAdmin: state.admin,
    }
}

export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(withWidth()(Contact))))