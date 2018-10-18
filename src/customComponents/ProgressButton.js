import React, {Fragment} from 'react';
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';
import {Button, CircularProgress} from '@material-ui/core';
import {Check} from '@material-ui/icons';
import {withStyles} from '@material-ui/core/styles';
import ToggleIcon from 'material-ui-toggle-icon';

const styles = theme => ({
    icon: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        left: 'calc(50% - 12px)',
        right: 'calc(50% - 12px)'
    }
});

const ProgressButton = props => {
    const {
        loading,
        success,
        classes,
        onClick,
        icon,
        id,
        fullWidth,
        type,
        label,
        fab,
        color,
        size,
        successLabel,
    } = props;
    return (
        <Fragment>
            {fab ?
                <Fragment>
                    <Button
                        variant="fab"
                        color={success ? 'primary' : 'secondary'}
                        onClick={onClick}>
                        {success ? <Check/> : icon}
                    </Button>
                    {loading &&
                    <CircularProgress
                        color={color || 'primary'}
                        size={68}
                        className={classes.fabProgress}/>}
                </Fragment>
                :
                <Fragment>
                    <Button
                        className={props.className}
                        id={id}
                        variant={props.variant}
                        fullWidth={fullWidth}
                        type={type}
                        color={props.color}
                        disabled={props.disabled}
                        onClick={onClick}
                        size={size}>
                        {props.icon &&
                            <ToggleIcon
                                classes={{
                                    root: classes.icon
                                }}
                                on={success}
                                onIcon={props.successIcon || <Check/>}
                                offIcon={props.icon}/>}
                        {success ? successLabel : label}
                        {loading &&
                        <CircularProgress
                            color={'primary'}
                            size={24}
                            className={classes.buttonProgress}/>}
                    </Button>
                </Fragment>
            }
        </Fragment>
    );
};

ProgressButton.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    successLabel: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    fullWidth: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
    fab: PropTypes.bool
};

export default hot(module)(withStyles(styles)(ProgressButton))