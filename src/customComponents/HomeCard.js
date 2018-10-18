import React, {Component} from 'react';
import Card, {CardMedia, CardContent} from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import FadeIn from '../transitionComponents/TransitionCR';
import './HomeCard.css'

class HomeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            title: props.title,
        }
    }

    render() {
        const {image, title} = this.state;
        return (
            <FadeIn
                component={
                    <ButtonBase className={'homeCard-button'}>
                        <Card className={'homeCard-card'}>
                            <CardMedia image={image} className={'homeCard-image'}>
                                <CardContent>
                                    <Typography
                                        className={'homeCard-title'}
                                        align={'center'}
                                        justify={'center'}
                                        type={'title'}>
                                        {title}
                                    </Typography>
                                </CardContent>
                            </CardMedia>
                        </Card>
                    </ButtonBase>
                }/>
        )
    }
}

export default HomeCard