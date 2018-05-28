import { FETCH_LECTURES, FETCH_LECTURES_SUCCESS, FETCH_LECTURES_FAILURE, INVALIDATE_LECTURES } from '../actions/lectureActions';

const initialState = {
  lectures: [],
  isFetching: false,
  didInvalidate: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LECTURES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case FETCH_LECTURES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        lectures: action.lectures,
        lastUpdated: action.receivedAt,
      };
    case FETCH_LECTURES_FAILURE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        error: action.error,
        lastUpdated: action.receivedAt,
      };
    case INVALIDATE_LECTURES:
      return {
        ...state,
        didInvalidate: true,
      };
    default:
      return state;
  }
};