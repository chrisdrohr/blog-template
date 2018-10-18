import React, {Component} from 'react';
import * as colors from '@material-ui/core/colors';
import {
    ButtonBase,
    Card,
    CardContent,
    Grid,
    List,
    ListSubheader,
    Typography} from '@material-ui/core';

class ColorPalette extends Component {
    colorsList() {
        const {type, themeFunction} = this.props;
        return (
            <Grid container spacing={24}>
                {Object.values(colors).map((color, i) => {
                    return (
                        <Grid key={i} item lg={6} md={6} sm={12} xs={12}>
                            <List subheader={<ListSubheader>{}</ListSubheader>}>
                                <Grid container spacing={8}>
                                    {Object.values(color).map((c, i) => {
                                        return (
                                            <Grid key={i} item lg={3} md={4} sm={4} xs={6}>
                                                <ButtonBase
                                                    content={
                                                        <Card
                                                            style={{backgroundColor: c, height: 50, width: '100%'}}
                                                            onClick={() => themeFunction({[type]: c})}>
                                                        </Card>
                                                    }/>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </List>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }
    themeList() {
        const {type, themeFunction} = this.props;
        const themeColors = {
            red: {
                title: 'Red',
                type: 'red',
                color: colors.red[500]
            },
            pink: {
                title: 'Pink',
                type: 'pink',
                color: colors.pink[500]
            },
            purple: {
                title: 'Purple',
                type: 'purple',
                color: colors.purple[500]
            },
            deepPurple: {
                title: 'Deep Purple',
                type: 'deepPurple',
                color: colors.purple[500]
            },
            indigo: {
                title: 'Indigo',
                type: 'indigo',
                color: colors.indigo[500]
            },
            blue: {
                title: 'Blue',
                type: 'blue',
                color: colors.blue[500]
            },
            lightBlue: {
                title: 'Light Blue',
                type: 'lightBlue',
                color: colors.blue[500]
            },
            cyan: {
                title: 'Cyan',
                type: 'cyan',
                color: colors.cyan[500]
            },
            teal: {
                title: 'Teal',
                type: 'teal',
                color: colors.teal[500]
            },
            green: {
                title: 'Green',
                type: 'green',
                color: colors.green[500]
            },
            lightGreen: {
                title: 'Light Green',
                type: 'lightGreen',
                color: colors.lightGreen[500]
            },
            lime: {
                title: 'Lime',
                type: 'lime',
                color: colors.lime[500]
            },
            yellow: {
                title: 'Yellow',
                type: 'yellow',
                color: colors.yellow[500]
            },
            amber: {
                title: 'Amber',
                type: 'amber',
                color: colors.amber[500]
            },
            orange: {
                title: 'Orange',
                type: 'orange',
                color: colors.orange[500]
            },
            deepOrange: {
                title: 'Deep Orange',
                type: 'deepOrange',
                color: colors.deepOrange[500]
            }
    };
        return (
            <Grid container spacing={24}>
                {Object.values(themeColors).map((theme, i) => {
                    return (
                        <Grid key={i} item lg={3} md={4} sm={6} xs={12}>
                            <ButtonBase>
                                    <Card
                                        style={{backgroundColor: theme.color, width: '100%'}}
                                        onClick={() => themeFunction({[type]: theme.type})}>
                                        <CardContent>
                                            <Typography
                                                type={'headline'}
                                                white={true}>
                                                {theme.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                            </ButtonBase>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    render() {

        const {type} = this.props;
        return (
           <div>
               {type === 'background' ? this.colorsList() : this.themeList()}
           </div>
        )
    }
}
export default ColorPalette