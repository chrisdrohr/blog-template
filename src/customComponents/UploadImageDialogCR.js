import React, {Component} from 'react';
import {storage} from "../Firebase";
import * as actions from '../actions';
import {connect} from 'react-redux';
import {AddAPhoto} from '@material-ui/icons';
import {
    Button,
    CardContent,
    withStyles,
    withWidth,
} from '@material-ui/core';
import ImageUpload from '../customComponents/ImageUpload';
import DialogCR from '../customComponents/DialogCR';

const styles = theme => ({
    dialog: {

    }
});
class UploadImageDialogCR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            progress: 0,
            photoURL: null,
            open: false,
        }
    }

    componentDidMount() {
        this.storageRef = storage().ref();
    }
    componentWillUnmount() {this.setState({photoURL: null})}
    handleSave = () => {
        const {type, contentType, updateContent} = this.props;
        const {photoURL} = this.state;
        const data = {[type]: photoURL};
        updateContent(data, contentType).then(() => {
            console.log(contentType, 'Updated');
        })
    };
    startUpload = () => {
            let file = document.getElementById('file').files[0];
            // let metadata = {
            //     customMetadata: {
            //         "specialKey": specialKey,
            //         "storagePath": storagePath,
            //         "databasePath": databasePath,
            //     }
            // };
            let uploadTask = this.storageRef.child('images').child(file.name).put(file);
            uploadTask.on('state_changed', (snapshot) => {
                this.handleUploadStart();
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.handleProgress(progress);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default: console.log('No Data');
                }
            }, (error) => {
                console.log(error);
                this.setState({isUploading: false});
            }, () => {
                let downloadUrl = uploadTask.snapshot.downloadURL;
                console.log('Upload Complete', downloadUrl, file);
                this.setState({progress: 100, isUploading: false});
                this.setState({
                    photoURL: downloadUrl,
                    filename: file.name,
                }, () => {
                    this.handleSave()
                })
            })
    };
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    render() {
        const {title, lg, classes} = this.props;
        const {
            open,
            progress,
            isUploading
        } = this.state;

        return (
            <div>
                <DialogCR
                    open={open}
                    classes={{paper: classes.dialog}}>
                    <ImageCR
                        progress={progress}
                        handleUpload={handleUpload}
                        isUploading={isUploading}
                        uploadMode={true}
                        src={src}/>
                </DialogCR>
            </div>
        )
    }
}

export default connect(null, actions)(withStyles(styles)(withWidth()(UploadImageDialogCR)))
