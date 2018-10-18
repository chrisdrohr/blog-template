import React from 'react';
import {CardMedia} from '@material-ui/core';

const MediaCR = props => {
    const {image, content, className, title, children, gradient, type, height} = props;
    return (
        <CardMedia
            title={title}
            image={image}
            style={{height: height}}
            classes={{root: 'rootMedia'}}
            className={className}>
            {children}
        </CardMedia>
    )
};
export default MediaCR
