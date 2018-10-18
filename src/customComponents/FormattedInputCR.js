import React, {Component} from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        // margin: theme.spacing.unit,
    },
});

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            ref={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class FormattedInputCR extends Component {

    render() {
        const { classes, phoneNumber, price, onChangeFunction, inputName } = this.props;
        return (
            <FormControl className={classes.container}>
                {phoneNumber !== undefined &&
                    <div>
                        <InputLabel>Phone Number</InputLabel>
                        <Input
                            name={inputName}
                            value={phoneNumber}
                            inputComponent={TextMaskCustom}
                            onChange={onChangeFunction}
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                    </div>}
                {price !== undefined &&
                    <div>
                        <InputLabel>Price</InputLabel>
                        <Input
                            value={price}
                            name={inputName}
                            onChange={onChangeFunction}
                            inputComponent={NumberFormatCustom}
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                    </div>}
            </FormControl>
        );
    }
}

FormattedInputCR.propTypes = {
    classes: PropTypes.object.isRequired,
    func: PropTypes.func.isRequired,
    string: PropTypes.string,
};

export default withStyles(styles)(FormattedInputCR);