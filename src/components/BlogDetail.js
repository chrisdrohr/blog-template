import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Typography from 'material-ui/Typography';
import Card,{CardContent, CardMedia, CardHeader} from 'material-ui/Card';
import BlogDetailActions from '../customComponents/BlogDetailActions';
import './BlogDetail.css';

class BlogDetail extends Component {

    getPost() {
        const {post} = this.props;
        if (post.fetched) {
            return (
                <div>
                    <Card>
                    <CardMedia
                        className={'blogDetail-image'}
                        image={post.data.photoURL}
                        title={post.data.title}/>
                    </Card>
                    <BlogDetailActions/>
                    <CardHeader title={post.data.title}/>
                    <CardContent>
                        <Typography variant={'body1'}>
                            {post.data.body}
                        </Typography>
                    </CardContent>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getPost()}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        post: state.post,
    }
}
export default connect(mapStateToProps, actions)(BlogDetail)