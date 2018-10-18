import React, {Component} from 'react';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import {KeyboardArrowRight, KeyboardArrowLeft} from 'material-ui-icons';
import './StepperCR.css';

class Stepper extends Component {

    render() {
        const {stepsCount, activeStep,handleNextFunction, handleBackFunction, disabled} = this.props;
        return (
                    <MobileStepper
                        type="dots"
                        steps={stepsCount}
                        position="static"
                        activeStep={activeStep}
                        classes={{root: 'stepper-stepper'}}
                        nextButton={
                            <Button
                                color={'secondary'}
                                raised
                                dense
                                onClick={handleNextFunction}
                                disabled={activeStep === stepsCount-1 || disabled}>
                                Next
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button
                                dense
                                onClick={handleBackFunction}
                                disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        }/>
        )
    }
}

export default Stepper