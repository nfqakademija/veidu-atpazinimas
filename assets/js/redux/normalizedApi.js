import { normalize } from 'normalizr';

export default ({dispatch, getState}) => next => action => {
  const {
          types,
          schemaType,
          shouldCallAPI = () => true,
          callAPI,
          payload,
        } = action;

  if (!types) {
    // Normal action: pass it on
    return next(action);
  }

  if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.');
  }

  if (!shouldCallAPI(getState())) {
    return;
  }

  const [requestType, successType, failureType] = types;
  dispatch({
    type: requestType,
  });

  return callAPI()
      .then(
          ({data}) => {
            const normalized = normalize(data, schemaType);

            dispatch({
              type: successType,
              payload,
              ...normalized,
            });
          },
          error =>
              dispatch({
                type: failureType,
                error: error.message || 'Something went wrong',
              }),
      );
};
