import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Button from 'material-ui/Button';
import DialogCR from '../customComponents/DialogCR';

class AlertDialog extends Component {


    render() {
        const {alertDialog, closeAlertDialog} = this.props;
        return (
            <div>
                {alertDialog.open &&
                <DialogCR
                    open={alertDialog.open}
                    title={alertDialog.data.title}
                    text={alertDialog.data.text}
                    actions={
                        <Button
                            onClick={event => closeAlertDialog()}
                            color={'accent'}>
                            Close
                        </Button>
                    }/>
                }
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        alertDialog: state.alertDialog,
    }
}
export default connect(mapStateToProps, actions)(AlertDialog)