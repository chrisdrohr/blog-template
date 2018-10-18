import React, {PureComponent} from 'react';
import ExpanderCR from './ExpanderCR';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';
import ListCR from './ListCR';
import IconButtonCR from './IconButtonCR';
import {ExpandMore} from '@material-ui/icons';

export default class ListItemCR extends PureComponent {
    state = {
        expanded: true,
    };
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render () {

        const {expanded} = this.state;
        const {icon, primaryText, secondaryText, secondaryAction, button, onClickFunction, thirdAction, inset, more, moreActions, children} = this.props;

        return (
            <div>
                <ListItem
                    onClick={onClickFunction}
                    button={button}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText
                        primary={primaryText}
                        secondary={secondaryText}
                        inset={inset}/>
                    {secondaryAction || more &&
                    <ListItemSecondaryAction>
                        {more &&
                        <IconButtonCR
                            className={expanded ? 'expanderCR-expanded' : 'expanderCR-reduced'}
                            onClickFunction={this.handleExpandClick}
                            icon={<ExpandMore/>}/>
                        }
                        {secondaryAction}
                        {thirdAction}
                        </ListItemSecondaryAction>}

                </ListItem>
                {children}
                {more &&
                <ExpanderCR
                    withoutButton={true}
                    externalExpanded={expanded}
                    content={<ListCR content={moreActions}/>}>
                </ExpanderCR>}
            </div>

        )
    }
}
