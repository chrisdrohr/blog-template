import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import {Chat, ThumbUp, CreditCard, Announcement, ShoppingCart, MailOutline, PeopleOutline, Subscriptions, InvertColors, Share} from 'material-ui-icons';
import './TabsCR.css';

const TabsCR = props => {

    const getIcon = (type, tab) => {
        const {value} = props;
        switch(type) {
            case 'messages': return <Chat className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'confirm': return <ThumbUp className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'pending': return <Announcement className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'paymentComplete': return <CreditCard className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'cart': return <ShoppingCart className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'invitation': return <MailOutline className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'socialMedia': return <Share className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'people': return <PeopleOutline className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'youtube': return <Subscriptions className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            case 'theme': return <InvertColors className={'tabsCR-icon'} color={value === tab ? 'primary' : 'action'}/>;
            default: return null
        }
    };
        const {value, onChangeFunction, color, textColor, tabs} = props;
        return (
            <Tabs
                value={value}
                onChange={onChangeFunction}
                indicatorColor={color}
                textColor={textColor}
                centered>
                {Object.values(tabs).map((tab, i) => {
                    return <Tab
                        key={i}
                        className={'tabsCR-tab'}
                        label={tab.label}
                        value={tab.value}
                        icon={getIcon(tab.icon, tab.value)}/>
                })}
            </Tabs>
        )
};
export default TabsCR