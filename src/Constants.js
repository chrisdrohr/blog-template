import React from 'react';
import * as Icon from '@material-ui/icons';
import Facebook from "./svg/Facebook";
import Linkedin from "./svg/LinkedIn";
import {IconButton} from "@material-ui/core";
import Pinterest from "./svg/Pinterest";
import Twitter from "./svg/Twitter";
import Instagram from "./svg/Instagram";

export const adminEmails = [
    'chrisrohrdev@gmail.com'
];
export const user = {
    name: 'Chris Rohr',
};
export const links = {
    home: {
        title: 'Home',
        url: '/',
        icon: 'home'
    },
    about: {
        title: 'About',
        url: '/about',
        icon: 'about',
    },
    // blog: {
    //     title: 'Blog',
    //     url: '/blog',
    //     icon: 'blog',
    // },
    // vlog: {
    //     title: 'Vlog',
    //     url: '/vlog',
    //     icon: 'vlog',
    // },
    // services: {
    //     title: 'Services',
    //     url: '/services'
    // },
    // shop: {
    //     title: 'Shop',
    //     url: '/shop',
    // },
    contact: {
        title: 'Contact',
        url: '/contact',
        icon: 'contact',
    },

    signOut: {
        title: 'Sign Out',
        url: '/',
        icon: 'signOut'
    },
    admin: {
        title: 'Admin',
        url: '/admin',
        icon: 'admin'
    },
    // subscribe: {
    //     title: 'Subscribe',
    //     url: '/subscribe',
    // }
};
export const blogDetailActions = {
    delete: {
        title: 'Delete',
        icon: 'delete',
    },
    featured: {
        title: 'Feature',
        icon: 'star',
    },
    share: {
        title: 'Share',
        icon: 'share',
    },
    facebook: {
        title: 'Facebook',
        icon: 'facebook'
    },
    twitter: {
        title: 'Twitter',
        icon: 'twitter',
    },
    instagram: {
        title: 'Instagram',
        icon: 'instagram',
    },
    linkedIn: {
        title: 'LinkedIn',
        icon: 'linkedIn',
    },
};
export const socialMediaLinks = {
    facebook: {
        title: 'Facebook',
        key: 'facebook',
        icon: <Facebook size={40}/>
    },
    instagram: {
        key: 'instagram',
        title: 'Instagram',
        icon: <Instagram size={40}/>,
    },
    linkedIn: {
        key: 'linkedIn',
        title: 'LinkedIn',
        icon: <Linkedin size={40}/>
    },
    pinterest: {
        key: 'pinterest',
        title: 'Pinterest',
        icon: <Pinterest size={40}/>,
    },
    twitter: {
        key: 'twitter',
        title: 'Twitter',
        icon: <Twitter size={40}/>
    },
};
export const adminTabs = [
    {
        label: 'Theme',
        icon: <Icon.InvertColors/>,
        value: 0,
    },
    {
        label: 'Social Media',
        icon: <Icon.Share/>,
        value: 1,
    },
    // {
    //     label: 'YouTube',
    //     icon: <Icon.Subscriptions/>,
    //     value: 2,
    // }
];
export const scrollbarSelector = {
    thumb: "&::-webkit-scrollbar-thumb",
    track: "&::-webkit-scrollbar-track"
};
export const mask = {
    maskImage:
        "-webkit-linear-gradient(to right, transparent, white 10px, white 90%, transparent)",
    maskImage:
        "-moz-linear-gradient(to right, transparent, white 10px, white 90%, transparent)",
    maskImage:
        "linear-gradient(to right, transparent, white 10px, white 90%, transparent)",
    webkitMaskImage:
        "-webkit-linear-gradient(to right, transparent, white 10px, white 90%, transparent)",
    webkitMaskImage:
        "-moz-linear-gradient(to right, transparent, white 10px, white 90%, transparent)",
    webkitMaskImage:
        "linear-gradient(to right, transparent, white 10px, white 90%, transparent)"
};
export const profile = {
    headline: [
        "React",
        "Flow",
        "Redux",
        "Firebase",
        "Javascript",
        "ES6",
        "HTML5",
        "CSS3",
        "Node.js",
        "SVG",
        "Android",
        "Material Design",
        "Java"
    ],
    location: "Greater Los Angeles Area",

    industry: "Computer Software",
    summary: [
        "Web and Android Developer, with an emphasis in React.js. Experienced in Computer hardware and technology, restaurant management, retail management, and demonstrated informative and highly satisfactory customer service. I have professionally been described as efficient, innovative, knowledgeable, motivated, hard working, timely, organized, and calculated."
    ],
    languagesAndFrameworks: [
        {title: "React", value: 95},
        {title: "HTML5", value: 95},
        {title: "CSS3", value: 95},
        {title: "Material Design", value: 99},
        {title: "Node.js", value: 90},
        {title: "Flow", value: 90},
        {title: "Redux", value: 90},
        {title: "ES6", value: 85},
        {title: "Javascript", value: 90},
        {title: "Java", value: 80},
        {title: "XML", value: 75},

        {title: "Espresso", value: 50}
    ],
    technical: [
        "Webstorm",
        "Android Studio",
        "Git / GitHub workflow",
        "Agile / SCRUM",
        "SQL",
        "J - Unit",
        "PC Troubleshooting",
        "Tech Support",
        "Networks",
        "Windows",
        "Linux",
        "Electronics Repair",
        "Printers",
        "Digital Electronics",
        "Microsoft Office",
        "Google Docs"
    ],
    apis: [
        "Firebase",
        "MailChimp V3",
        "YouTube V3",
        "Mandrill",
        "Twillio"
    ],
    projectManagement: ["Slack", "Git", "Github", "Trello"],
    additional: [
        "Problem Solver",
        "Innovative",
        "Tech Savvy",
        "Team Management",
        "Resourceful",
        "Competitive",
        "Efficient",
        "Hard - working",
        "Detail Oriented"
    ]
};


export const dev = process.env.NODE_ENV === "development";
export const prod = process.env.NODE_ENV === "production";
