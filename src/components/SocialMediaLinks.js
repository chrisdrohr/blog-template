import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {
    Button,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    withStyles
} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {Save, Done} from '@material-ui/icons';
import {socialMediaLinks} from "../Constants";
import TextFieldCR from "../customComponents/TextFieldCR";
import {isValid} from "../Helpers";
import IsAdmin from "../customComponents/IsAdmin";

const styles = ({}) => ({
    container: {
        maxWidth: 800,
        margin: 'auto',
    },
    labelContainer: {
        display: 'flex',
        alignItems: 'center',
        transform: 'translate(-5px, -15px)'
    },
    linkContainer: {
        height: 52,
        width: '100%',
        justifyContent: 'flex-end'
    }
});

class SocialMediaLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebook: '',
            pinterest: '',
            twitter: '',
            instagram: '',
            linkedIn: '',
            socialMedia: {
                facebook: '',
                pinterest: '',
                twitter: '',
                instagram: '',
                linkedIn: '',
            }
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };
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
            }
        } = this.props;
        if (data.socialMedia !== this.state.socialMedia && isValid(data.socialMedia)) {
            this.updateState(data.socialMedia);
        }
    };
    updateState = (socialMedia) => {
        this.setState({
            socialMedia: socialMedia,
            facebook: socialMedia.facebook || '',
            pinterest: socialMedia.pinterest || '',
            twitter: socialMedia.twitter || '',
            instagram: socialMedia.instagram || '',
            linkedIn: socialMedia.linkedIn || '',
        })
    };
    save = (link) => {
        this.props.updateSocialMedia(link)
    };
    render() {
        const props = this.props;
        const state = this.state;
        return (
            <div className={props.classes.container}>
                <CardActions className={props.classes.linkContainer}>
                    {Object.values(socialMediaLinks).map(item => {
                        const link = state[item.key];
                        if (link.length !== 0) {
                            return (
                                <IconButton
                                    className={props.classes.button}
                                    onClick={() => window.open(link)}>
                                    {item.icon}
                                </IconButton>
                            )
                        }
                    })}
                </CardActions>
                {props.showFields &&
                <IsAdmin>
                    <CardContent>
                        <Grid container spacing={24} alignContent={'center'}>
                            {Object.values(socialMediaLinks).map((item, i) => {
                                const savedLink = state.socialMedia[item.key];
                                const currentLink = state[item.key];
                                return (
                                    <Grid key={i} item lg={6} md={6} sm={6} xs={12}>
                                        <TextFieldCR
                                            adornment={
                                                <Button
                                                    disabled={currentLink === savedLink}
                                                    color={savedLink === currentLink && currentLink.length !== 0 ? 'primary' : 'secondary'}
                                                    variant={'fab'}
                                                    mini={true}
                                                    onClick={() => this.save({[item.key]: currentLink})}>
                                                    {savedLink === currentLink && currentLink.length !== 0 ? <Done/> :
                                                        <Save/>}
                                                </Button>
                                            }
                                            adornmentPosition={'end'}
                                            name={item.key}
                                            label={
                                                <div className={props.classes.labelContainer}>
                                                    {item.icon}
                                                    {item.title}
                                                </div>}
                                            value={state[item.key]}
                                            onChange={this.handleChange(item.key)}
                                            fullWidth={true}
                                            helperText={'Link'}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </CardContent>
                </IsAdmin>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content,
    }
}

export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(SocialMediaLinks)))
