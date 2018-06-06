import axios from 'axios';
import { denormalize } from 'normalizr';
import * as schema from '../api/schema';

import merge from 'lodash/merge';

const FETCH_LECTURES_REQUEST = 'FETCH_LECTURES_REQUEST';
const FETCH_LECTURES_SUCCESS = 'FETCH_LECTURES_SUCCESS';
const FETCH_LECTURES_FAILURE = 'FETCH_LECTURES_FAILURE';

const FETCH_ATTENDANCES_REQUEST = 'FETCH_ATTENDANCES_REQUEST';
const FETCH_ATTENDANCES_SUCCESS = 'FETCH_ATTENDANCES_SUCCESS';
const FETCH_ATTENDANCES_FAILURE = 'FETCH_ATTENDANCES_FAILURE';

const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';

const CREATE_LECTURE = 'CREATE_LECTURE';
const UPDATE_LECTURE = 'UPDATE_LECTURE';
const DELETE_LECTURE = 'DELETE_LECTURE';

export const lectures = (state = {}, action) => {
  if (action.entities && action.entities.lectures) {
    return merge({}, state, action.entities.lectures);
  }
  return state;
};

export const index = (state = [], action) => {
  switch (action.type) {
    case FETCH_LECTURES_SUCCESS:
      return [...state, ...action.result];
    default:
      return state;
  }
};

export const fetched = (state = [], action) => {
  switch (action.type) {
    case FETCH_ATTENDANCES_SUCCESS:
      return [...state, action.result];
    default:
      return state;
  }
};

export const fetchLectures = () => {
  return {
    types: [
      FETCH_LECTURES_REQUEST,
      FETCH_LECTURES_SUCCESS,
      FETCH_LECTURES_FAILURE,
    ],
    schemaType: [schema.lecture],
    shouldCallAPI: state => !state.index.lectures.length,
    callAPI: () => axios(`/api/lectures`),
  };
};

export const fetchAttendances = lectureId => {
  return {
    types: [
      FETCH_ATTENDANCES_REQUEST,
      FETCH_ATTENDANCES_SUCCESS,
      FETCH_ATTENDANCES_FAILURE,
    ],
    schemaType: schema.lecture,
    shouldCallAPI: state => !attendancesLoaded(state, lectureId),
    callAPI: () => axios(`/api/lectures/${lectureId}`),
  };
};

export const uploadPhoto = (lectureId, file) => {
  const data = new FormData();
  data.append('file', file);

  return {
    types: [UPLOAD_PHOTO_REQUEST, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE],
    schemaType: schema.lecture,
    shouldCallAPI: state => true,
    callAPI: () =>
      axios.post(`/api/lectures/${lectureId}/upload`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }),
  };
};

export const createLecture = lecture => dispatch => {
  dispatch({ type: CREATE_LECTURE });
  axios.post(`/api/lectures`, lecture);
};

export const updateLecture = lecture => dispatch => {
  dispatch({ type: UPDATE_LECTURE });
  axios.put(`/api/lectures/${lecture.id}`, lecture);
};

export const deleteLecture = lecture => dispatch => {
  dispatch({ type: DELETE_LECTURE });
  axios.delete(`/api/lectures/${lecture.id}`);
};

export const selectLectures = state =>
  denormalize(state.index.lectures, [schema.lecture], state.entities);

export const selectLecture = (state, lectureId) =>
  denormalize(lectureId, schema.lecture, state.entities);

export const attendancesLoaded = (state, lectureId) =>
  state.entities.lectures[lectureId] &&
  state.entities.lectures[lectureId].attendances;
