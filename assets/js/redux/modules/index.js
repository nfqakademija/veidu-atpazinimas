import { combineReducers } from 'redux';

import {
  fetched as fetchedLectures,
  index as lectureIndex,
  lectures,
} from './lectures';
import {
  fetched as fetchedModules,
  index as modulesIndex,
  modules,
} from './modules';
import {
  fetched as fetchedGroups,
  groups,
  index as groupsIndex,
} from './groups';
import { index as studentsIndex, students } from './students';
import { loadingReducer } from './loadingReducer';

const entities = combineReducers({
  lectures,
  modules,
  groups,
  students,
});

const index = combineReducers({
  lectures: lectureIndex,
  modules: modulesIndex,
  groups: groupsIndex,
  students: studentsIndex,
});

const fetched = combineReducers({
  lectures: fetchedLectures,
  modules: fetchedModules,
  groups: fetchedGroups,
});

export default combineReducers({
  entities,
  index,
  fetched,
  loading: loadingReducer,
});

export const createLoadingSelector = actions => state =>
  actions.some(action => state.loading[action]);
