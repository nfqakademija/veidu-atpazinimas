import { schema } from 'normalizr';

export const student = new schema.Entity('students');

export const group = new schema.Entity('groups', {
  students: [student],
});

student.define({ group });

export const module = new schema.Entity('modules', {
  groups: [group],
});

export const attendance = new schema.Entity('attendances', {
  student,
});

export const lecture = new schema.Entity('lectures', {
  module,
  attendances: [attendance],
});
