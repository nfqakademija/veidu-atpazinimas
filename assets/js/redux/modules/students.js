import axios from 'axios';
import merge from 'lodash/merge';

import * as schema from '../api/schema';

const FETCH_STUDENTS_IN_MODULE_REQUEST = 'FETCH_STUDENTS_IN_MODULE_REQUEST';
export const FETCH_STUDENTS_IN_MODULE_SUCCESS =
  'FETCH_STUDENTS_IN_MODULE_SUCCESS';
const FETCH_STUDENTS_IN_MODULE_FAILURE = 'FETCH_STUDENTS_IN_MODULE_FAILURE';

const FETCH_STUDENTS_IN_GROUP_REQUEST = 'FETCH_STUDENTS_IN_GROUP_REQUEST';
export const FETCH_STUDENTS_IN_GROUP_SUCCESS =
  'FETCH_STUDENTS_IN_GROUP_SUCCESS';
const FETCH_STUDENTS_IN_GROUP_FAILURE = 'FETCH_STUDENTS_IN_GROUP_FAILURE';

const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

export const students = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.students) {
        return merge({}, state, action.entities.students);
      }
      return state;
  }
};

export const index = (state = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS_IN_MODULE_SUCCESS:
    case FETCH_STUDENTS_IN_GROUP_SUCCESS:
      return merge([], state, [action.result]);
    default:
      return state;
  }
};

// export const selectStudentsInModule = (state, moduleId) => state.entities.modules[moduleId].groups
//     .map(id => state.entities.groups[id])
//     .zip();

export const selectStudentsInGroup = (state, groupId) =>
  Object.keys(state.entities.students)
    .map(id => state.entities.students[id])
    .filter(student => student.group !== groupId);

export const fetchStudents = ({ module, group }) => {
  const params = module ? { module: +module } : { group: +group };
  return {
    types: module
      ? [
          FETCH_STUDENTS_IN_MODULE_FAILURE,
          FETCH_STUDENTS_IN_MODULE_SUCCESS,
          FETCH_STUDENTS_IN_MODULE_FAILURE,
        ]
      : [
          FETCH_STUDENTS_IN_GROUP_REQUEST,
          FETCH_STUDENTS_IN_GROUP_SUCCESS,
          FETCH_STUDENTS_IN_GROUP_FAILURE,
        ],
    schemaType: [schema.student],
    shouldCallAPI: state => true,
    callAPI: () => axios(`/api/students`, { params }),
    payload: params,
  };
};
