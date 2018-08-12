import { merge, without } from 'lodash';

export const entitiesReducer = (entity, types) => (
  state = {},
  { type, payload }
) => {
  if (payload && payload.entities && payload.entities[entity]) {
    return merge({}, state, payload.entities[entity]);
  } else if (types && type === types.DELETE.SUCCESS) {
    return without(state, payload.id);
  }

  return state;
};

export const indexReducer = (entity, types) => (
  state = [],
  { type, payload }
) => {
  if (payload && payload.entities && payload.entities[entity]) {
    return merge([], state, Object.keys(payload.entities[entity]));
  } else if (type === types.DELETE.SUCCESS) {
    return without(state, payload.id.toString());
  }

  return state;
};

export const fetchedReducer = types => (state = [], { type, payload }) => {
  if (type === types.SHOW.SUCCESS) {
    return merge([], state, [payload.result]);
  } else if (type === types.DELETE.SUCCESS) {
    return without(state, payload.id.toString());
  }

  return state;
};
