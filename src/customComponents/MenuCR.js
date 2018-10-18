import React, {Component} from 'react';
import ListItemCR from '../customComponents/ListItemCR';
import Menu, {MenuItem} from 'material-ui/Menu';
import IconButtonCR from '../customComponents/IconButtonCR';

class MenuCR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            open: false,
        }
    }

    handleOpen = event => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    };
    handleClose = () => {this.setState({open: false})};

    handleMenuItemClick = (item) => {
        const {onClickFunction} = this.props;
        onClickFunction(item);
        this.handleClose();
    };

    render() {
        const {anchorEl, open} = this.state;
        const {button, primaryText, secondaryText, list, selected, iconMode, icon, algoliaMode, content} = this.props;
        return (
            <div>
                {iconMode ?
                    <IconButtonCR
                        icon={icon}
                        onClickFunction={this.handleOpen}/>
                    :
                    <ListItemCR
                        button={button}
                        primaryText={primaryText}
                        secondaryText={secondaryText}
                        onClickFunction={this.handleOpen}/>
                }
                {algoliaMode ?
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}>
                        {list.map((item) =>
                            <MenuItem
                                key={item.value}
                                selected={item.value === selected}
                                onClick={() => this.handleMenuItemClick(item.value)}>
                                {item.value}
                            </MenuItem>,
                        )}
                    </Menu>
                :
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}>
                        {content ?
                            <div>
                                {content}
                            </div>
                            :
                            list.map((item) =>
                            <MenuItem
                                key={item}
                                selected={item === selected}
                                onClick={() => this.handleMenuItemClick(item)}>
                                {item}
                            </MenuItem>,
                        )}
                    </Menu>
                }

            </div>
        )
    }
}
export default MenuCR