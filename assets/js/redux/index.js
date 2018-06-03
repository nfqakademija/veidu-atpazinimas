import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './modules';

import * as schema from './api/schema';

const configureStore = () => {
  return createStore(
      rootReducer,
      composeWithDevTools(
          applyMiddleware(
              thunk.withExtraArgument({schema}),
          ),
      ),
  );
};

export default configureStore;
