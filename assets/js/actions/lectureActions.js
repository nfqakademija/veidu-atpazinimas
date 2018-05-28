import axios from 'axios';

export const FETCH_LECTURES = 'FETCH_LECTURES';
export const FETCH_LECTURES_SUCCESS = 'FETCH_LECTURES_SUCCESS';
export const FETCH_LECTURES_FAILURE = 'FETCH_LECTURES_FAILURE';

export const INVALIDATE_LECTURES = 'INVALIDATE_LECTURES';

export const CREATE_LECTURE = 'CREATE_LECTURE';
export const CREATE_LECTURE_SUCCESS = 'CREATE_LECTURE_SUCCESS';
export const CREATE_LECTURE_FAILURE = 'CREATE_LECTURE_FAILURE';

const requestLectures = () => ({
  type: FETCH_LECTURES,
});

const receiveLectures = lectures => ({
  type: FETCH_LECTURES_SUCCESS,
  lectures,
  receivedAt: Date.now(),
});

const receiveLecturesError = error => ({
  type: FETCH_LECTURES_FAILURE,
  error,
  receivedAt: Date.now(),
});

const fetchLectures = () => dispatch => {
  dispatch(requestLectures());
  axios(`/api/lectures`)
      .then(({data}) => {
        dispatch(receiveLectures(data));
      })
      .catch(({error}) => {
        dispatch(receiveLecturesError(error));
      });
};

const shouldFetchLectures = (state) => {
  const {lectures} = state;
  return !lectures.lectures.length
      ? true
      : lectures.isFetching
          ? false
          : lectures.didInvalidate;
};

export const fetchLecturesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchLectures(getState())) {
    return dispatch(fetchLectures());
  }
};

export const invalidateLectures = () => ({
  type: INVALIDATE_LECTURES,
});

const newLecture = lecture => ({
  type: CREATE_LECTURE,
  lecture,
});

export const postLecture = lecture => dispatch => {
  dispatch(newLecture(lecture));
  axios.post(`/api/lectures`, lecture);
};
