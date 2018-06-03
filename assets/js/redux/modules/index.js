import { combineReducers } from 'redux';

import * as Action from '../actions';

import lectures from './lectures';
import attendances from './attendances';
import modules from './modules';
import groups from './groups';
import students from './students';

const entities = combineReducers({
  lectures,
  attendances,
  modules,
  groups,
  students,
});

const currentLectures = (state = [], action) => {
  switch (action.type) {
    case Action.CREATE_LECTURE:
      return [...state, action.id];
    default:
      return state;
  }
};

export default combineReducers({
  entities,
  currentLectures,
});
