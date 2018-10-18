import React, {Fragment, PureComponent} from 'react'
import PropTypes from 'prop-types'
import common from '@material-ui/core/colors/common'
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import {Avatar, CircularProgress, IconButton} from "@material-ui/core";
import {AddAPhoto} from "@material-ui/icons";
import Photo from "../svg/Photo";

const styles = ({palette, transitions}) => ({
    avatar: {
        backgroundColor: palette.common.white,
    },
    button: {
        color: palette.common.white,
    },
    buttonContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        '&:hover': {
            backgroundColor: palette.action.active,
        }
    },
    icon: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
    input: {
        display: 'none'
    },
    loading: {
        opacity: 0,
        filterBrightness: 0,
        filterSaturate: 20,
    },
    loaded: {
        opacity: 1,
        filterBrightness: 100,
        filterSaturate: 100,
        transition: transitions.create(
            ['filterBrightness', 'filterSaturate'],
            transitions.duration.standard,
            transitions.easing.easeIn)
    },
    root: {
        backgroundColor: 'white',
        paddingTop: `calc(1 / ${(16 / 9)} * 100%)`,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        objectFit: 'cover',
        // padding: 25,
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    transition: {
        transition: transitions.create(
            ['opacity', 'background-color'],
            transitions.duration.standard,
            transitions.easing.easeIn),
        opacity: 0,
        '&:hover': {
            opacity: 1
        }
    }
});
const UploadButton = props => {
    const {
        classes,
        handleUpload,
    } = props;
    return (
        <div className={
            classnames({
                [classes.buttonContainer]: true,
                [classes.transition]: true,
            })
        }>
            <input
                accept="jpg,jpeg,JPG,JPEG"
                className={classes.input}
                onChange={handleUpload}
                id="file"
                type="file"/>
            <label htmlFor="file">
                <IconButton
                    id={'imageUpload'}
                    component={'span'}
                    className={classes.button}>
                    <AddAPhoto/>
                </IconButton>
            </label>
        </div>
    )
};

class AvatarCR extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageError: false,
            imageLoaded: false
        };
    }

    render() {
        const props = this.props;
        const {
            imageLoaded,
            imageError,
        } = this.state;

        return (
            <Avatar
                className={props.className}
                classes={{root: props.classes.avatar}}>
                {props.src &&
                <img
                    alt={props.alt}
                    src={props.src}
                    className={classnames({
                        [props.classes.image]: true,
                        [props.classes.loading]: !imageLoaded,
                        [props.classes.loaded]: imageLoaded,
                    })
                    }
                    onLoad={() => this.setState({imageLoaded: true})}
                    onError={() => this.setState({imageError: true})}
                />}
                {!props.src && <Photo />}
                <div className={props.classes.loaderContainer}>
                    {props.uploadMode && !props.imageLoaded && (
                        <Fragment>
                            <UploadButton {...props}/>
                        </Fragment>
                    )}
                    {props.uploadMode &&
                    props.isUploading &&
                    !props.disableSpinner &&
                    !props.imageLoaded &&
                    !props.imageError && props.loading}
                    {!props.disableError && imageError && props.errorIcon}
                </div>
            </Avatar>
        )
    }
}

AvatarCR.defaultProps = {
    color: common.white,
    disableError: false,
    disableSpinner: false,
    disableTransition: false,
    errorIcon: <Photo />,
    loading: <CircularProgress size={48}/>,
};

AvatarCR.propTypes = {
    /** Specifies the URL of an image. */
    src: PropTypes.string.isRequired,
    /** Override the background color. */
    color: PropTypes.string,
    /** Disables the error icon if set to true. */
    disableError: PropTypes.bool,
    /** Disables the loading spinner if set to true. */
    disableSpinner: PropTypes.bool,
    /** Override the error icon. */
    errorIcon: PropTypes.node,
    /** Override the inline-styles of the image. */
    imageStyle: PropTypes.object,
    /** Override the loading component. */
    loading: PropTypes.node,
    /** Fired when the user clicks on the image happened. */
    style: PropTypes.object,
    uploadMode: PropTypes.bool,
};
export default withStyles(styles)(AvatarCR)