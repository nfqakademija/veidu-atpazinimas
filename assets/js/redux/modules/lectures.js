import axios from 'axios';
import { normalize } from 'normalizr';

import _ from 'lodash';

import * as Action from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.lectures) {
        return _.merge({}, state, action.entities.lectures);
      }
      return state;
  }
};

export const fetchLectures = () => (dispatch, getState, {schema}) => {
  axios(`/api/lectures`)
      .then(({data}) => {
        const normalized = normalize(data, [schema.lecture]);
        dispatch({type: Action.FETCH_LECTURES, ...normalized});
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
};

export const createLecture = lecture => dispatch => {
  dispatch({type: Action.CREATE_LECTURE});
  axios.post(`/api/lectures`, lecture);
};

export const updateLecture = lecture => dispatch => {
  dispatch({type: Action.UPDATE_LECTURE});
  axios.put(`/api/lectures/${lecture.id}`, lecture);
};

export const deleteLecture = lecture => dispatch => {
  dispatch({type: Action.DELETE_LECTURE});
  axios.delete(`/api/lectures/${lecture.id}`);
};
