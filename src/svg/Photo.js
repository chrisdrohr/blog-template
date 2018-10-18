import React from 'react';
import {withStyles} from '@material-ui/core';

const styles = {
    svg: {
        height: '100%'
    }
};
const Photo = props => (
    <svg className={props.className} height={'100%'} width={'100%'} id="e939d086-638f-4996-87fc-c8f8e2e76ed8" data-name="Layer 1" viewBox="0 0 887.82 625.36">
        <path
            d="M1036,734.86A19.06,19.06,0,0,1,1017,754H183a19.06,19.06,0,0,1-19-19.16V165.14A19.06,19.06,0,0,1,183,146H1017a19.06,19.06,0,0,1,19,19.16"
            transform="translate(-163.46 -145.98)" fill="url(#54559514-f8bf-4b72-8b13-4037efd0578e)"/>
        <path
            d="M1026.19,725.54a18.52,18.52,0,0,1-18.52,18.52H192.93a18.52,18.52,0,0,1-18.52-18.52V174.78a18.52,18.52,0,0,1,18.52-18.52h814.74a18.52,18.52,0,0,1,18.52,18.52"
            transform="translate(-163.46 -145.98)" fill="#fff"/>
        <g id="5f7f4fba-1df4-4c9b-ab6f-3f66810cb66e" data-name="&lt;Rectangle&gt;">
            <rect x="43.49" y="36.62" width="787.52" height="537.89" rx="8.85" ry="8.85"
                  fill="url(#e6455490-a92e-4492-9f58-af2cf304751a)"/>
        </g>
        <rect x="53.19" y="49" width="767.31" height="510.36" rx="8.85" ry="8.85" fill="#fff"/>
        <g clipPath="url(#b627ac0e-a25e-4e67-ba10-e4156399602a)">
            <path
                d="M174,700.66,388.21,455.19a42.64,42.64,0,0,1,60.34-3.94l60,52.93a42.64,42.64,0,0,0,55.65.67L747.52,350.73a42.64,42.64,0,0,1,59,4l225,247.64a42.64,42.64,0,0,1,10.91,24.9l8.68,97.69a42.64,42.64,0,0,1-42.48,46.42H206.11A42.64,42.64,0,0,1,163.48,730h0A42.64,42.64,0,0,1,174,700.66Z"
                transform="translate(-163.46 -145.98)" fill="#3f94f0"/>
        </g>
        <circle cx="145.58" cy="130.83" r="47.52" fill="#ff5252"/>
    </svg>
);
export default withStyles(styles)(Photo)