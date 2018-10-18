import React, {Component} from 'react';
import Card, {CardContent, CardActions} from  'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import {photoURL} from "../constants/MyConstants";
import {Place, Event, ExpandMore} from 'material-ui-icons';
import {ListSubheader} from 'material-ui/List';
import {icon} from "../Colors";
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import CircleImgCR from './CircleImgCR';
import './ConsumerDropDown.css';

const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class ConsumerDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.expanded,
        }
    }
    handleExpandClick = () => {
        const {expanded} = this.state;
        this.setState({ expanded: !expanded });
    };

    render() {
        const {classes, titleField, title, primaryAction, date, zip, occasionField} = this.props;
        const {expanded} = this.state;
        return (
            <Card className={'consumerDropDown-card'}>
                <CardActions disableActionSpacing>
                    {titleField}
                    <Typography type={'subheading'} component={'h1'}>
                        {title}
                    </Typography>
                    {primaryAction}
                    <div className={'consumerDropDown-iconButtonContainer'}>
                        <IconButton
                            className={expanded ? classes.expand : classes.expandOpen}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more">
                            <ExpandMore/>
                        </IconButton>
                    </div>
                </CardActions>
                <Collapse in={expanded} transitionDuration='auto' unmountOnExit>
                    <ListSubheader>Currently Planning</ListSubheader>
                    <Divider/>
                    <CardContent>
                        <Typography className={'consumerDropDown-text'} type={'subheading'}>
                            <div className={'consumerDropDown-icon'}>
                                <CircleImgCR sm={true} src={photoURL.logo}/>
                            </div>
                            {title}
                        </Typography>
                        <Typography className={'consumerDropDown-text'} type={'subheading'}>
                            <Event className={'consumerDropDown-icon'} color={icon}/>
                            {new Date(date).toDateString()}
                        </Typography>
                        <Typography className={'consumerDropDown-text'} type={'body1'}>
                            <Place className={'consumerDropDown-icon'} color={icon}/>
                            {zip}
                        </Typography>
                        {occasionField}
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default withStyles(styles)(ConsumerDropDown)