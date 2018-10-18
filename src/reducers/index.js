import {combineReducers} from 'redux';
import * as Reducer from './reducers';

const rootReducer = combineReducers({
    admin: Reducer.adminReducer,
    post: Reducer.postReducer,
    posts: Reducer.postsReducer,
    featuredPosts: Reducer.featuredPostsReducer,
    draftPosts: Reducer.draftPostsReducer,
    contacts: Reducer.contactsReducer,
    content: Reducer.contentReducer,
    user: Reducer.userReducer,
    profile: Reducer.profileReducer,
    alertDialog: Reducer.alertDialogReducer,
    blogDialog: Reducer.blogDialogReducer,
    theme: Reducer.themeReducer,
    adminDrawer: Reducer.adminDrawerReducer,
    pathName: Reducer.pathNameReducer,
    video: Reducer.videoReducer,
    youTubeChannel: Reducer.youTubeChannelReducer,
    youTubeUploads: Reducer.youTubeUploadsReducer,
});

export default rootReducer