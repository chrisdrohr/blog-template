import React, {Component} from 'react';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import {KeyboardArrowRight, KeyboardArrowLeft} from 'material-ui-icons';
import Dialog, {DialogContent, DialogActions, withMobileDialog} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Divider from 'material-ui/Divider';

const ResponsiveDialog = withMobileDialog({breakpoint: 'lg'})(Dialog);
class StepperDialog extends Component {

    render() {
        const {open, stepsCount, actions, content, activeStep,handleNextFunction, handleBackFunction} = this.props;
        return (
            <div>
                <ResponsiveDialog
                    fullScreen
                    open={open}
                    maxWidth={"md"}>
                    <DialogContent>
                        {content}
                    </DialogContent>
                    <MobileStepper
                        type="dots"
                        steps={stepsCount}
                        position="static"
                        activeStep={activeStep}
                        className={'stepper-stepper'}
                        nextButton={
                            <Button
                                dense
                                onClick={handleNextFunction}
                                disabled={activeStep === stepsCount-1}>
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
                    <Divider/>
                    <DialogActions>
                        {actions}
                    </DialogActions>
                </ResponsiveDialog>
            </div>
        )
    }
}

export default StepperDialog