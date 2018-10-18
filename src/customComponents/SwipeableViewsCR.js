import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import './SwipeableViewsCR.css';

const SwipeableViewsCR = props => {
        const {index, handleChangeIndexFunction, children} = props;
        return (
            <SwipeableViews
                slideClassName={'swipeableViews-containerStyle'}
                index={index}
                onChangeIndex={handleChangeIndexFunction}>
                {children}
            </SwipeableViews>
        )
};
export default SwipeableViewsCR