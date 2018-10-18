import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {links} from "../Constants";
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter, Switch, Route} from 'react-router-dom';
import LoaderCR from '../customComponents/LoaderCR';
import Loadable from 'react-loadable';

const Home = Loadable({
    loader: () => import('../components/Home'),
    loading: LoaderCR
});
// const Vlog = Loadable({
//     loader: () => import('../components/Vlog'),
//     loading: LoaderCR
// });
// const About = Loadable({
//     loader: () => import('../components/About'),
//     loading: LoaderCR
// });
const Contact = Loadable({
    loader: () => import('../components/Contact'),
    loading: LoaderCR
});
const Admin = Loadable({
    loader: () => import('../components/Admin'),
    loading: LoaderCR
});

const styles = ({breakpoints}) => ({
    container: {
        margin: 'auto',
        maxWidth: 1200,
        [breakpoints.down('xl')]: {
            padding: 16
        },
        [breakpoints.down('lg')]: {
            padding: 16
        },
        [breakpoints.down('md')]: {
            padding: 16
        },
        [breakpoints.down('sm')]: {
            padding: 16
        },
        [breakpoints.down('xs')]: {
            padding: 8
        }
    }
});

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            profile: null,
            slide: true,
        };
        props.history.listen((location) => {
            this.updatePathName(location);
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const {user, setAsAdmin} = this.props;
        if (user.loggedIn) {
            // setAsAdmin()
        }
    }

    updatePathName = location => {
        const {updatePathName} = this.props;
        const pathname = location.pathname;
        return updatePathName(pathname)
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <Switch>
                    <Route exact path={links.home.url} component={Home}/>
                    {/*<Route path={links.blog.url} component={Blog}/>*/}
                    {/*<Route exact path={links.vlog.url} component={Vlog}/>*/}
                    {/*<Route exact path={links.about.url} component={About}/>*/}
                    <Route exact path={links.contact.url} component={Contact}/>
                    <Route exact path={links.admin.url} component={Admin}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content,
        isAdmin: state.isAdmin,
        user: state.user,
        profile: state.profile,
    }
}

export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(Body)))