import merge from 'lodash/merge';

import { FETCH_STUDENTS_IN_GROUP_SUCCESS } from './students';


const FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST';
const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';

const CREATE_GROUP = 'CREATE_GROUP';
const UPDATE_GROUP = 'UPDATE_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';


export const groups = (state = {}, action) => {
  if (action.entities && action.entities.groups) {
    return merge({}, state, action.entities.groups);
  }
  return state;
};

export const index = (state = [], action) => {
  if (action.entities && action.entities.groups) {
    return merge([], state, Object.keys(action.entities.groups).map(x => +x));
  }
  return state;
};

export const fetched = (state = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS_IN_GROUP_SUCCESS:
      return merge([], state, [action.payload.group]);
    default:
      return state;
  }
};
