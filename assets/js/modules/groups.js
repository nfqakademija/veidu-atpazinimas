import { group as schema } from 'config/schema';
import { createResource, createAsyncAction } from 'utils/resource';

export const {
  actions: { listAction, showAction, createAction, updateAction, deleteAction },
  sagas,
  types,
  reducers,
  selectors: { selectList, selectItem },
} = createResource({
  url: '/api/groups',
  schema,
});

export default reducers;
