import React from 'react'
import {NavLink} from 'react-router-dom';
import {links} from "../Constants";

const Link = props => {

    const getUrl = (to) => {
        switch (to) {
            case 'home':
                return links.home.url;
            case 'about':
                return links.about.url;
            case 'blog':
                return links.blog.url;
            case 'contact':
                return links.contact.url;
            case 'admin':
                return links.admin.url;
        }
    };
    const {to, actual, children} = props;
    if (to !== undefined) {
        return (
            <NavLink
                style={{textDecoration: 'none'}}
                activeStyle={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.54)'}}
                to={actual ? to : getUrl(to)}>
                {children}
            </NavLink>
        )
    } else {
        return (
            <div>
                {children}
            </div>
        )
    }
};

export default Link