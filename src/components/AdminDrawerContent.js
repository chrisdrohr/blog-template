import React, {PureComponent} from 'react';
import {adminTabs} from "../Constants";
import SocialMediaLinks from './SocialMediaLinks';
import AdminTheme from './AdminTheme';
// import YouTube from "../YouTube";
import SwipeableViews from 'react-swipeable-views';
import classnames from 'classnames';
import {
    Tab,
    Tabs,
    withStyles
} from "@material-ui/core";

const styles = theme => ({
    container: {
        maxWidth: '100vw',
        overflow: 'hidden',
        margin: 'auto'
    },
    containerDrawer: {
        height: '70vh',
        maxWidth: '100vw',
        overflow: 'hidden',
        margin: 'auto'
    },
});

class AdminDrawerContent extends PureComponent {
    state = {
        index: 0,
        height: 0,
    };
    handleChange = (event, index) => {
        this.setState({index});
    };
    handleChangeIndex = index => {
        this.setState({index});
    };

    render() {
        const {index} = this.state;
        const props = this.props;
        const {classes} = this.props;
        return (
            <div className={classnames({
                [classes.containerDrawer]: props.drawerMode,
                [classes.container]: !props.drawerMode
            })}>
                <Tabs
                    fullWidth={true}
                    value={index}
                    onChange={this.handleChange}>
                    {adminTabs.map(tab => (
                        <Tab
                            key={tab.label}
                            label={tab.label}
                            value={tab.value}
                            icon={tab.icon}/>
                    ))}
                </Tabs>
                <SwipeableViews
                    index={index}
                    onChangeIndex={this.handleChangeIndex}>
                    <AdminTheme key={0}/>
                    <SocialMediaLinks key={1} showFields={true}/>
                </SwipeableViews>
            </div>
        )
    }
}

export default withStyles(styles)(AdminDrawerContent)
