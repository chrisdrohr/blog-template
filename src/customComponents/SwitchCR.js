import React from 'react';
import P from 'prop-types';
import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';

const SwitchCR = props => (
    <FormControlLabel
        label={props.label}
        control={
            <Switch
                checked={props.checked}
                onChange={props.onChange}/>
        }/>
);
SwitchCR.propTypes = {
    checked: P.bool.isRequired,
    label: P.string,
    onChange: P.func.isRequired,
};
export default SwitchCR