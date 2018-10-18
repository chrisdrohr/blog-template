import React, {Component} from 'react';
import Card, {CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Link from './Link';
import ButtonBase from 'material-ui/ButtonBase';
import FadeIn from '../transitionComponents/TransitionCR';
import './BlogCard.css'

class BlogCard extends Component {

    getPost() {
        const {post, categoryOnClick, postOnClick, draft, featured} = this.props;
        const {title, photoURL, mediaTitle} = post;
        let style;
        switch(true) {
            case featured: style = 'blogCard-imageFeatured'; break;
            case draft: style = 'blogCard=imageDraft'; break;
            default: style = 'blogCard-image'; break;
        }
        return (
            <div>
                <ButtonBase className={'blogCard-button'} onClick={postOnClick}>
                    <Card className={'blogCard-card'}>
                        <CardMedia
                            className={style}
                            title={mediaTitle}
                            image={photoURL}/>
                    </Card>
                </ButtonBase>
                <div className={'blogCard-textContainer'}>
                    {/*<ButtonBase onClick={categoryOnClick} className={'blogCard-categoryButton'}>*/}
                        {/*<Typography align={'left'} variant={'caption'} component="h1">*/}
                            {/*{title}*/}
                        {/*</Typography>*/}
                    {/*</ButtonBase>*/}
                    <Typography align={'left'} variant={draft? 'subheading' : 'headline'} component="h1">
                        {title}
                    </Typography>
                </div>
            </div>
        )
    }
    render() {
        const {post, draft} = this.props;
        const {key} = post;
        if (draft) {
            return (<FadeIn component={this.getPost()}/>)
        } else {
            return (
                <Link
                    actual={true}
                    to={'/blog/'+ key}
                    component={this.getPost()}/>
            )
        }
    }
}
export default BlogCard