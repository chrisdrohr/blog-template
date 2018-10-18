import React from 'react';
import {FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const CheckboxCR = props => {
    const {disabled, checked, onChangeFunction} = props;
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={disabled}
                    checked={checked}
                    onChange={onChangeFunction}/>
            }/>
    )
};
export default CheckboxCR