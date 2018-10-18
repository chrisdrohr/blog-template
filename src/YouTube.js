//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Typography,
    withStyles,
    withWidth
} from '@material-ui/core';
import VideoCard from './customComponents/VideoCard';
import * as actions from './actions';
import {Save, Subscriptions} from '@material-ui/icons';
import TextFieldCR from './customComponents/TextFieldCR';
import YouTubeDialog from './customComponents/YouTubeDialog';
import HeaderDisplayCR from './customComponents/HeaderDisplayCR';
import GridListCR from "./customComponents/GridListCR";
import {gridListCols, isSmall, isValid} from "./Helpers";
import IsAdmin from "./customComponents/IsAdmin";

const styles = theme => ({
    container: {
        maxWidth: 800,
        margin: 'auto',
    },
    card: {
        backgroundColor: 'black'
    },
    // container: {
    //     margin: 'auto',
    //     maxWidth: 800,
    //     overflowY: 'auto',
    // },
    channelCard: {
        margin: 5,
    }
});

type Props = {
    admin: boolean,
    classes: Object,
    content: Object,
    playVideo: Function,
    updateYouTubeChannelId: Function,
    width: string,
    youTubeChannel: Object,
    youTubeUploads: Object
}
type State = {
    channelId: string,
    show: boolean,
    value: string,
    videos: Array,
}

class YouTube extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            channelId: '',
            value: '',
            show: false,
            videos: [],
        }
    }

    componentDidMount() {
        const {
            content,
            youTubeUploads: {
                fetched,
                fetching,
                data,
            }
        } = this.props;
        const channelIdProp = content.data.youTube;
        if (isValid(channelIdProp)) {
            this.checkChannelId(channelIdProp);
        }
        if (fetched && !fetching &&
            data !== this.state.videos &&
            isValid(data)) {
            this.setState({videos: data})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {youTube} = this.props.content.data;
        const {
            youTubeUploads: {
                fetched,
                fetching,
                data,
            }
        } = this.props;
        if (youTube !== prevState.channelId) {
            this.checkChannelId(youTube);
        }
        if (fetched && !fetching &&
            data !== prevState.videos &&
            isValid(data)) {
            this.setState({videos: data})
        }
    }

    checkChannelId = (channelId) => {
        this.setState({channelId: channelId, value: channelId});
    };
    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    videoList() {
        const {
            playVideo,
            width,
        } = this.props;
        const {videos} = this.state;

        const headerResults = [videos[0], videos[1], videos[2]];
        const spacing = isSmall(width) ? 8 : 8;
        return (
            <Grid
                container
                spacing={spacing}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                    {headerResults.every(result => isValid(result)) &&
                    <Grid container spacing={8}>
                        {isValid(headerResults[0].snippet) &&
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}>
                            <VideoCard
                                keyValue={headerResults[0].snippet.resourceId.videoId}
                                isSmall={isSmall(width)}
                                title={headerResults[0].snippet.title}
                                image={headerResults[0].snippet.thumbnails.maxres.url}
                                onClick={() => playVideo(headerResults[0].snippet.resourceId.videoId)}/>
                        </Grid>}
                        {isValid(headerResults[1].snippet) && isValid(headerResults[2].snippet) &&
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}>
                            <Grid container spacing={spacing}>
                                <Grid
                                    item
                                    xs={6}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}>
                                    <VideoCard
                                        keyValue={headerResults[1].snippet.resourceId.videoId}
                                        isSmall={isSmall}
                                        title={headerResults[1].snippet.title}
                                        image={headerResults[1].snippet.thumbnails.maxres.url}
                                        onClick={() => playVideo(headerResults[1].snippet.resourceId.videoId)}/>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}>
                                    <VideoCard
                                        keyValue={headerResults[2].snippet.resourceId.videoId}
                                        isSmall={isSmall}
                                        title={headerResults[2].snippet.title}
                                        image={headerResults[2].snippet.thumbnails.maxres.url}
                                        onClick={() => playVideo(headerResults[2].snippet.resourceId.videoId)}/>
                                </Grid>
                            </Grid>
                        </Grid>}
                    </Grid>}
                </Grid>
                {Object.values(videos).filter((v, i) => i > 2).map(({snippet}) => {
                    const {title, thumbnails, resourceId} = snippet;
                    return (
                        <Grid
                            item
                            xl={3}
                            lg={4}
                            md={4}
                            sm={4}
                            xs={6}
                            key={resourceId.videoId}>
                            <VideoCard
                                keyValue={resourceId.videoId}
                                isSmall={isSmall}
                                title={title}
                                image={thumbnails.high.url}
                                onClick={() => playVideo(resourceId.videoId)}/>
                        </Grid>
                    )
                })}
            </Grid>
        );
    }

    channelInfo() {
        const {youTubeChannel, classes} = this.props;
        if (youTubeChannel.fetched) {
            const data = youTubeChannel.data;
            const {title, description, thumbnails} = data.snippet;
            return [
                <HeaderDisplayCR
                    key={0}
                    title={'Channel Info'}
                    icon={<Subscriptions/>}/>,
                <Card className={classes.channelCard}>
                    <CardHeader
                        avatar={<Avatar src={thumbnails.medium.url}/>}
                        title={title}
                        subheader={data.id}/>
                    <CardContent>
                        <Typography
                            variant={'body2'}>
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            ]
        }

    }

    channelIdField() {
        const channelId = this.state.value;
        const {updateYouTubeChannelId, content} = this.props;
        const channelIdSaved = content.data.youTube;
        return (
            <CardContent>
                <TextFieldCR
                    adornment={
                        <Button
                            disabled={channelId === channelIdSaved && channelId !== 0}
                            color={channelId === channelIdSaved && channelId !== 0 ? 'primary' : 'secondary'}
                            variant={'fab'}
                            mini={true}
                            onClick={() => updateYouTubeChannelId(channelId)}>
                            <Save/>
                        </Button>
                    }
                    adornmentPosition={'end'}
                    label={'Channel Id'}
                    name={'channelId'}
                    value={channelId}
                    helperText={'Paste your channel id to display your uploads'}
                    onChange={this.handleChange('value')}/>
            </CardContent>
        )
    }

    render() {
        return (
            <div className={this.props.classes.container}>
                <IsAdmin>
                {this.channelIdField()}
                {this.channelInfo()}
                </IsAdmin>
                {this.videoList()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        youTubeChannel: state.youTubeChannel,
        youTubeUploads: state.youTubeUploads,
        content: state.content,
    }
}

export default connect(mapStateToProps, actions)(withWidth()(withStyles(styles)(YouTube)))
