import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {workWithMe} from "../Constants";
import Card, {CardContent} from 'material-ui/Card';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import Facebook from '../svg/Facebook';
import Instagram from '../svg/Instagram';
import Twitter from '../svg/Twitter';
import Pinterest from '../svg/Pinterest';
import Dot from 'material-ui-icons/RadioButtonUnchecked';
import PaperCircle from '../customComponents/PaperCircle';
import CircleImgCR from '../customComponents/CircleImgCR';
import './WorkWithMe.css';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
      margin: 'auto',
        maxWidth: 1300,
    },
    card: {
        display: 'flex',
        minWidth: 430,
        height: 270,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    iconContainer: {
        width: 151,
        height: 151,
    },
});

class WorkWithMe extends Component {
    constructor(props) {
        super(props);
            this.state = {
                text: workWithMe,
            }
    }

    getContent(value) {
        const {text} = this.state;
        const {classes} = this.props;
        switch (value) {
            case 'header':
                return (
                    <Card className={classes.card}>
                                <CardContent>
                                    <PaperCircle lg={true} avatar={<CircleImgCR src={''}/>}/>
                                </CardContent>
                            <CardContent className={classes.content}>
                                <Typography type="subheading">
                                    {text.header}
                                </Typography>
                            </CardContent>
                    </Card>
                );
                break;
            case 'instagram':
                return (
                    <Card className={classes.card}>
                        <div className={'details'}>
                            <CardContent className={classes.content}>
                                <Typography type="headline">Instagram</Typography>
                                <List dense>
                                    {text.instagram.map((text, i) =>
                                        <ListItem key={i}>
                                            <ListItemText secondary={text}/>
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </div>
                        <div className={'icon-container'}>
                            <Instagram/>
                        </div>
                    </Card>
                );
            break;
            case 'facebook':
                return (
                    <Card className={classes.card}>
                        <div className={'details'}>
                            <CardContent className={classes.content}>
                                <Typography type="headline">Facebook</Typography>
                                <List dense>
                                    {text.facebook.map((text, i) =>
                                        <ListItem key={i}>
                                            <ListItemText secondary={text}/>
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </div>
                        <div className={'icon-container'}>
                            <Facebook/>
                        </div>
                    </Card>
                );
            break;
            case 'pinterest':
                return (
                        <Card className={classes.card}>
                            <div className={'details'}>
                                <CardContent className={classes.content}>
                                    <Typography type="headline">Pinterest</Typography>
                                    <List dense>
                                        {text.pinterest.map((text, i) =>
                                            <ListItem key={i}>
                                                <ListItemIcon>
                                                    <Dot/>
                                                </ListItemIcon>
                                                <ListItemText secondary={text}/>
                                            </ListItem>
                                        )}
                                    </List>
                                </CardContent>
                            </div>
                            <div className={'icon-container'}>
                                <Pinterest/>
                            </div>
                        </Card>
                );
                break;
            case 'twitter':
                return (
                    <Card className={classes.card}>
                        <div className={'details'}>
                            <CardContent className={classes.content}>
                                <Typography type="headline">Twitter</Typography>
                                <List dense>
                                    {text.twitter.map((text, i) =>
                                        <ListItem key={i}>
                                            <ListItemText secondary={text}/>
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </div>
                        <div className={'icon-container'}>
                            <Twitter/>
                        </div>
                    </Card>
                );
                break;
            case 'blog':
                return (
                    <Card className={classes.card}>
                        <Grid container spacing={8}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <div className={'icon-container'}>
                                    <Twitter/>
                                </div>
                            </Grid>
                            <Grid item lg={8} md={6} sm={12} xs={12}>
                                <div className={'details'}>
                                    <CardContent className={classes.content}>
                                        <Typography type="headline">Blog</Typography>
                                        <List dense>
                                            {text.blog.map((text, i) =>
                                                <ListItem key={i}>
                                                    <ListItemText secondary={text}/>
                                                </ListItem>
                                            )}
                                        </List>
                                    </CardContent>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                );
                break;
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={'container'}>
                    <Grid justify={'center'} align={'center'} container spacing={16}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            {this.getContent('header')}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            {this.getContent('instagram')}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            {this.getContent('facebook')}
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            {this.getContent('pinterest')}
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            {this.getContent('twitter')}
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            {this.getContent('blog')}
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

}
export default withStyles(styles)(WorkWithMe)