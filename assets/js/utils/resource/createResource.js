import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { action, unpackTypes, createConstants } from 'utils/helpers';

import {
  entitiesReducer,
  indexReducer,
  fetchedReducer,
} from './createResourceReducers';
import createSaga from './createSaga';

export default ({ entity, url, schema }) => {
  entity = entity || url.split('/').slice(-1)[0];

  const types = ['LIST', 'SHOW', 'CREATE', 'UPDATE', 'DELETE'].reduce(
    (obj, type) => ({
      ...obj,
      [type]: createConstants(entity, type, ['REQUEST', 'SUCCESS', 'FAILURE']),
    }),
    {}
  );

  const actions = {
    listAction: (page = undefined) =>
      action(types.LIST.REQUEST, {
        params: { page },
      }),
    showAction: id =>
      action(types.SHOW.REQUEST, {
        id,
      }),
    createAction: item =>
      action(types.CREATE.REQUEST, {
        body: item,
      }),
    updateAction: (id, item) =>
      action(types.UPDATE.REQUEST, {
        id,
        body: item,
      }),
    deleteAction: id => action(types.DELETE.REQUEST, { id }),
  };

  const sagas = {
    listSaga: createSaga({
      url,
      types: unpackTypes(types.LIST),
      schema: [schema],
    }),
    showSaga: createSaga({
      url: `${url}/:id`,
      types: unpackTypes(types.SHOW),
      schema,
    }),
    createSaga: createSaga({
      url,
      method: 'POST',
      types: unpackTypes(types.CREATE),
      schema,
    }),
    updateSaga: createSaga({
      url: `${url}/:id`,
      method: 'PATCH',
      types: unpackTypes(types.UPDATE),
      schema,
    }),
    deleteSaga: createSaga({
      url: `${url}/:id`,
      method: 'DELETE',
      types: unpackTypes(types.DELETE),
      schema,
    }),
  };

  const reducers = {
    entities: entitiesReducer(entity, types),
    index: indexReducer(entity, types),
    fetched: fetchedReducer(types),
  };

  const selectEntities = state => state.entities;
  const selectIndex = state => state[entity].index;
  const selectFetched = state => state[entity].fetched;

  const selectors = {
    selectList: createSelector(selectIndex, selectEntities, (index, entities) =>
      denormalize(index, [schema], entities)
    ),
    selectItem: (state, id) =>
      createSelector(selectEntities, entities =>
        denormalize(id, schema, entities)
      )(state),
    isListLoading: createSelector(selectIndex, index => !index.length),
    isItemLoading: (state, id) =>
      createSelector(selectFetched, fetched => !fetched.includes(id))(state),
  };

  return {
    types,
    actions,
    sagas,
    reducers,
    selectors,
  };
};
