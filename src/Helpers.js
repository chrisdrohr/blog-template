// @flow
import {dev} from "./Constants";
import SmoothScroll from 'smoothscroll-polyfill';

SmoothScroll.polyfill();
export const gridListCols = (width: string, xl: number, lg: number, md: number, sm: number, xs: number) => {
    switch (width) {
        case 'xl': return xl;
        case 'lg': return lg;
        case 'md': return md;
        case 'sm': return sm;
        case 'xs': return xs;
    }
};

export const addYoutubeControls = (link: string, mute: boolean | string) => {
    const muteAddon = mute ? '&mute=1' : '';
    const autoPlay = mute ? '&autoplay=1' : '';
    const controls = '/?rel=0&cc_load_policy=1' + muteAddon + autoPlay;
    return link+controls ;
};
export const getLastStringFromPathName = (pathname: string) => {
    const string = pathname.split('/').pop();
    {dev && console.log('get last string from pathname:', string)}
    return string
};
export const getStringFromPathName = (pathname: string, index: number) => {
    const string = pathname.split('/')[index];
    {dev && console.log('get string from pathname:', string)}
    return string
};
export const removeAllNonDigits = (number: number | string) => number.replace(/\D+/g, '');
export const trimString = (string: string, length: number) => {
    if (string.length > 25) {
        return string.substring(0, length) + '...';
    } else {
        return string
    }
};
export const makeUpperCase = (string: string) => string.toUpperCase();
export const removeSpacesAndMakeLowerCase = (string: string) => {
    if (string !== undefined) {
        return string.toLowerCase().replace(' ', '');

    } else {
        return null
    }
};
export const cleanString = (string: string) => {
    if (string !== undefined) {
        return string
    } else {
        return ''
    }
};
export const cleanObject = (object: Object) => {
    if (object !== undefined) {
        return object
    } else {
        return {}
    }
};
export const cleanArray = (array: Array<any>) => {
    if (array !== undefined) {
        return array
    } else {
        return []
    }
};
export const handleScrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element !== null) {
        {dev && console.log('Scroll into view:', id)}
        element.scrollIntoView({behavior: 'smooth'})
    }
};
export const handleScrollToTop = (id: string) => {
    const container = document.getElementById(id);
    if (container !== null) {
        {dev && console.log('Scroll To Top of:', id)}
        container.scrollTop = 0;
    }
};
export const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element !== null) {
        {dev && console.log('Click:', id)}
        element.click();
    } else {
        {dev && console.log('not found id:', id)}
    }
};
export const handleFocus = (id: string) => {
    const field = document.getElementById(id);
    if (field !== null) {
        field.focus();
    }
};
export const showNav = (id: string) => {
    const nav = document.getElementById(id);
    if (nav !== null) {
        nav.style.display = 'visible';
    }
};
export const hideNav = (id: string) => {
    const nav = document.getElementById(id);
    if (nav !== null) {
        nav.style.display = 'none';
    }
};
export const filterLiveData = (data: Array<Object>) => {
    return Object.values(data).filter(item => item.archived === false || item.archived === undefined);
};
export const convertAmountToPrice = (price: number) => {
    return parseInt(price/100).toFixed(2)
};

export const snackBuilder = (snack: Object, string: string, start: boolean) => {
    const message = start ? string + snack.message : snack.message + string;
    const builtSnack = {
        buttonLabel: snack.buttonLabel,
        message: message,
        url: snack.url
    };
    return builtSnack;
};

export const isValid = (value: any) => {
    return value !== undefined && value !== null;
};
export const isNotEmpty = (value: string | number | Array<any>) => {
    return value.length !== 0;
};
export const arrayIsNotEmpty = (array: Array<any>) => {
    return Object.keys(array).length !== 0;
};
export const isEmpty = (value: string) => {
    return value.length === 0;
};
export const everyItemIsNotEmpty = (array: Array<string | Array>) => {
    return array.every(string => string.length !== 0);
};
export const stringHasMoreThan = (string: string, number: number) => string.length > number;
export const isSmall = (width: string) => {
    return width === 'sm' || width === 'xs'
};
export const isMobile = (width: string) => width === 'xs';
export const isString = (string: string) => {
    return typeof string === 'string';
};
export const isObject = (object: Object) => {
    return typeof object === 'object';
};
export const isArray = (array: Array<string>) => {
    return Array.isArray(array);
};
export const getDimensions = (node, ReactDOM) => {
    if (isValid(node.current)) {
        const dimensions = ReactDOM.findDOMNode(node.current).getBoundingClientRect();
        // {dev && console.log('dimensions', dimensions)}
        return {
            width: dimensions.width,
            height: dimensions.height
        }
    }
};
export const getDimensionsFromId = (id: string) => {
    const element = document.getElementById(id);
    if (element !== null) {
        const dimensions = element.getBoundingClientRect();
        const { height, width, x, y } = dimensions;
        {dev && console.log(id, height, width, x, y)}
        return {
            height: height,
            width: width,
            x: x,
            y: y
        }
    }
};
export const helpPhotoURL = (photoURL: string | Object, size: string) => {
    if (isString(photoURL)) {
        return photoURL;
    }
    if (isObject(photoURL)) {
        return photoURL[size];
    }

};