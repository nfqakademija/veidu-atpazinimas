import axios from 'axios/index';
import { normalize } from 'normalizr';

import _ from 'lodash';

import * as Action from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.modules) {
        return _.merge({}, state, action.entities.modules);
      }
      return state;
  }
};


export const fetchModules = () => (dispatch, getState, {schema}) => {
  axios(`/api/modules/`)
      .then(({data}) => {
        const normalized = normalize(data, [schema.module]);
        console.log(normalized);
        dispatch({type: Action.FETCH_MODULES, ...normalized});
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
};
