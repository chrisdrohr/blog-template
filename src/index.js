import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV !== 'production') {
    console.log('Development Mode')
} else {
    console.log('Production Mode')
}

function render(Component) {
    ReactDOM.render(<Component/>, document.getElementById('root'))
}

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {render(App)})
}

registerServiceWorker();
