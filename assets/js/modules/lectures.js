import { lecture } from 'config/schema';
import { createResource, createSaga } from 'utils/resource';
import { action } from 'utils/helpers';

const UPLOAD_PHOTO = 'UPLOAD_PHOTO';

const resource = createResource({
  url: '/api/lectures',
  schema: lecture,
});

const uploadPhotoSaga = createSaga({
  url: '/api/lectures/:id/upload',
  type: UPLOAD_PHOTO,
  method: 'POST',
  schema: lecture,
  toasts: [
    () => 'Sending image for facial recognition',
    students => {
      let count = students.filter(({ attended }) => attended === true).length;
      let noun = count == 1 ? 'student' : 'students';
      return `${count} ${noun} were recognized`;
    },
    error => error || 'Something went wrong',
  ],
});

export const uploadPhoto = (id, image) =>
  action(UPLOAD_PHOTO, {
    id,
    body: { file: image },
  });

export const {
  actions: { listAction, showAction, createAction, updateAction, deleteAction },
  selectors: { selectList, selectItem, isListLoading, isItemLoading },
} = resource;

export default resource.reducers;

export const sagas = { ...resource.sagas, uploadPhotoSaga };
