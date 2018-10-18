import React from 'react';
import {
    Button,
    CardActions,
    Fade,
    ListSubheader,
    withStyles,
} from '@material-ui/core';

const styles = theme => ({
    actions: {
        padding: 0,
        marginRight: 5,
    },
    iconContainer: {
        padding: '5px 5px 0 0',
    },

    flex: {
        display: 'flex',

    },
    font: {
        color: theme.palette.primary.main,
    },
    secondaryButton: {
        height: 32,
        padding: '0 8px',
        marginTop: 6,
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    white: {
        color: 'white',
    }
});

const HeaderDisplayCR = props => {
    const {title, white, actions, icon, classes, fontSize, secondaryTitle, secondaryIcon, secondaryOnClick} = props;
    return (
        <Fade
            in={true}
            style={{transitionDelay: 200}}>
            <div className={classes.spaceBetween}>
                <div className={classes.flex}>
                    {title &&
                    <ListSubheader
                        style={fontSize ? {fontSize: fontSize} : undefined}
                        classes={{root: classes.font}}
                        className={white ? classes.white : undefined}>
                        <div className={classes.flex}>
                            <div className={classes.iconContainer}>
                                {icon}
                            </div>
                            {title}
                        </div>
                    </ListSubheader>}

                    {secondaryTitle &&
                    <Button
                        size={'small'}
                        classes={{sizeSmall: classes.secondaryButton}}
                        variant={'raised'}
                        onClick={secondaryOnClick}
                        color={'primary'}>
                        <div className={classes.iconContainer}>
                            {secondaryIcon}
                        </div>
                        {secondaryTitle}
                    </Button>}
                </div>
                <CardActions className={classes.actions}>
                    {actions}
                </CardActions>
            </div>
        </Fade>
    )
};
export default withStyles(styles)(HeaderDisplayCR)