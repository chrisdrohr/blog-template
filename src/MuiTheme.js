import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import {secondary, primary, font} from "./Colors";
import {isValid} from "./Helpers";

class MuiTheme extends Component {
    componentDidMount() {
      this.setBackground()
    }
    componentDidUpdate(prevProps) {
        const oldBackground = prevProps.theme.data.background;
        const newBackground = this.props.theme.data.background;
        if (newBackground !== oldBackground) {
            this.setBackground(newBackground)
        }
    };

    setBackground = (background) => {
        document.getElementById('root').style.backgroundColor = background;
        console.log('setBackground', background)
    };

    getTheme(type) {
        const {theme} = this.props;

        if (theme.fetched &&
            theme.data.enabled &&
            isValid(theme.data.primary) &&
            isValid(theme.data.secondary)) {
            if (type === 'primary') {
                switch(theme.data.primary) {
                    case 'pink': return colors.pink;
                    case 'lightBlue': return colors.lightBlue;
                    case 'red': return colors.red;
                    case 'purple': return colors.purple;
                    case 'deepPurple': return colors.deepPurple;
                    case 'indigo': return colors.indigo;
                    case 'blue': return colors.blue;
                    case 'cyan': return colors.teal;
                    case 'green': return colors.green;
                    case 'lightGreen': return colors.lightGreen;
                    case 'lime': return colors.lime;
                    case 'yellow': return colors.yellow;
                    case 'amber': return colors.amber;
                    case 'orange': return colors.orange;
                    case 'deepOrange': return colors.deepOrange;
                    case 'brown': return colors.brown;
                    case 'grey': return colors.grey;
                    case 'blueGrey': return colors.blueGrey;
                }
            }
            if (type === 'secondary') {
                switch(theme.data.secondary) {
                    case 'pink': return colors.pink;
                    case 'lightBlue': return colors.lightBlue;
                    case 'red': return colors.red;
                    case 'purple': return colors.purple;
                    case 'deepPurple': return colors.deepPurple;
                    case 'indigo': return colors.indigo;
                    case 'blue': return colors.blue;
                    case 'cyan': return colors.teal;
                    case 'green': return colors.green;
                    case 'lightGreen': return colors.lightGreen;
                    case 'lime': return colors.lime;
                    case 'yellow': return colors.yellow;
                    case 'amber': return colors.amber;
                    case 'orange': return colors.orange;
                    case 'deepOrange': return colors.deepOrange;
                    case 'brown': return colors.brown;
                    case 'grey': return colors.grey;
                    case 'blueGrey': return colors.blueGrey;
                }
            }
        } else {
            if (type === 'primary') {
                return colors.lightBlue;
            }
            if (type === 'secondary') {
                return colors.pink;
            }
        }
    }

    render() {
        const {children, theme} = this.props;
        const defaultMuiTheme = createMuiTheme({
            palette: {
                primary: {
                    light: primary.light,
                    main: primary.main,
                    dark: primary.dark,
                },
                secondary: {
                    light: secondary.light,
                    main: secondary.main,
                    dark: secondary.dark,
                },
                // error: colors.red.A400,
            },
        });
        const muiTheme = createMuiTheme({
            palette: {
                primary: {
                    // light: this.getTheme('primary')[300],
                    main: this.getTheme('primary')[500],
                    // dark: this.getTheme('primary')[800],
                    // contrastText: '#fff',
                },
                secondary: {
                    // light: this.getTheme('secondary')[300],
                    main: this.getTheme('secondary')[500],
                    // dark: this.getTheme('secondary')[800],
                    // contrastText: '#000',
                },
                // error: colors.red.A400,
            },
            overrides: {
                MuiDialog: {
                    paper: {
                        // minWidth: '80vw',
                    }
                },
                MuiAvatar: {
                    colorDefault: {
                        backgroundColor: this.getTheme('primary')[200]
                    }
                }
            }
        });


        return (
            <MuiThemeProvider
                // theme={muiTheme}
                theme={theme.data.enabled ? muiTheme : defaultMuiTheme}
            >
                {children}
            </MuiThemeProvider>
        )
    }
}
function mapStateToProps(state) {
    return {
        theme: state.theme,
    }
}
export default connect(mapStateToProps, null)(MuiTheme)