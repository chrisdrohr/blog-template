//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter} from 'react-router-dom';
import {
    AppBar,
    Collapse,
    Drawer,
    Hidden,
    IconButton,
    ListItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import SocialMediaLinks from './SocialMediaLinks';
import {links, user} from "../Constants";
import {withStyles} from '@material-ui/core/styles';
// import YouTubeSubscribeButton from './YouTubeSubscribeButton';
// import Video from './Video';
import LinkButtons from './LinkButtons';
import classnames from 'classnames';
import {isValid} from "../Helpers";
type Props = {
    classes: Object,
    isAdmin: boolean,
    pathName: Object,
    theme: Object,
    videoId: string,
}
type State = {
    open: boolean,
    show: boolean,
    transition: boolean,
    videoId: string,
}
const styles = ({breakpoints, palette, transitions}) => ({
    container: {
      transition: transitions.create('height',
          transitions.duration.standard,
          transitions.easing.easeInOut),
        height: 120,
    },
    header: {
        width: '100%',
        // height: 120,
    },
    headerTransparent: {
        width: '100%',
        // height: 120,
        backgroundColor: 'transparent'
    },
    flex: {
        display: 'flex',
        flex: 1
    },
    spacer: {
        [breakpoints.down('xl')]: {
            height: 'calc(720px + 56px)',
        },
        [breakpoints.down('lg')]: {
            height: 'calc(480px + 56px)',
        },
        [breakpoints.down('md')]: {
            height: 'calc(360px + 56px)',
        },
        [breakpoints.down('sm')]: {
            height: 'calc(42vh + 56px)',
        },
        [breakpoints.down('xs')]: {
            height: 'calc(32vh + 56px)',
        }
    },
    whiteText: {
        color: palette.common.white,
    },
    white: {
        backgroundColor: palette.common.white,
    },
    youtubeContainer: {
        margin: '0 auto 0 auto',
        padding: 5,
    }
});

class Header extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            show: false,
            transition: false,
            videoId: '',
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const nextProps = this.props;
        if (nextProps.videoId.length !== 0 &&
            nextProps.videoId !== 'close' &&
            isValid(nextProps.videoId) &&
            nextProps.videoId !== prevState.videoId) {
                this.setState({
                    show: true,
                    videoId: nextProps.videoId
                });
        }

        if (nextProps.videoId === 'close' && prevState.show) {
            this.setState({
                show: false,
                videoId: '',
            })
        }
    };
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    getDrawer = () => {
        const {open} = this.state;
        const {isAdmin, classes} = this.props;
        return (
            <div>
                <Hidden smUp>
                    <IconButton
                        onClick={this.handleOpen}
                        color="inherit"
                        aria-label="Menu">
                        <Menu/>
                    </IconButton>
                </Hidden>
                <Drawer
                    anchor="right"
                    variant={'temporary'}
                    ModalProps={{keepMounted: true}}
                    open={open}
                    onClose={this.handleClose}
                    onClick={this.handleClose}>
                    {/*<ListItem>*/}
                        {/*<YouTubeSubscribeButton/>*/}
                    {/*</ListItem>*/}
                    <LinkButtons isAdmin={isAdmin} type={'list'}/>
                </Drawer>
            </div>
        )
    };

    render() {
        const {isAdmin, pathName, theme, classes} = this.props;
        const {
            show,
            videoId
        } = this.state;
        const headerEnabled = theme.data.header;
        const toolbar = () => {
            return (
                <div>
                    <Collapse in={!show}>
                    <Toolbar
                        disableGutters={false}>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classnames({
                                [classes.flex]: true,
                                [classes.whiteText]: headerEnabled
                            })}>
                            {user.name}
                        </Typography>
                        <SocialMediaLinks/>
                        {/*<Hidden xsDown>*/}
                            {/*<YouTubeSubscribeButton/>*/}
                        {/*</Hidden>*/}
                    </Toolbar>
                    </Collapse>
                    <Toolbar>
                        <Typography
                            variant="headline"
                            color="inherit"
                            className={classnames({
                                [classes.flex]: true,
                                [classes.whiteText]: headerEnabled
                            })}>
                            {pathName.name}
                        </Typography>
                        <Hidden xsDown>
                            <LinkButtons isAdmin={isAdmin}/>
                        </Hidden>
                        {this.getDrawer()}
                    </Toolbar>
                    {/*<Video*/}
                        {/*show={show}*/}
                        {/*videoId={videoId}/>*/}
                </div>
            )
        };
        return (
            <div className={
                classnames({
                    [classes.container]: true,
                    [classes.spacer]: show,
                })
            }>
                <AppBar
                    classes={{root: classnames({
                            [classes.header]: true,
                            [classes.white]: !headerEnabled,
                        })}}
                    position={headerEnabled ?
                        'absolute'
                        :
                        'static'
                    }>
                    {toolbar()}
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.admin,
        pathName: state.pathName,
        theme: state.theme,
        videoId: state.video.data
    }
}

export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(Header)))