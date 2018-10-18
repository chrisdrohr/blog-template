import {auth, database} from "../Firebase";
import React from 'react';
import {
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
    GET_USER,
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    FETCH_PROFILE,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    ADMIN,
    OPEN_ALERT_DIALOG,
    CLOSE_ALERT_DIALOG,
    OPEN_BLOG_DIALOG,
    CLOSE_BLOG_DIALOG,
    FETCH_THEME,
    FETCH_THEME_FAILURE,
    FETCH_THEME_SUCCESS,
    OPEN_ADMIN_DRAWER,
    CLOSE_ADMIN_DRAWER,
    UPDATE_PATHNAME
} from './types';
import * as Type from './types';
import {adminEmails} from "../Constants";
import Axios from "axios/index";

const realTimeDb = database();
const posts = realTimeDb.ref('posts');
const featured = realTimeDb.ref('featured');
const drafts = realTimeDb.ref('drafts');
const user = realTimeDb.ref("user");
const contacts = realTimeDb.ref("contacts");
const contentRef = realTimeDb.ref("content");
const socialMediaRef = contentRef.child("socialMedia");
const themeRef = contentRef.child("theme");
const youTubeRef = contentRef.child("youTube");

const channelURL = 'https://www.googleapis.com/youtube/v3/channels';
const playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const apiKey = 'AIzaSyB-St_bjqwQhoEomtF8ryhhpGByedyej6g';

// export function doStuff() {
//     // posts.get().then((querySnapshot) => {
//     //     querySnapshot.forEach((doc) => {
//     //         const post = doc.data();
//     //         console.log(post.key)
//     //         realTimeDb.ref('posts').child(post.key).set(post).then(() => {
//     //             console.log('set')
//     //         })
//     //     })
//     //     // console.log(posts)
//     //     // realTimeDb.child('posts');
//     // })
//     contacts.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             const post = doc.data();
//             console.log(post.key)
//             realTimeDb.ref('contacts').child(post.key).set(post).then(() => {
//                 console.log('set')
//             })
//         })
//     })
//
// }

export function playVideo(videoId) {
    return dispatch => dispatch({type: Type.PLAY_VIDEO, payload: videoId})
}
export function closeVideo() {
    return dispatch => dispatch({type: Type.CLOSE_VIDEO})
}
export function updateYouTubeChannelId(channelId) {
    return dispatch => {
        youTubeRef.set(channelId).then(() => {
            console.log(channelId, 'Set');
        }).catch((error) => {
            console.error(error);
        })
    }
}
export function fetchYouTubeChannel(channel) {
    const params = {
        key: apiKey,
        // id: channel,
        id: 'UC3P5fn4w0_KlWoPCUNUNMrQ',
        maxResults: 25,
        part: 'snippet, contentDetails, statistics'
    };
    return dispatch => {
        dispatch({type: Type.FETCH_YOUTUBE_CHANNEL});

        Axios.get(channelURL, {params: params}).then(response => {
            const channel = response.data.items[0];
            const playlistId = channel.contentDetails.relatedPlaylists.uploads;
            dispatch({
               type: Type.FETCH_YOUTUBE_CHANNEL_SUCCESS,
                payload: channel
            });
            dispatch(fetchYouTubeChannelUploads(playlistId))
        }).catch(error => {
            dispatch({type: Type.FETCH_YOUTUBE_CHANNEL_FAILURE});
            console.error(error)
        });
    }
}
export function fetchYouTubeChannelUploads(playlistId) {
    const params = {
        key: apiKey,
        playlistId: playlistId,
        maxResults: 25,
        part: 'snippet'
    };
    return dispatch => {
        dispatch({type: Type.FETCH_YOUTUBE_UPLOADS});
        Axios.get(channelURL, {params: params}).then(response => {
            const videos = response.data.items;
                dispatch({
                    type: Type.FETCH_YOUTUBE_UPLOADS_SUCCESS,
                    payload: videos
                });
        }).catch(error => {
            dispatch({type: Type.FETCH_YOUTUBE_UPLOADS_FAILURE});
            console.error(error)
        });
    }

}
export function updateSocialMedia(data) {
    return dispatch => socialMediaRef.update(data).then(() => {
        console.log(data, 'Updated')
    }).catch((error) => {
        console.error(error)
    })
}
export function updatePathName(pathName) {
    return dispatch => {
        dispatch({
            type: UPDATE_PATHNAME,
            payload: pathName,
        })
    }
}
export function updateContent(data, type) {
    return dispatch => contentRef.child(type).update(data).then(() => {
        console.log(type, 'Updated')
    }).catch((error) => {
        console.error(error)
    })
}
export function fetchContent() {
    return dispatch => {
        dispatch({type: FETCH_CONTENT});
        contentRef.on('value', snapshot => {
            console.log(snapshot.val())
            if (snapshot.val() !== null) {
                dispatch({
                    type: FETCH_CONTENT_SUCCESS,
                    payload: snapshot.val(),
                })
            } else {
                dispatch({type: FETCH_CONTENT_FAILURE})
            }
        })
    }
}
export function fetchPost(postKey){
    const post = posts.child(postKey);
    return dispatch => {
        dispatch({type: FETCH_POST});
        post.on('value', snapshot => {
            if (snapshot.val() !== null) {
                dispatch({
                    type: FETCH_POST_SUCCESS,
                    payload: snapshot.val(),
                });
            } else {
                dispatch({type: FETCH_POST_FAILURE});
             console.log('Post does not exist');
            }
        })
    }
}
export function fetchPosts() {
    return dispatch => {
        dispatch({type: FETCH_POSTS});
        posts.on('value', snapshot => {
            const posts = snapshot.val();
            if (posts !== null) {
                dispatch({
                    type: FETCH_POSTS_SUCCESS,
                    payload: posts
                })
            } else {
                dispatch({
                    type: FETCH_POSTS_FAILURE
                })
            }
        })
    }
}
export function fetchFeaturedPosts() {
    return dispatch => {
        dispatch({type: FETCH_FEATURED_POSTS});
        featured.on('value', snapshot => {
            const featuredPosts = snapshot.val();
            if (featuredPosts !== null) {
                dispatch({
                    type: FETCH_FEATURED_POSTS_SUCCESS,
                    payload: featuredPosts
                })
            } else {
                dispatch({type: FETCH_FEATURED_POSTS_FAILURE})
            }
        });
    }
}
export function fetchDraftPosts() {
    return dispatch => {
        dispatch({type: FETCH_DRAFT_POSTS});
        drafts.on('value', snapshot => {
            const drafts = snapshot.val();
            if (drafts !== null) {
                dispatch({
                    type: FETCH_DRAFT_POSTS_SUCCESS,
                    payload: drafts,
                })
            } else {
                dispatch({type: Type.FETCH_DRAFT_POSTS_FAILURE})
            }
        })
    }
}
export function createPost(post) {
    const key = posts.push().key;
    Object.assign(post, {timestamp: Date.now(), key: key, draft: false});
    return dispatch => posts.child(key).set(post).then(() => {

    })
}
export function setPostFeatured(post) {
    const key = post.key;
    const featured = {featured: true};
    post.featured = featured;
    return dispatch => featured.update(post).then(() => {
        console.log('Successfully set post as Featured')
    }).catch((error) => {
        console.error('Error setting post as featured', error)
    })
}
export function setPostUnFeatured(post) {
    const key = post.key;
    // const featured = {featured: false};
    return dispatch => posts.update(null).then(() => {
        console.log('Successfully set post as UnFeatured')
    }).catch((error) => {
        console.error('Error setting post as Unfeatured', error)
    })
}
export function deletePost(key) {
    return dispatch => posts.child(key).delete().then(() => {
        console.log('Successfully deleted post')
    }).catch((error) => {
        console.error('Error deleting post', error)
    });
}
export function saveDraft(post) {
    const key = drafts.push().key;
    Object.assign(post, {key: key, draft: true});
    return dispatch => drafts.child(key).set(post)
}
export function setContact(data) {
    const key = contacts.push().key;
    const date = new Date().toDateString();
    Object.assign(data, {key: key, newContact: true, date: date});
    return dispatch => contacts.child(key).set(data).then(() => {
        console.log('New contact saved')
    }).catch((error) => {
        console.error('Error saving Contact', error)
    })
}
export function deleteContact(key) {
    return dispatch => contacts.child(key).remove().then(() => {
        console.log('Successfully deleted contact')
        dispatch(fetchContacts())
    }).catch((error) => {
        console.error('Error deleting contact', error)
    })
}
export function fetchContacts() {
    return dispatch => {
        dispatch({type: FETCH_CONTACTS});
        contacts.on('value', snapshot => {
            if (snapshot.val() !== null) {
                dispatch({
                    type: FETCH_CONTACTS_SUCCESS,
                    payload: snapshot.val()
                })
            } else {
                dispatch({type: FETCH_CONTACTS_FAILURE})
            }
        })
    }
}

