import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';

import groupReducers, { sagas as groupSagas } from './groups';
import lectureReducers, { sagas as lectureSagas } from './lectures';
import moduleReducers, { sagas as moduleSagas } from './modules';
import studentReducers, { sagas as studentSagas } from './students';
import attendanceReducers from './attendances';

import { toastSaga } from './toaster';

export default combineReducers({
  entities: combineReducers({
    groups: groupReducers.entities,
    lectures: lectureReducers.entities,
    attendances: attendanceReducers.entities,
    modules: moduleReducers.entities,
    students: studentReducers.entities,
  }),
  groups: combineReducers({
    index: groupReducers.index,
    fetched: groupReducers.fetched,
  }),
  lectures: combineReducers({
    index: lectureReducers.index,
    fetched: lectureReducers.fetched,
  }),
  modules: combineReducers({
    index: moduleReducers.index,
    fetched: moduleReducers.fetched,
  }),
  students: combineReducers({
    index: studentReducers.index,
    fetched: studentReducers.fetched,
  }),
});

export function* rootSaga() {
  yield all([
    ...forkSagaObject(lectureSagas),
    ...forkSagaObject(groupSagas),
    ...forkSagaObject(moduleSagas),
    ...forkSagaObject(studentSagas),
    fork(toastSaga),
  ]);
}

const forkSagaObject = object => Object.values(object).map(saga => fork(saga));
