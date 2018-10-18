import React, {Component} from 'react';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {AttachMoney, Edit, Search, ErrorOutline, Add, School, HelpOutline} from 'material-ui-icons';
import DialogCR from './DialogCR';
import ButtonBase from 'material-ui/ButtonBase';
import './TierCard.css'

class TierCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    // getIcon() {
    //     switch (icon) {
    //         case 1: return break;
    //         case 2: return break;
    //         case 3: return break;
    //     }
    // }
    render() {
        const {price, title, detail, onClickFunction} = this.props;
        const {open} = this.state;

        return (
                <Card className={'tierCard-card'}>
                        <CardContent>
                            <Typography
                                className={'tierCard-price'}
                                align={'center'}
                                justify={'center'}
                                type={'display1'}>
                            <AttachMoney/>
                                {price}
                            </Typography>
                        <Divider/>
                            <ButtonBase
                                ref={node => {this.button = node}}
                                onClick={this.handleOpen}>
                                {/*{this.getIcon()}*/}
                            <Typography
                                className={'tierCard-title'}
                                align={'center'}
                                justify={'center'}
                                type={'subheading'}>
                                {title}
                            </Typography>
                            </ButtonBase>
                        </CardContent>
                    <Divider/>
                    <CardActions>
                    <Button
                        onClick={onClickFunction}
                        className={'tierCard-button'}
                        raised
                        color={'accent'}>
                        Contact
                    </Button>
                    </CardActions>
                    <DialogCR
                        open={open}
                        title={title}
                        text={detail}
                        actions={
                            <Button
                                color={'primary'}
                                onClick={this.handleRequestClose}>
                                Close
                            </Button>
                        }
                        />
                </Card>
        )
    }
}

export default (TierCard)