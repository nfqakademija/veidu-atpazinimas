import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export const REQUEST_TOAST = 'REQUEST_TOAST';
export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export default (state = null, { type, payload }) => {
  if (type === SHOW_TOAST) {
    return payload;
  } else if (type === HIDE_TOAST) {
    return null;
  }
};

export function* toastSaga() {
  const timeout = 4000;

  yield takeEvery(REQUEST_TOAST, function*({ payload }) {
    yield put({ type: SHOW_TOAST, payload });
    yield call(delay, timeout);
    yield put({ type: HIDE_TOAST });
  });
}
