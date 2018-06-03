import axios from 'axios/index';
import { normalize } from 'normalizr';

import _ from 'lodash';

import * as Action from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.groups) {
        return _.merge({}, state, action.entities.groups);
      }
      return state;
  }
};
