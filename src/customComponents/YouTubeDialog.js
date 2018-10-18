import React from 'react'
import {
    CardMedia,
    withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import YouTubePlayer from 'react-youtube';
import DialogCR from '../customComponents/DialogCR';
import {grey} from '@material-ui/core/colors';

const styles = ({breakpoints}) => ({
    paper: {
        backgroundColor: grey[900],
        overflow: 'hidden',
        margin: 0,
        [breakpoints.down('sm')]: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
        }
    },
    actions: {
        position: 'relative',
        top: -50,
    },
    media: {
        height: `calc(1 / ${(16 / 9)} * 100%)`,
        maxWidth: '100vw',
        margin: 'auto',
        display: 'flex'
    },
    iFrame: {
        height: `calc(1 / ${(16 / 9)} * 100%)`,
        maxWidth: '100vw',
        margin: 'auto',
    }

});

const YouTubeDialog = props => {
    const {open, videoId, classes, onCloseFunction, image} = props;
    return (
        <DialogCR
            onClose={onCloseFunction}
            className={classes.paper}
            targetKey={videoId}
            open={open}>
            <CardMedia
                className={classes.media}
                image={image}>
                    <YouTubePlayer
                        className={classes.iFrame}
                        videoId={videoId}/>
            </CardMedia>
        </DialogCR>
    )
};
YouTubeDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    image: PropTypes.string.isRequired,
    onCloseFunction: PropTypes.func.isRequired,
    videoId: PropTypes.string.isRequired,
};
export default withStyles(styles)(YouTubeDialog)