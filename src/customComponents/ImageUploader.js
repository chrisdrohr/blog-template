//@flow
import React, {Component, Fragment} from 'react';
import {storage} from "../Firebase";
import * as actions from '../actions';
import {connect} from 'react-redux';
import {
    Button,
    CardContent,
    withStyles,
    withWidth,
} from '@material-ui/core';
import ImageCR from '../customComponents/ImageCR';
import AvatarCR from "./AvatarCR";

const styles = theme => ({

});

type State = {
    isUploading: boolean,
    progress: number,
    photoURL: string | null,
}
type Props = {
    avatar: boolean,
    src: string,
}
class ImageUploader extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            progress: 0,
            photoURL: null,
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
    handleUpload = () => {
        const {path} = this.props;
        let file = document.getElementById('file').files[0];
        const uploadRef = this.storageRef.child(path).child(file.name);
        let uploadTask = uploadRef.put(file);

        uploadTask.on('state_changed', (snapshot) => {
            this.handleUploadStart();
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.handleProgress(progress);
            switch (snapshot.state) {
                case storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            console.log(error);
            this.setState({isUploading: false});
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                this.setState({
                    photoURL: downloadURL,
                    filename: file.name,
                    progress: 100,
                    isUploading: false
                }, () => {
                    console.log('Upload Complete', downloadURL);
                });
            });
        })
    };
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    updateMetadata = () => {
        const {path} = this.props;
        const {filename} = this.state;
        const uploadRef = this.storageRef.child(path).child(filename);
        const metadata = {
            customMetadata: {
                path: path
            }
        };
        uploadRef.updateMetadata(metadata).then((metadata) => {
            console.log('Metadata updated!', metadata);
        }).catch((error) => {
            console.error(error);
            uploadRef.delete().then(() => {
                this.setState({isUploading: false});
                console.log('Deleted Image');
            });
        });
    };
    deleteUpload = () => {
        const {path} = this.props;
        const uploadRef = this.storageRef.child(path);
        uploadRef.delete().then(() => {
            this.setState({isUploading: false});
            console.log('Deleted Image');
        });
    };
    render() {
        const {title, lg, classes} = this.props;
        const {
            progress,
            isUploading,
            photoURL,
        } = this.state;

        return (
            <Fragment>
                {this.props.avatar ?
                    <AvatarCR
                        className={this.props.className}
                        progress={progress}
                        handleUpload={this.handleUpload}
                        isUploading={isUploading}
                        uploadMode={true}
                        src={photoURL || this.props.src}/>
                    :
                    <ImageCR
                        progress={progress}
                        handleUpload={this.handleUpload}
                        isUploading={isUploading}
                        uploadMode={true}
                        src={photoURL || this.props.src}/>
                }
            </Fragment>
        )
    }
}

export default connect(null, actions)(withStyles(styles)(withWidth()(ImageUploader)))
