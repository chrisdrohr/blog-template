import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import {CardActions} from 'material-ui/Card'
import ButtonCR from '../customComponents/ButtonCR';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import './PopperCR.css';
import ButtonBaseCR from "./ButtonBaseCR";

class PopperCR extends Component {
    state = {
        open: false,
        anchorEl: null,
        anchorOriginVertical: 'top',
        anchorOriginHorizontal: 'left',
        transformOriginVertical: 'bottom',
        transformOriginHorizontal: 'center',
        positionTop: 200, // Just so the popover can be spotted more easily
        positionLeft: 400, // Same as above
        anchorReference: 'anchorEl',
    };

    updateModal = () => {
      const window = document.getElementById('')
    };

    handlePopoverOpen = event => {
        this.setState({
            open: true,
            anchorEl: event.target
        });
    };

    handlePopoverClose = () => {
        this.setState({
            open: false,
            anchorEl: null
        });
    };

    handleClickButton = () => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button),
        });
    };
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const {
            open,
            anchorEl,
            anchorOriginVertical,
            anchorOriginHorizontal,
            transformOriginVertical,
            transformOriginHorizontal,
            positionTop,
            positionLeft,
            anchorReference,
        } = this.state;
        const {children, content, buttonMode} = this.props;

        return (
            <div>
                {!buttonMode ?
                    <div onMouseOver={this.handlePopoverOpen} onMouseOut={this.handlePopoverClose}>
                        {children}
                    </div>
                    :
                    <div onClick={this.handleClickButton} ref={node => {this.button = node}}>
                        {children}
                    </div>
                }

                <Popover
                    className={'popperCR-container'}
                    classes={{paper: 'popperCR-paper'}}
                    open={buttonMode ? open : !!anchorEl}
                    anchorEl={anchorEl}
                    anchorReference={anchorReference}
                    anchorPosition={{top: positionTop, left: positionLeft}}
                    anchorOrigin={{
                        vertical: anchorOriginVertical,
                        horizontal: anchorOriginHorizontal,
                    }}
                    transformOrigin={{
                        vertical: transformOriginVertical,
                        horizontal: transformOriginHorizontal,
                    }}
                    onClose={this.handlePopoverClose}>
                    {content}
                    {buttonMode &&
                        <div>
                            <Divider/>
                            <CardActions>
                                <ButtonCR
                                    label={'close'}
                                    onClickFunction={this.handleClose}/>
                            </CardActions>
                        </div>
                    }
                </Popover>
            </div>
        )
    }
}
export default PopperCR