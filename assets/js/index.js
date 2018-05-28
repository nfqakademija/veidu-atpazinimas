import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.getElementById('app'),
);
registerServiceWorker();