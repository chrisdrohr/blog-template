import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import {
    ButtonBase,
    Card,
    CardMedia,
    CardContent,
    Fade,
    Grid,
    Slide,
    Typography,
    withWidth,
} from '@material-ui/core';
import EditContentDialog from '../components/EditContentDialog';
import LoaderCR from '../customComponents/LoaderCR';
import UploadImageDialogCR from '../customComponents/UploadImageDialogCR';
import {withStyles} from '@material-ui/core/styles';
import {profile} from "../Constants";

const typographyTypes = {
  intro: {
      key: 'intro',
      title: 'Intro',
      variant: 'headline'
  },
    body1: {
        key: 'body1',
        title: 'Body 1',
        variant: 'subheading'
    },
    display: {
        key: 'display',
        title: 'Display',
        variant: 'display1',
        align: 'center',
    },
    body2: {
        key: 'body2',
        title: 'Body 2',
        variant: 'subheading',
    },
};
const styles = theme => ({
    container: {
        // height: 'calc(100vh - 112px)',
        // overflowY: 'auto',
        // overflowX: 'hidden',
    },
    imageTop: {
        height: '35vh',

    },
    imageBottom: {
        height: '35vh'
    },
    content: {
        maxWidth: 800,
        margin: 'auto'
    },
    textGridItem: {
        display: 'flex',
    }

});
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    handleOpen = () => {
        this.setState({open: true})
    };
    handleClose = () => {
        this.setState({open: false})
    };
    render() {
        const {content, isAdmin, classes} = this.props;
        const {open} = this.state;
        if (content.fetched) {
            const about = content.data.about;
            return (
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <section className={classes.container}>
                    <Grid container spacing={8}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Fade in={true} delay={100}>
                            <Card>
                                <CardMedia
                                    image={about.imageTop}
                                    className={classes.imageTop}>
                                    {isAdmin &&
                                    <UploadImageDialogCR
                                        contentType={'about'}
                                        type={'imageTop'}
                                        title={'Upload an Image'}/>
                                    }
                                </CardMedia>
                            </Card>
                            </Fade>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.textGridItem}>
                            <Fade in={true} delay={300}>
                            <CardContent className={classes.content}>
                                        {isAdmin ?
                                            <div>
                                                <ButtonBase
                                                    onClick={this.handleOpen}>
                                                        <Typography
                                                            variant={'subheading'}>
                                                            {/*{about.text}*/}
                                                        </Typography>
                                                </ButtonBase>

                                                <EditContentDialog
                                                    open={open}
                                                    handleCloseFunction={this.handleClose}
                                                    title={'Update About'}
                                                    inputTitle={'About'}
                                                    text={about.text}
                                                    type={'about'}/>
                                            </div>
                                            :
                                            Object.values(typographyTypes).map((typography, i) => {
                                                return (
                                                    <Typography
                                                        key={i}
                                                        align={typography.align}
                                                        variant={typography.variant}>
                                                        {about[typography.key]}
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </CardContent>
                            </Fade>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Fade in={true} delay={500}>
                            <Card>
                                <CardMedia
                                    image={about.imageBottom}
                                    className={classes.imageBottom}>
                                    {isAdmin &&
                                    <UploadImageDialogCR
                                        contentType={'about'}
                                        type={'imageBottom'}
                                        title={'Upload an Image'}/>
                                    }
                                </CardMedia>
                            </Card>
                            </Fade>
                        </Grid>
                    </Grid>
                </section>
                </Slide>
            )
        } else if (content.fetching){
            return (<LoaderCR/>)
        }
        else {
            return null;
        }
    }
}
function mapStateToProps(state) {
    return {
        content: state.content,
        isAdmin: state.admin,
        pathName: state.pathName,
    }
}

export default withRouter(connect(mapStateToProps, actions)(withWidth()(withStyles(styles)(About))))