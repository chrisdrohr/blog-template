import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    DialogContent,
    Grid,
    Typography,
    withStyles
} from '@material-ui/core';
import ColorPalette from '../ColorPalette';
import DialogCR from '../customComponents/DialogCR';
import SwitchCR from '../customComponents/SwitchCR';
import * as colors from "@material-ui/core/colors";
import {primary, secondary} from "../Colors";

const styles = ({palette}) => ({
    container: {
      maxWidth: 800,
      margin: 'auto',
    },
    card: {
        width: '100%',
        height: '100%',
        minHeight: 250,
    },
    switches: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    white: {
        color: palette.common.white
    }
});

class AdminTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            type: '',
        }
    }

    handleOpen = (item) => {
        this.setState({
            open: true,
            title: item.title,
            type: item.type,
        })
    };
    handleClose = () => {
        this.setState({open: false})
    };

    theme(type) {
        const {theme} = this.props;
        if (theme.fetched) {
            if (type === 'primary') {
                switch (theme.data.primary) {
                    case 'pink':
                        return colors.pink;
                    case 'lightBlue':
                        return colors.lightBlue;
                    case 'red':
                        return colors.red;
                    case 'purple':
                        return colors.purple;
                    case 'deepPurple':
                        return colors.deepPurple;
                    case 'indigo':
                        return colors.indigo;
                    case 'blue':
                        return colors.blue;
                    case 'cyan':
                        return colors.teal;
                    case 'green':
                        return colors.green;
                    case 'lightGreen':
                        return colors.lightGreen;
                    case 'lime':
                        return colors.lime;
                    case 'yellow':
                        return colors.yellow;
                    case 'amber':
                        return colors.amber;
                    case 'orange':
                        return colors.orange;
                    case 'deepOrange':
                        return colors.deepOrange;
                    case 'brown':
                        return colors.brown;
                    case 'grey':
                        return colors.grey;
                    case 'blueGrey':
                        return colors.blueGrey;
                    default:
                        return colors.pink;
                }
            }
            if (type === 'secondary') {
                switch (theme.data.secondary) {
                    case 'pink':
                        return colors.pink;
                    case 'lightBlue':
                        return colors.lightBlue;
                    case 'red':
                        return colors.red;
                    case 'purple':
                        return colors.purple;
                    case 'deepPurple':
                        return colors.deepPurple;
                    case 'indigo':
                        return colors.indigo;
                    case 'blue':
                        return colors.blue;
                    case 'cyan':
                        return colors.teal;
                    case 'green':
                        return colors.green;
                    case 'lightGreen':
                        return colors.lightGreen;
                    case 'lime':
                        return colors.lime;
                    case 'yellow':
                        return colors.yellow;
                    case 'amber':
                        return colors.amber;
                    case 'orange':
                        return colors.orange;
                    case 'deepOrange':
                        return colors.deepOrange;
                    case 'brown':
                        return colors.brown;
                    case 'grey':
                        return colors.grey;
                    case 'blueGrey':
                        return colors.blueGrey;
                    default:
                        return colors.pink;
                }
            }
        } else {
            return colors.pink;
        }
    }

    checkIfThemeExists(type) {
        const {theme} = this.props;
        switch (type) {
            case 'primary':
                return theme.fetched && theme.data.enabled && this.theme('primary') !== undefined;
            case 'secondary':
                return theme.fetched && theme.data.enabled && this.theme('secondary') !== undefined;
            default:
                return null;
        }
    }

    getTheme() {
        const {
            classes,
            theme
        } = this.props;
        const colors = {
            primary: {
                title: 'Primary',
                type: 'primary',
                color: this.checkIfThemeExists('primary') ? this.theme('primary')[500] : primary.main
            },
            secondary: {
                title: 'Secondary',
                type: 'secondary',
                color: this.checkIfThemeExists('secondary') ? this.theme('secondary')[500] : secondary.main
            },
            background: {
                title: 'Background',
                type: 'background',
                color: theme.fetched && theme.data.enabled ? theme.data.background : '',
            },
        };
        return Object.values(colors).map((item, i) => {
            const size = item.type !== 'background' ? 6 : 12;
            return (
                <Grid key={i}
                      item
                      lg={size}
                      md={size}
                      sm={size}
                      xs={12}>
                    <ButtonBase
                        className={classes.card}
                        onClick={() => this.handleOpen(item)}>
                        <Card
                            className={classes.card}
                            style={{backgroundColor: item.color}}>
                            <CardContent>
                                <Typography
                                    className={item.type !== 'background' ? classes.white : undefined}
                                    variant={'headline'}>
                                    {item.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </Grid>
            )
        })
    }

    render() {
        const {title, open, type} = this.state;
        const props = this.props;
        const {saveTheme, theme} = this.props;
        this.checkIfThemeExists();
        const actions = [
            <Button
                key={0}
                title={title}
                label={'Close'}
                onClick={this.handleClose}/>
        ];
        return (
            <div className={props.classes.container}>
                <CardActions className={props.classes.switches}>
                    <SwitchCR
                        label={'Custom Theme'}
                        checked={theme.data.enabled}
                        onChange={() => saveTheme({enabled: theme.data.enabled !== undefined ? !theme.data.enabled : true})}/>
                    <SwitchCR
                        label={'Header'}
                        checked={theme.data.header}
                        onChange={() => saveTheme({header: theme.data.header !== undefined ? !theme.data.header : true})}/>
                </CardActions>
                <DialogContent>
                    <Grid container spacing={8}>
                        {this.getTheme()}
                    </Grid>
                </DialogContent>
                <DialogCR
                    open={open}
                    title={title}
                    content={<ColorPalette themeFunction={saveTheme} type={type}/>}
                    actions={actions}/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(AdminTheme))