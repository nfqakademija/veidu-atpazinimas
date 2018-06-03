import axios from 'axios/index';
import { normalize } from 'normalizr';

import _ from 'lodash';

import * as Action from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.students) {
        return _.merge({}, state, action.entities.students);
      }
      return state;
  }
};


export const fetchStudents = groupId => (dispatch, getState, {schema}) => {
  axios(`/api/students/`, {group: groupId})
      .then(({data}) => {
        const normalized = normalize(data, [schema.student]);
        console.log(normalized);
        dispatch({type: Action.FETCH_STUDENTS, ...normalized});
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
};
