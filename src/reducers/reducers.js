import {
    ADMIN,
    GET_USER,
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    FETCH_PROFILE,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    FETCH_POST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_DRAFT_POSTS,
    FETCH_DRAFT_POSTS_SUCCESS,
    FETCH_DRAFT_POSTS_FAILURE,
    FETCH_FEATURED_POSTS,
    FETCH_FEATURED_POSTS_SUCCESS,
    FETCH_FEATURED_POSTS_FAILURE,
    FETCH_CONTACTS,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    FETCH_CONTENT,
    FETCH_CONTENT_SUCCESS,
    FETCH_CONTENT_FAILURE,
    OPEN_ALERT_DIALOG,
    CLOSE_ALERT_DIALOG,
    OPEN_BLOG_DIALOG,
    CLOSE_BLOG_DIALOG,
    FETCH_THEME,
    FETCH_THEME_FAILURE,
    FETCH_THEME_SUCCESS,
    OPEN_ADMIN_DRAWER,
    CLOSE_ADMIN_DRAWER,
    UPDATE_PATHNAME,
} from "../actions/types";
import * as Type from '../actions/types';
import {links} from "../Constants";


const initialState = {
    fetching: false,
    fetched: false,
    data: [],
    error: null,
};
const initialContentState = {
    fetching: false,
    fetched: false,
    data: {
        about: {},
        contact: {
            contactImage: '',
        },
        socialMedia: {

        },
        theme: {},
        youTube: '',
    },
    error: null,
};
const initialUserState = {
    loggedIn: false,
    fetching: false,
    fetched: false,
    data: [],
    error: null,
};
const initialDialogState = {
    open: false,
    data: [],
};
const initialPathNameState = {
    url: '/',
    name: 'Home',
    value: 0
};
export function pathNameReducer(state = initialPathNameState, action) {
    const {home, about, vlog, contact, admin} = links;
    switch(action.type) {
        case UPDATE_PATHNAME: {
            const url = action.payload;
            switch (true) {
                case url === home.url: return {url: url, name: 'Home', value: 0};
                case url.startsWith(about.url): return {url: url, name: 'About', value: 1};
                // case url.startsWith(vlog.url): return {url: url, name: 'Vlog', value: 2};
                case url.startsWith(contact.url): return {url: url, name: 'Contact', value: 3};
                case url.startsWith(admin.url): return {url: url, name: 'Admin', value: 4};
                default: return {url: url, name: 'Home', value: 0};
            }
        }
    }
    return state;
}
export function adminReducer(state = false, action) {
    switch (action.type) {
        case ADMIN: return action.payload;
    }
    return state;
}
export function videoReducer (state = {data: ''}, action) {
    switch (action.type) {
        case Type.PLAY_VIDEO: return {data: action.payload};
        case Type.CLOSE_VIDEO: return {data: 'close'}
    }
    return state;
}
export function youTubeChannelReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: true};
    switch (action.type) {
        case Type.FETCH_YOUTUBE_CHANNEL: return start;
        case Type.FETCH_YOUTUBE_CHANNEL_SUCCESS: return success;
        case Type.FETCH_YOUTUBE_CHANNEL_FAILURE: return error;
    }
    return state;
}
export function youTubeUploadsReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching Uploads'};
    switch (action.type) {
        case Type.FETCH_YOUTUBE_UPLOADS: return start;
        case Type.FETCH_YOUTUBE_UPLOADS_SUCCESS: return success;
        case Type.FETCH_YOUTUBE_UPLOADS_FAILURE: return error;
    }
    return state;
}
export function userReducer(state = initialUserState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, loggedIn: true, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching User'};
    switch (action.type) {
        case GET_USER: return start;
        case GET_USER_SUCCESS: return success;
        case GET_USER_FAILURE: return error;
    }
    return state;
}
export function profileReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching Profile'};
    switch (action.type) {
        case FETCH_PROFILE: return start;
        case FETCH_PROFILE_SUCCESS: return success;
        case FETCH_PROFILE_FAILURE: return error;
    }
    return state;
}
export function postReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching Post'};
    switch (action.type) {
        case FETCH_POST: return start;
        case FETCH_POST_SUCCESS: return success;
        case FETCH_POST_FAILURE: return error;
    }
    return state;
}
export function postsReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching Posts'};
    switch (action.type) {
        case FETCH_POSTS: return start;
        case FETCH_POSTS_SUCCESS: return success;
        case FETCH_POSTS_FAILURE: return error;
    }
    return state;
}
export function featuredPostsReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching Posts'};
    switch (action.type) {
        case FETCH_FEATURED_POSTS: return start;
        case FETCH_FEATURED_POSTS_SUCCESS: return success;
        case FETCH_FEATURED_POSTS_FAILURE: return error;
    }
    return state;
}
export function draftPostsReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: 'Error Fetching draft Posts'};
    switch (action.type) {
        case FETCH_DRAFT_POSTS: return start;
        case FETCH_DRAFT_POSTS_SUCCESS: return success;
        case FETCH_DRAFT_POSTS_FAILURE: return error;
    }
    return state;
}
export function contactsReducer (state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, data: [], error: action.payload};
    switch (action.type) {
        case FETCH_CONTACTS: return start;
        case FETCH_CONTACTS_SUCCESS: return success;
        case FETCH_CONTACTS_FAILURE: return error;
    }
    return state;
}
export function contentReducer (state = initialContentState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: action.payload};
    switch(action.type) {
        case FETCH_CONTENT: return start;
        case FETCH_CONTENT_SUCCESS: return success;
        case FETCH_CONTENT_FAILURE: return error;
    }
    return state;
}
export function alertDialogReducer(state = initialDialogState, action) {
    switch(action.type) {
        case OPEN_ALERT_DIALOG: return {...state, open: true, data: action.payload};
        case CLOSE_ALERT_DIALOG: return {...state, open: false, data: []};
    }
    return state;
}
export function blogDialogReducer(state = false, action) {
    const open = true;
    const close = false;
    switch(action.type) {
        case OPEN_BLOG_DIALOG: return open;
        case CLOSE_BLOG_DIALOG: return close;
    }
    return state;
}
export function themeReducer(state = initialState, action) {
    const start =  {...state, fetching: true};
    const success = {...state, fetching: false, fetched: true, data: action.payload};
    const error = {...state, fetching: false, error: action.payload};
    switch(action.type) {
        case FETCH_THEME: return start;
        case FETCH_THEME_SUCCESS: return success;
        case FETCH_THEME_FAILURE: return error;
    }
    return state;
}
export function adminDrawerReducer(state = false, action) {
    const open = true;
    const close = false;
    switch(action.type) {
        case OPEN_ADMIN_DRAWER: return open;
        case CLOSE_ADMIN_DRAWER: return close;
    }
    return state;
}


