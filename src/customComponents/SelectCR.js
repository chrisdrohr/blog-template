import React, {Component} from 'react';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import './SelectCR.css';

class SelectCR extends Component {
    render() {
        const {inputLabel, value, onChangeFunction, list, error, id, multiple, nameList, selected} = this.props;
        return (
            <FormControl
                error={error}
                className={'selectCR-formControl'}>
                <InputLabel htmlFor={id}>{inputLabel}</InputLabel>
                <Select
                    multiple={multiple}
                    value={value}
                    onChange={onChangeFunction}
                    input={<Input id={id}/>}>
                    {list.map((item, i) =>
                    <MenuItem
                        key={i}
                        selected={selected}
                        value={item}>
                        {!nameList && item}
                        {nameList && nameList[item]}
                    </MenuItem>
                    )}
                </Select>
            </FormControl>
        )
    }
}
export default SelectCR