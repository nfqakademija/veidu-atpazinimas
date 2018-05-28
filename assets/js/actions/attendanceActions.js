import axios from 'axios';

export const FETCH_ATTENDANCES = 'FETCH_ATTENDANCES';
export const FETCH_ATTENDANCES_SUCCESS = 'FETCH_ATTENDANCES_SUCCESS';
export const FETCH_ATTENDANCES_FAILURE = 'FETCH_ATTENDANCES_FAILURE';

export const INVALIDATE_LECTURE = 'INVALIDATE_LECTURE';

export const UPDATE_ATTENDANCE = 'UPDATE_ATTENDANCE';
export const UPDATE_ATTENDANCE_SUCCESS = 'UPDATE_ATTENDANCE_SUCCESS';
export const UPDATE_ATTENDANCE_FAILURE = 'UPDATE_ATTENDANCE_FAILURE';

const requestAttendances = lecture => ({
  type: FETCH_ATTENDANCES,
  lecture,
});

const receiveAttendances = (lecture, json) => ({
  type: FETCH_ATTENDANCES_SUCCESS,
  lecture,
  attendances: json.data.children.map(child => child.data),
  receivedAt: Date.now(),
});

const receiveAttendancesError = lecture => ({
  type: FETCH_ATTENDANCES_FAILURE,
  lecture,
});

const fetchAttendances = lecture => dispatch => {
  dispatch(requestAttendances(lecture));
  axios(`/api/lectures/${lecture}`)
      .then(({data}) =>
          dispatch(receiveAttendances(lecture, data)),
      )
      .catch(({error}) =>
          dispatch(receiveAttendancesError(lecture, error)),
      );
};

const shouldFetchAttendances = (state, lecture) => {
  const {attendances} = state[lecture];
  return !attendances
      ? true
      : attendances.isFetching
          ? false
          : attendances.didInvalidate;
};

export const fetchAttendancesIfNeeded = lecture => {
  return (dispatch, getState) => {
    if (shouldFetchAttendances(getState(), lecture)) {
      return dispatch(fetchAttendances(lecture));
    }
  };
};

export const invalidateLecture = lecture => ({
  type: INVALIDATE_LECTURE,
  lecture,
});
