import { call, put } from 'redux-saga/effects';
import takeLeading from 'utils/takeLeading';

import axios from 'axios';
import { normalize } from 'normalizr';

import { fillUrl, id } from 'utils/helpers';
import { REQUEST_TOAST } from 'modules/toaster';

export default ({
  type,
  types,
  url,
  method = 'GET',
  params,
  body,
  schema,
  toasts = [, , _ => 'Something went wrong'],
}) => {
  const [REQUEST, SUCCESS, FAILURE] = types || [
    type,
    `${type}_SUCCESS`,
    `${type}_FAILURE`,
  ];

  const [toastRequest, toastSuccess, toastFailure] = toasts;

  const createToast = (message, action) => ({
    type: REQUEST_TOAST,
    payload: {
      message,
      action,
    },
  });

  const toast = (...args) => put(createToast(...args));

  return function*() {
    yield takeLeading(REQUEST, requestSaga);
  };

  function* requestSaga(action) {
    yield toast(toastRequest());

    try {
      const { data } = yield call(axios, {
        url: fillUrl(url, action.payload),
        method,
        params: { ...params, ...action.payload.params },
        data: { ...body, ...action.payload.body },
      });

      const payload = schema ? normalize(data, schema) : data;

      yield put({
        type: SUCCESS,
        payload,
      });

      yield toast(toastSuccess(payload));
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error || 'Something went wrong',
      });

      yield toast(toastFailure(error), { retry: action });
    }
  }
};
