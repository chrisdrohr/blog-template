import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Route, withRouter} from 'react-router-dom';
import BlogCard from '../customComponents/BlogCard';
import {
    Grid
} from '@material-ui/core';
import AddBlogPostButton from './AddBlogPostButton';
import BlogDetail from './BlogDetail';
import LoaderCR from '../customComponents/LoaderCR';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCategory: null,
            postKey: null,
        };
        props.history.listen((location) => {
            this.checkURL(location)
        })
    }

    componentWillMount() {
        const {location} = this.props;
        this.checkURL(location);
    }
    checkURL(location) {
        const {fetchPost} = this.props;
        const pathName = location.pathname;
        const postKey = pathName.substr(pathName.lastIndexOf('/') + 1);
        if (postKey !== 'blog' && postKey !== '' && postKey !== 'about') {
            this.setState({postKey: postKey});
            fetchPost(postKey)
        }
    }
    handleCategoryClick = (postCategory) => {
      this.setState({postCategory: postCategory})
    };
    handlePostClick = (post) => {
    };
    getFeatured() {
        const {featuredPosts} = this.props;
        if (featuredPosts.fetched) {
            const featuredPostList = Object.values(featuredPosts.data).map((post, i) => {
                    return (
                        <Grid key={i} item lg={12} md={12} sm={12} xs={12}>
                            <BlogCard
                                featured={true}
                                post={post}
                                categoryOnClick={() => this.handleCategoryClick(post.category)}
                                postOnClick={() => this.handlePostClick(post)}/>
                        </Grid>
                    )
            });
            return (
                <Grid container spacing={24}>
                    {featuredPostList}
                </Grid>
            )
        } else if (featuredPosts.fetching) {
            return (
                <LoaderCR/>
            )
        }

    }
    getList() {
        const {posts} = this.props;
        if (posts.fetched) {
            const postList = Object.values(posts.data).map((post, i) => {
                return (
                    <Grid key={i} item lg={3} md={4} sm={4} xs={6}>
                        <BlogCard
                            post={post}
                            featured={false}
                            categoryOnClick={() => this.handleCategoryClick(post.category)}
                            postOnClick={() => this.handlePostClick(post)}/>
                    </Grid>
                )
            });

            return (
                <Grid align={'center'} justify={'center'} container spacing={24}>
                    {postList}
                </Grid>
            )
        } else if (posts.fetching) {
            return (
                <LoaderCR/>
            )
        }
    }

    getBlog() {
        const {isAdmin} = this.props;
        return (
            <div>
                {isAdmin && <AddBlogPostButton/>}
                {this.getFeatured()}
                {this.getList()}
            </div>
        )
    };

    render() {
        const {postKey} = this.state;
        return (
            <div className={'blog-container'}>
                <Route exact path={'/blog'} render={() => this.getBlog()}/>
                {postKey && <Route exact path={'/blog/'+ postKey} component={BlogDetail}/>}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        posts: state.posts,
        featuredPosts: state.featuredPosts,
        post: state.post,
        isAdmin: state.admin,
    }
}
export default withRouter(connect(mapStateToProps, actions)(Blog))