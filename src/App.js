import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import MuiTheme from './MuiTheme';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reduxThunk from 'redux-thunk';
import Header from './components/Header';
import Body from './components/Body';
import AdminDrawer from './components/AdminDrawer';
import Data from './Data';
import BottomNav from './components/BottomNav';
import reducers from "./reducers";
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();
const loggerMiddleware = createLogger();
const store = applyMiddleware(reduxThunk, loggerMiddleware)(createStore);

const App = () => (
            <Provider store={store(reducers)}>
                <MuiTheme>
                    <Router history={history}>
                        <div>
                            <CssBaseline/>
                            <Data/>
                                <Header/>
                                <Body/>
                                <AdminDrawer/>
                                <BottomNav/>
                        </div>
                    </Router>
                </MuiTheme>
            </Provider>
        );
export default App