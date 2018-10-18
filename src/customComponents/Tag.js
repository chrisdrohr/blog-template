import React, {Component} from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './Tag.css';

class Tag extends Component {

    render() {
        const {title, component} = this.props;
        return (
            <div>
                <Card className={'tag-card'}>
                        <Typography className={'tag-text'} noWrap={true} align={'right'} type={'caption'} component={'h1'}>
                            {title}
                        </Typography>
                </Card>
                {component}
            </div>
        )
    }
}

export default Tag