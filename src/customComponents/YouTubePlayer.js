import React, {Component} from 'react';
import Card from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {grey} from 'material-ui/colors';
import LoaderCR from "./LoaderCR";

let player;
let done = false;

const styles = theme => ({
    card: {
      backgroundColor: grey[900]
    },
   iFrame: {
       margin: 'auto',
       display: 'flex'
   }
});
class YouTubePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }
    componentDidMount() {
       this.setUpIFrame()
    }

    setUpIFrame = () => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        console.log('SETUP', tag)
        window.onYouTubeIframeAPIReady = () => {
            console.log('READY', tag)
            const {videoId} = this.props;
            player = new window.YT.Player('player', {
                height: '390',
                width: '430',
                videoId: videoId,
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        };
    };

    componentWillUnmount() {
        player = undefined;
    }

    componentWillReceiveProps(nextProps) {
        const {videoId} = this.props;
        console.log('PLAYER', player)
        if (player === undefined) {
            this.setUpIFrame()
        }
        if (nextProps.videoId !== videoId && player !== undefined) {
            this.loadVideoById(nextProps.videoId);
        }
    }

    loadVideoById = (videoId) => {
        if (player.loadVideoById !== undefined) {
            console.log(videoId)
            player.loadVideoById({videoId: videoId})
        }
    };

    onPlayerReady = event => {
        this.loadVideoById(this.props.videoId);
        event.target.playVideo();
    };

    onPlayerStateChange = event => {
        if (event.data === window.YT.PlayerState.PLAYING && !done) {
            setTimeout(this.stopVideo, 6000);
            done = true;
        }
    };

    stopVideo = () => {
        if (player !== undefined) {
            player.stopVideo();
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.iFrame} id={'player'}>

                </div>
            </Card>
        );
    }
}

YouTubePlayer.propTypes = {
    classes: PropTypes.object.isRequired,
    videoId: PropTypes.string.isRequired
};

export default withStyles(styles)(YouTubePlayer)
