import axios from 'axios';
import { denormalize } from 'normalizr';
import * as schema from '../api/schema';

import merge from 'lodash/merge';

import { FETCH_STUDENTS_IN_MODULE_SUCCESS } from './students';

const FETCH_MODULES_REQUEST = 'FETCH_MODULES_REQUEST';
const FETCH_MODULES_SUCCESS = 'FETCH_MODULES_SUCCESS';
const FETCH_MODULES_FAILURE = 'FETCH_MODULES_FAILURE';

const CREATE_MODULE = 'CREATE_MODULE';
const UPDATE_MODULE = 'UPDATE_MODULE';
const DELETE_MODULE = 'DELETE_MODULE';

export const modules = (state = {}, action) => {
  if (action.entities && action.entities.modules) {
    return merge({}, state, action.entities.modules);
  }
  return state;
};

export const index = (state = [], action) => {
  switch (action.type) {
    case FETCH_MODULES_SUCCESS:
      return merge([], state, action.result);
    default:
      return state;
  }
};

export const fetched = (state = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS_IN_MODULE_SUCCESS:
      return merge([], state, [action.payload.module]);
    default:
      return state;
  }
};

export const fetchModules = () => {
  return {
    types: [
      FETCH_MODULES_REQUEST,
      FETCH_MODULES_SUCCESS,
      FETCH_MODULES_FAILURE,
    ],
    schemaType: [schema.module],
    shouldCallAPI: state => !state.index.modules.length,
    callAPI: () => axios(`/api/modules`),
  };
};

export const selectModules = state =>
  denormalize(state.index.modules, [schema.module], state.entities);
