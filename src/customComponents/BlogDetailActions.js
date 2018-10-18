import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {CardActions} from 'material-ui/Card';
import Facebook from "../svg/Facebook";
import Instagram from '../svg/Instagram';
import Linkedin from '../svg/LinkedIn';
import Twitter from '../svg/Twitter';
import {StarBorder, Star, Share, Delete} from 'material-ui-icons';
import {blogDetailActions} from "../Constants";
import Tooltip from 'material-ui/Tooltip';
import IconButtonCR from '../customComponents/IconButtonCR';
import Link from './Link';

class BlogDetailActions extends Component {

    getIcon(icon) {
        const {post} = this.props;
        switch(icon) {
            case 'delete': return <Link to={'blog'} component={<Delete color={'action'}/>}/>;
            case 'star': return post.data.featured ? <Star/> : <StarBorder/>;
            case 'share': return <Share color={'action'}/>;
            case 'facebook': return <Facebook size={30}/>;
            case 'twitter': return <Twitter size={30}/>;
            case 'instagram': return <Instagram size={30}/>;
            case 'linkedIn': return <Linkedin size={30}/>;
            default: return null;
        }
    }

    getActions(icon) {
        const {post, setPostFeatured, setPostUnFeatured, deletePost} = this.props;
        switch(icon) {
            case 'delete': return deletePost(post.data.key);
            case 'star': return post.data.featured ? setPostUnFeatured(post.data) : setPostFeatured(post.data);
            case 'share': return <Share/>;
            case 'facebook': return <Facebook size={30}/>;
            case 'twitter': return <Twitter size={30}/>;
            case 'instagram': return <Instagram size={30}/>;
            case 'linkedIn': return <Linkedin size={30}/>;
            default: return null;
        }
    }

    getButtons() {
        const {isAdmin} = this.props;
        if (!isAdmin) {
            delete blogDetailActions.delete;
            delete blogDetailActions.featured;
        }
         return Object.values(blogDetailActions).map((action, i) => {
             return (
                 <Tooltip
                     key={i}
                     title={action.title}>
                 <IconButtonCR
                     onClickFunction={() => this.getActions(action.icon)}
                    icon={this.getIcon(action.icon)}/>
                 </Tooltip>
             )
         })
    }

    render() {
        return (
            <CardActions>
                {this.getButtons()}
            </CardActions>
        )
    }
}
function mapStateToProps(state) {
    return {
        post: state.post,
        isAdmin: state.admin
    }
}
export default connect(mapStateToProps, actions)(BlogDetailActions)