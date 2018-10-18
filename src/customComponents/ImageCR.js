import React, {Fragment, PureComponent} from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import common from '@material-ui/core/colors/common'
import grey from '@material-ui/core/colors/grey'
import BrokenImage from '@material-ui/icons/BrokenImage'
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import {Button} from "@material-ui/core";
import {AddAPhoto} from "@material-ui/icons";
import Photo from "../svg/Photo";

const styles = theme => ({
    buttonContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: `calc(1 / ${(16 / 9)} * 100%)`,
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
        transition: theme.transitions.create(
            'filterBrightness',
            theme.transitions.duration.standard,
            theme.transitions.easing.easeIn,
            theme.transitions.create(
                'filterSaturate',
                theme.transitions.duration.standard,
                theme.transitions.easing.easeIn)),
    },
    root: {
        backgroundColor: 'white',
        paddingTop: `calc(1 / ${(16 / 9)} * 100%)`,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        objectFit: 'cover'
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
    }
});
const UploadButton = props => {
    const {
        classes,
        handleUpload,
    } = props;
    return (
        <div className={classes.buttonContainer}>
            <input
                accept="jpg,jpeg,JPG,JPEG"
                className={classes.input}
                onChange={handleUpload}
                id="file"
                type="file"/>
            <label htmlFor="file">
                <Button
                    id={'imageUpload'}
                    variant={'raised'}
                    size={'small'}
                    // color={'primary'}
                    component={'span'}
                    className={classes.button}>
                    <AddAPhoto color={'action'} className={classes.icon}/>
                    Upload Photo
                </Button>
            </label>
        </div>
    )
};

class ImageCR extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageError: false,
            imageLoaded: false
        };
    }

    render() {

        const {
            alt,
            classes,
            disableError,
            disableSpinner,
            errorIcon,
            handleUpload,
            isUploading,
            loading,
            progress,
            src,
            upload,
            uploadMode,
        } = this.props;
        const {
            imageLoaded,
            imageError,
        } = this.state;

        return (
            <div
                className={classes.root}>
                {src &&
                <img
                    alt={alt}
                    src={src}
                    className={classnames({
                        [classes.image]: true,
                        [classes.loading]: !imageLoaded,
                        [classes.loaded]: imageLoaded,
                    })
                    }
                    onLoad={() => this.setState({imageLoaded: true})}
                    onError={() => this.setState({imageError: true})}
                />}
                <div className={classes.loaderContainer}>
                    {uploadMode && !imageLoaded && (
                        <Fragment>
                            <Photo className={classes.background}/>
                            <UploadButton {...this.props}/>
                        </Fragment>
                    )}
                    {uploadMode && isUploading && !disableSpinner && !imageLoaded && !imageError && loading}
                    {!disableError && imageError && errorIcon}
                </div>
            </div>
        )
    }
}

ImageCR.defaultProps = {
    color: common.white,
    disableError: false,
    disableSpinner: false,
    disableTransition: false,
    errorIcon: <BrokenImage style={{width: 48, height: 48, color: grey[300]}}/>,
    loading: <CircularProgress size={48}/>,
};

ImageCR.propTypes = {
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
    style: PropTypes.object
};
export default withStyles(styles)(ImageCR)