import React, {Component} from 'react';
import {LinearProgress} from 'material-ui/Progress';
import ReactSlider from 'react-slider';
import Tooltip from 'material-ui/Tooltip';
import ButtonCR from './ButtonCR';
import Paper from 'material-ui/Paper';
import TypographyCR from '../customComponents/TypographyCR';
import IconButtonCR from '../customComponents/IconButtonCR';
import './SliderCR.css';

class SliderCR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleRequestClose = () => {
        this.setState({ open: false });
    };
    handleRequestOpen = () => {
        this.setState({ open: true });
    };
    render() {
        const {open} = this.state;
        const {value, handleChangeFunction, icon, priceRange, onClickFunction} = this.props;
        return (
            <div className={'sliderCR-container'}>
                {/*<TypographyCR*/}
                    {/*type={'headline'}*/}
                    {/*text={'$'}/>*/}
                <div className={'sliderCR-innerContainer'}>
                    <Paper className={'sliderCR-progress'}>
                    <LinearProgress
                        className={'sliderCR-progress'}
                        mode={'determinate'}
                        value={value}/>
                    </Paper>
                        <ReactSlider
                            min={0}
                            max={100}
                            defaultValue={45}
                            onChange={handleChangeFunction}>
                                <ButtonCR
                                    color={'accent'}
                                    mini={true}
                                    fab={true}
                                    onClickFunction={onClickFunction}
                                    label={
                                        <Tooltip
                                            classes={{tooltip: 'sliderCR-tooltip', root: 'sliderCR-root'}}
                                            title={
                                                <TypographyCR
                                                    white={true}
                                                    type={'headline'}
                                                    text={priceRange}/>
                                            }
                                            placement={'top'}>
                                            {icon}
                                        </Tooltip>
                                    }
                                    className={'sliderCR-button'}/>
                        </ReactSlider>
                </div>
                {/*<TypographyCR*/}
                    {/*type={'headline'}*/}
                    {/*text={'$$$$$'}/>*/}
            </div>
        )
    }
}
export default SliderCR