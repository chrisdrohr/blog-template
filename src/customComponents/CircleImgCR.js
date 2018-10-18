import React, {Component} from 'react';
import './CircleImgCR.css';

export default class CircleImgCR extends Component {

    render() {
        const {src, lg, xl, sm, xs, md} = this.props;
        this.class = 'circleImageCR-img';
        if (xs) this.class = 'circleImageCR-imgXs';
        if (sm) this.class = 'circleImageCR-imgSm';
        if (md) this.class = 'circleImageCR-imgMd';
        if (lg) this.class = 'circleImageCR-imgLg';
        if (xl) this.class = 'circleImageCR-imgXl';
        return (
            <img src={src} alt={''} className={this.class} />
        )
    }
}