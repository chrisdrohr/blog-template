import React, {Component} from 'react';
import {
    Button,
    Card,
    CardMedia,
    CircularProgress,
} from '@material-ui/core';
import {AddAPhoto} from '@material-ui/icons';

export default class ImageUpload extends Component {

    render() {
        const {photoURL, isUploading, progress, startUploadFunction} = this.props;
        return (
            <CardMedia
                image={photoURL !== undefined && photoURL !== null ? photoURL || '' : ''}
                className={'imageUpload-image'}>
                {!photoURL &&
                <div>
                    <input
                        accept="image/*"
                        className={'imageUpload-input'}
                        onChange={startUploadFunction}
                        id="file"
                        type="file"/>
                    <label htmlFor="file">
                        <Button
                            variant={'fab'}
                            color={'primary'}
                            component={'span'}
                            className={'imageUpload-imageButton'}>
                            <AddAPhoto className={'imageUpload-imageIcon'}/>
                        </Button>
                    </label>
                </div>
                }
                {isUploading && <CircularProgress size={80} className={'imageUpload-progress'} value={progress}/>}
            </CardMedia>
        )
    }
}