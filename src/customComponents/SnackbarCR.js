import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import TypographyCR from '../customComponents/TypographyCR';
import ButtonCR from '../customComponents/ButtonCR';
import Link from '../Link';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class SnackbarCR extends Component {

    render() {
        const {classes, message, buttonLabel, show, url, closeButtonOnClick, icon} = this.props;
        console.log(message, buttonLabel, url);
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={show}
                    autoHideDuration={3000}
                    SnackbarContentProps={{'aria-describedby' : 'message-id'}}
                    message={
                        <TypographyCR
                            white={true}
                            type={'body2'}
                        text={message}/>
                    }
                    action={[
                        <div key={0}>
                            {url && buttonLabel &&
                            <Link
                                actual={true}
                                to={url}
                                component={
                                    <ButtonCR
                                        raised={true}
                                        color={'secondary'}
                                        key={'actionButton'}
                                        label={buttonLabel}
                                        icon={icon}/>
                                }/>}
                        </div>
                      ,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={closeButtonOnClick}>
                            <CloseIcon color={''}/>
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SnackbarCR)