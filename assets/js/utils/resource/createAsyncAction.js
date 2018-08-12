export const createAsyncAction = ({
  url,
  method = 'GET',
  params,
  body,
  types = ['API_REQUEST', 'API_SUCCESS', 'API_FAILURE'],
  schema,
  toasts = [, , err => 'Something went wrong'],
}) => dispatch => {
  const [REQUEST, SUCCESS, FAILURE] = types;
  const [toastRequest, toastSuccess, toastFailure] = toasts;

  dispatch({
    type: REQUEST,
    meta: { toast: !!toastRequest && toastRequest() },
  });

  return axios({
    url,
    method,
    params,
    body,
  }).then(
    ({ data }) => {
      data = schema ? normalize(data, schema) : data;
      dispatch({
        type: SUCCESS,
        payload: data,
        meta: { toast: !!toastSuccess && toastSuccess(data) },
      });
    },
    ({ data: error }) => {
      dispatch({
        type: FAILURE,
        payload: error,
        meta: {
          toast: !!toastFailure && toastFailure(error),
        },
      });
    }
  );
};
