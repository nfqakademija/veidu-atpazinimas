import { call, fork, take } from 'redux-saga/effects';

export default (patternOrChannel, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(patternOrChannel);
      yield call(saga, ...args.concat(action));
    }
  });