import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'

const styles = theme => ({
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
    }
});
const ImgCR = props => {
    const {
        classes,
        ...image
    } = props;

    return (
        <div
            className={classes.root}>
            {image.src &&
            <img
                {...image}
                className={
                    classnames({
                        [classes.image]: true,
                        [classes.loaded]: true,
                    })
                }
            />}
        </div>
    )
};

ImgCR.propTypes = {
    src: PropTypes.string.isRequired,
};
export default withStyles(styles)(ImgCR)