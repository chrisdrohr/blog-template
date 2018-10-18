import React, {PureComponent} from 'react';
import Dialog, {
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    withMobileDialog
} from 'material-ui/Dialog';
import {CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import MediaCR from '../customComponents/MediaCR';
import './ResponsiveDialogCR.css';

const ResponsiveDialog = withMobileDialog({breakpoint: 'sm'})(Dialog);

class ResponsiveDialogCR extends PureComponent {

    render() {
        const {
            open,
            closeFunction,
            title,
            content,
            text,
            actions,
            image,
            subtitle,
            appBar,
            lg,
            imageUpload,
            mediaActions,
            children,
            addButton,
            full
        } = this.props;
        return (
            <ResponsiveDialog
                open={open}
                classes={{paper: lg ? 'responsiveDialog-dialogLg' : 'responsiveDialog-dialog'}}
                onClose={closeFunction}>
                {appBar && <div>{appBar}</div>}
                {title &&
                <DialogTitle>
                    {title}
                </DialogTitle>}
                {image &&
                <MediaCR
                    className={'responsiveDialog-image'}
                    image={image}
                    content={
                        <div>
                            {mediaActions &&
                            <CardActions className={'responsiveDialog-mediaActions'}>
                                {mediaActions}
                            </CardActions>}
                        </div>
                    }/>}
                {imageUpload && imageUpload}
                {children &&
                <DialogContent classes={{root: 'responsiveDialog-contentContainer'}}>
                    {text &&
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                    }
                    {children}
                </DialogContent>
                }
                <Divider/>
                {actions && <DialogActions>{actions}</DialogActions>}
            </ResponsiveDialog>
        )
    }
}
export default ResponsiveDialogCR