import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {links} from "./Constants";
import * as actions from './actions';
import {Route, Switch, withRouter} from 'react-router-dom';
import {isValid} from "./Helpers";


class Data extends Component {
    constructor(props) {
        super(props);
        props.history.listen((location) => {
            // this.loadData();
        })
    }
    componentDidMount() {
        this.fetchContent();
        this.fetchTheme();
        this.fetchProfile();
        this.getUser();
        // this.loadData();
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.content.fetched) {
    //         // setTimeout(this.fetchYouTubeData(), 500);
    //
    //     }
    // }
    loadYouTubeSubscribeScript = () => {
        if (window.gapi === undefined) {
            const script = document.createElement("script");
            script.src = "https://apis.google.com/js/platform.js";
            script.async = true;
            document.body.appendChild(script);
        }
    };

    loadData = () => {
        // const {location} = this.props.history;
        // const {pathname} = location;
        // const home = pathname === '/';
        // const about = pathname.startsWith('/about');
        // const blog = pathname.startsWith('/blog');
        // const contact = pathname.startsWith('/contact');
        // const vlog = pathname.startsWith(links.vlog.url);
        // switch (true) {
            // case home || blog: return this.fetchBlogPosts();
            // case vlog: return this.fetchYouTubeData();
        // }
    };
    getUser = () => {
        const {getUser} = this.props;
        getUser();
    };
    fetchTheme = () => {
        const {theme, fetchTheme} = this.props;
        if (!theme.fetched && !theme.fetching) {
            fetchTheme();
        }
    };
    fetchProfile = () => {
        const {fetchProfile, profile} = this.props;
        if (!profile.fetched && !profile.fetching) {
            fetchProfile()
        }
    };
    fetchContent = () => {
        const {fetchContent, content} = this.props;
        if (!content.fetching && !content.fetched) {
            fetchContent();
        }
    };
    fetchBlogPosts = () => {
        const {fetchPosts, posts, featuredPosts} = this.props;
            if (!posts.fetching || !posts.fetched) {
                fetchPosts();
            }
            if (!featuredPosts.fetching || !featuredPosts.fetched) {
                // fetchFeaturedPosts();
            }
    };
    fetchYouTubeData = () => {
        const {fetchYouTubeChannel, youTubeChannel, content} = this.props;
        if (content.fetched && isValid(content.data.youTube)) {
            const channel = content.data.youTube;
            if (!youTubeChannel.fetching && !youTubeChannel.fetched && !youTubeChannel.error) {
                fetchYouTubeChannel(channel)
            }
        }
    };

    render() {
        return (
            <Fragment>
                <Route exact path={links.home.url}>

                </Route>
                {/*<Route path={links.blog.url} component={Blog}/>*/}
                {/*<Route exact path={links.vlog.url}>*/}
                    {/*{this.fetchYouTubeData()}*/}
                {/*</Route>*/}
                {/*<Route exact path={links.about.url} component={About}/>*/}
                {/*<Route exact path={links.contact.url} component={Contact}/>*/}
                {/*<Route exact path={links.admin.url} component={Admin}/>*/}
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    return {
        youTubeChannel: state.youTubeChannel,
        pathName: state.pathName,
        posts: state.posts,
        featuredPosts: state.posts,
        content: state.content,
        user: state.user,
        profile: state.profile,
        theme: state.theme,
    }
}
export default withRouter(connect(mapStateToProps, actions)(Data))