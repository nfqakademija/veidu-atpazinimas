import axios from 'axios/index';
import { normalize } from 'normalizr';

import _ from 'lodash';

import * as Action from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.attendances) {
        return _.merge({}, state, action.entities.attendances);
      }
      return state;
  }
};


export const fetchAttendances = lectureId => (dispatch, getState, {schema}) => {
  axios(`/api/lectures/${lectureId}`)
      .then(({data}) => {
        const normalized = normalize(data, schema.lecture);
        console.log(normalized);
        dispatch({type: Action.FETCH_ATTENDANCES, ...normalized});
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
};