export function fetchProfile() {
    return dispatch => {
        dispatch({type: FETCH_PROFILE});
        user.on('value', snapshot => {
            if (snapshot.val() !== null) {
                dispatch({
                    type: FETCH_PROFILE_SUCCESS,
                    payload: snapshot.val(),
                })
            } else {
                dispatch({type: FETCH_PROFILE_FAILURE});
                console.error('Profile does not exist')
            }
        })
    }
}
export function getUser() {
    return dispatch => {
        dispatch({type: GET_USER});
        auth().onAuthStateChanged((user) => {
            if (user) {
                const profile = auth().currentUser;
                const {photoURL, displayName, email} = profile;
                setUserData(photoURL, displayName, email);
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: auth().currentUser,
                })
                dispatch(setAsAdmin(email));
            } else {
                dispatch({type: GET_USER_FAILURE})
            }
        })
    }
}
export function signOut() {
    return dispatch => auth().signOut().then(() => {
        window.location.reload();
        console.log('User signed out')
    });
}
export function setAsAdmin(email) {
    return dispatch => {
        adminEmails.forEach((admin) => {
            if (email === admin) {
                dispatch({
                    type: ADMIN,
                    payload: true,
                })
            } else {
                console.log(email, 'is not an admin');
            }
        });
    };

}
export function setUserData(photoURL, userName, email) {
    const data = {
        photoURL: photoURL,
        userName: userName,
        email: email,
    };
    return dispatch => user.set(data).then(() => {
            console.log('Profile data updated');

        })
        .catch((error) => {
            console.log('Error updating data', error)
        })
}
export function saveTheme(theme) {
    return dispatch => {
        themeRef.update(theme).then(() => {
            console.log('Theme Updated', theme)
        }).catch((error) => {
            console.error(error)
        })
    }
}
export function fetchTheme() {
    return dispatch => {
        dispatch({type: FETCH_THEME});
        themeRef.on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                dispatch({
                    type: FETCH_THEME_SUCCESS,
                    payload: snapshot.val()
                })
            } else {
                dispatch({type: FETCH_THEME_FAILURE});
                console.error('theme does not exist')
            }
        })
    }
}




