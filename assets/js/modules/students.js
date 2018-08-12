import { student as schema } from 'config/schema';
import { createResource, createAsyncAction } from 'utils/resource';

export const {
  actions: { listAction, showAction, createAction, updateAction, deleteAction },
  sagas,
  types,
  reducers,
  selectors: { selectList, selectItem },
} = createResource({
  url: '/api/students',
  schema,
});

export default reducers;
