import React from 'react';
import {
    ButtonBase,
    Card,
    GridListTileBar,
    Typography,
    withStyles
} from '@material-ui/core';
import classnames from 'classnames';
import ImgCR from './ImgCR';

const styles = theme => ({
    barRoot: {
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
        borderRadius: '0 0 4px 4px'
    },
    bar: {
        flexGrow: 'unset',
    },
    buttonBase: {
        display: 'block',
        height: '100%',
        width: '100%'
    },
    white: {
        color: 'white'
    }
});
const VideoCard = props => {
    const {classes} = props;
    return (
        <ButtonBase
            classes={{root: classes.buttonBase}}
            onClick={props.onClick}>
            <Card
                id={props.keyValue}>
                <ImgCR
                    // className={props.lg ? props.classes.imageLg : props.classes.image}
                    src={props.image}/>
                <GridListTileBar
                    classes={{
                        root: classes.barRoot,
                        titleWrap: classes.bar,
                        title: classes.white,
                    }}
                    title={
                        <Typography
                            className={classnames({
                                [classes.white]: true
                            })}
                            variant={props.isSmall ?
                                props.lg ? 'headline' : 'subheading' :
                                props.lg ? 'display1' : 'headline'}>
                            {props.title}
                        </Typography>
                    }/>
            </Card>
        </ButtonBase>
    );
};

export default withStyles(styles)(VideoCard)
