import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './modules';

import normalizedApi from './normalizedApi';

const configureStore = () => {
  const middlewares = [
    normalizedApi,
    thunk,
  ];

  return createStore(
      rootReducer,
      composeWithDevTools(
          applyMiddleware(...middlewares),
      ),
  );
};

export default configureStore;
