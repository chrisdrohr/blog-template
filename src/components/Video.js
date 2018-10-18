//@flow
import React, {PureComponent} from 'react';
import {hot} from 'react-hot-loader';
import * as actions from '../actions';
import {connect} from 'react-redux';
import YouTubePlayer from 'react-youtube';
import {
    Button,
    Collapse,
    Grow,
    withStyles
} from '@material-ui/core';
import {
    Close,
} from '@material-ui/icons';
import {grey} from '@material-ui/core/colors';
import classnames from 'classnames';

type Props = {
    classes: Object,
    closeVideo: Function,
    show: boolean,
    transition: boolean,
    videoId: string,
}
type State = {
    transition: boolean,
    videoId: string,
}
const styles = ({breakpoints, transitions}) => ({
    button: {
        position: 'fixed',
        [breakpoints.down('xl')]: {
            right: 32,
            top: 'calc(720px + 35px)',
        },
        [breakpoints.down('lg')]: {
            right: 32,
            top: 'calc(480px + 35px)',
        },
        [breakpoints.down('md')]: {
            right: 32,
            top: 'calc(360px + 35px)',
        },
        [breakpoints.down('sm')]: {
            right: 16,
            top: 'calc(42vh + 35px)',
        },
        [breakpoints.down('xs')]: {
            right: 16,
            bottom: 56,
            top: 'auto'
        }
    },
    in: {
        opacity: 1,
    },
    out: {
        // height: 0,
        opacity: 0,
    },
    iFrame: {
        transition: transitions.create(['height', 'opacity'],
            transitions.duration.short,
            transitions.easing.easeIn),
        margin: 'auto',
        maxWidth: '100vw',
        marginBottom: -5,
        [breakpoints.down('xl')]: {
            height: 720,
            width: 1280
        },
        [breakpoints.down('lg')]: {
            height: 480,
            width: 854
        },
        [breakpoints.down('md')]: {
            height: 360,
            width: 650,
        },
        [breakpoints.down('sm')]: {
            width: '100vw',
            height: '42vh',
        },
        [breakpoints.down('xs')]: {
            width: '100vw',
            height: '32vh',
        },
    },
    iFrameContainer: {
        backgroundColor: 'black',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
});

class Video extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            videoId: '',
            transition: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {videoId} = this.props;
        if (videoId !== prevProps.videoId) {
            this.setState({transition: false});
            setTimeout(() => this.setState({
                videoId: videoId,
                transition: true
            }), 300);
        }
    };

    render() {
        const {
            classes,
            closeVideo,
            show,
        } = this.props;
        const {
            videoId,
            transition
        } = this.state;
        const opts = {
            playerVars: {
                autoplay: 1
            }
        };
        return (
            <div className={classes.container}>
                <Collapse in={show}>
                    <div className={classes.iFrameContainer}>
                    <YouTubePlayer
                        className={classnames({
                            [classes.iFrame]: true,
                            [classes.in]: transition,
                            [classes.out]: !transition,
                        })}
                        // opts={opts}
                        videoId={videoId}/>
                    </div>
                </Collapse>
                <Grow
                    in={show}
                    style={{transitionDelay: show ? 300 : 0}}>
                    <Button
                        className={classes.button}
                        color={'primary'}
                        onClick={() => closeVideo()}
                        variant={'fab'}>
                        <Close/>
                    </Button>
                </Grow>
            </div>
        )
    }
}

export default hot(module)(connect(null, actions)(withStyles(styles)(Video)))