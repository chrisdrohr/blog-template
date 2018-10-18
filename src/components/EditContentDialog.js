import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ButtonCR from '../customComponents/ButtonCR';
import TextField from 'material-ui/TextField';
import ResponsiveDialogCR from '../customComponents/ResponsiveDialogCR';
import './EditContentDialog.css';

class EditContentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: props.text,
            updated: false,
        }
    }
    handleSave = () => {
        const {type, updateContent} = this.props;
        const {text} = this.state;
        switch(type) {
            case 'about': {
                const data = {text: text};
                updateContent(data, 'about').then(() => {
                    console.log('About Updated');
                    this.handleSetUpdated();
                })
            }
        }
    };
    handleSetUpdated = () => {
        const {handleCloseFunction} = this.props;
      this.setState({update: true});
        setTimeout(() => {
          handleCloseFunction()
        }, 1000)
    };
    onChange = event => {
        this.setState({text: event.target.value})
    };
    render() {
        const {text, updated} = this.state;
        const {title, type, admin, inputTitle, handleCloseFunction, open} = this.props;
        const actions = [
            <ButtonCR
                key={'close'}
                label={'Close'}
                color={'primary'}
                onClickFunction={handleCloseFunction}/>,
            <ButtonCR
                key={'save'}
                variant={'raised'}
                color={'primary'}
                label={updated ? 'Saved!' : 'Save'}
                onClickFunction={this.handleSave}/>
        ];
        if (admin) {
            return (
                <div>
                    <ResponsiveDialogCR
                        open={open}
                        title={title}
                        actions={actions}>
                        <TextField
                            autoFocus={true}
                            multiline
                            rows={8}
                            fullWidth={true}
                            name={type}
                            id={type}
                            label={inputTitle}
                            value={text}
                            onChange={this.onChange}/>
                    </ResponsiveDialogCR>
                </div>
            )
        } else {return null}
    }
}
function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}
export default connect(mapStateToProps, actions)(EditContentDialog)
