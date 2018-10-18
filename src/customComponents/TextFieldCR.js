import React from 'react';
import PropTypes from 'prop-types';
import {
    InputAdornment,
    MenuItem,
    TextField,
    withWidth,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {handleScrollIntoView, isMobile} from "../Helpers";
import classnames from 'classnames';
import {icon} from "../Colors";

const styles = theme => ({
    blurredAdornment: {
        color: icon,
    },
    focusedAdornment: {
        color: theme.palette.primary.main,
    },
    inputAdornment: {
        paddingRight: 5,
    },
    root: {
        // minWidth: 120,
        // width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut,
        }),
    },

});
const TextFieldCR = props => {
    const isFocused = props.focused ? props.focused === props.id : false;
    return (
        <TextField
            autoComplete={props.autoComplete}
            autoFocus={props.autoFocus}
            classes={{
                root: classnames({
                    [props.classes.root]: true,
                    [props.className]: props.className
                })
            }}
            // className={props.className}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            error={props.error}
            FormHelperTextProps={props.FormHelperTextProps}
            fullWidth={props.fullWidth}
            helperText={props.helperText}
            id={props.id}
            InputLabelProps={props.InputLabelProps}
            InputProps={{
                disableUnderline: props.disableUnderline,
                startAdornment: props.adornmentPosition === 'start' ? (
                    <InputAdornment
                        classes={{
                            root: classnames({
                                [props.classes.inputAdornment]: true,
                                [props.classes.focusedAdornment]: isFocused,
                                [props.classes.blurredAdornment]: !isFocused,
                            })
                        }}
                        position={props.adornmentPosition}>
                        {props.adornment}
                    </InputAdornment>
                ): undefined,
                endAdornment:  props.adornmentPosition === 'end' ? (
                    <InputAdornment
                        classes={{
                            root: classnames({
                                [props.classes.inputAdornment]: true,
                                [props.classes.focusedAdornment]: isFocused,
                                [props.classes.blurredAdornment]: !isFocused,
                            })
                        }}
                        position={props.adornmentPosition}>
                        {props.adornment}
                    </InputAdornment>
                ): undefined,
            }}
            label={props.label}
            margin={props.margin}
            multiline={props.multiline}
            name={props.name}
            onBlur={props.onBlur}
            onChange={
                props.select ?
                    props.onChange()
                    :
                    props.onChange}
            onFocus={() => {
                Boolean(props.onFocus) && props.onFocus(props.id);
                isMobile(props.width) || handleScrollIntoView(props.id);
            }}
            placeholder={props.placeholder}
            required={props.required}
            rows={props.rows}
            rowsMax={props.rowsMax}
            select={props.select}
            type={props.type}
            value={props.value}>
            {props.list && props.list.map((value, index) => (
                <MenuItem
                    id={props.id + '_' + index}
                    key={value}
                    value={value}>
                    {value}
                </MenuItem>
            ))}
        </TextField>
    )
};
TextFieldCR.propTypes = {
    adornment: PropTypes.node,
    adornmentPosition: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    className: PropTypes.object,
    defaultValue: PropTypes.string || PropTypes.number,
    disableUnderline: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    FormHelperTextProps: PropTypes.object,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.string,
    id: PropTypes.string.isRequired,
    InputLabelProps: PropTypes.object,
    InputProps: PropTypes.object,
    label: PropTypes.node,
    margin: PropTypes.string,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.string || PropTypes.number,
    rowsMax: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
    ])
};
export default withStyles(styles)(withWidth()(TextFieldCR))