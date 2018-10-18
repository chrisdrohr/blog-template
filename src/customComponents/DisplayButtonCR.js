import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 100,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 60,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
            opacity: 0.15,
        },
        '&:hover $imageContent': {
            zIndex: 110,
            opacity: 1,
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
        zIndex: 100,
    },
    imageButtonContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // color: theme.palette.common.white,
        zIndex: 90,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageContent: {
        opacity: 0.15,
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

const DisplayButtonCR = props => {
    // const LinkCR = props => <Link to={props.to} {...props} />;
    const {classes} = props;
    return (
        <ButtonBase
            // component={LinkCR}
            focusRipple
            key={props.key}
            className={classes.image}
            style={{
                width: props.width,
                height: props.height,
            }}
        >
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: `url(${props.background})`,
              }}
          />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButtonContent}>
            <Typography
                component="span"
                type="display2"
                className={classes.imageContent}
                color={'primary'}>
              {props.content}
            </Typography>
          </span>
            <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subheading"
                color="inherit"
                className={classes.imageTitle}>
              {props.label}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
    );
};

DisplayButtonCR.propTypes = {
    label: PropTypes.string,
};

export default withStyles(styles)(DisplayButtonCR);
