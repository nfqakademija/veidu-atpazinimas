import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import configureStore from './redux/index';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
