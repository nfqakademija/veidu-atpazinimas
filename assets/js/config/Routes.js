import {
  AttendancePage,
  LecturePage /*,  ModulePage, GroupPage, StudentPage */,
} from 'pages';

export default [
  {
    path: '/',
    redirect: '/lectures',
  },
  /* {
    path: '/modules',
    component: ModulePage,
  },
  {
    path: '/modules/:moduleId(d+)',
    component: StudentPage,
  },
  {
    path: '/groups',
    component: GroupPage,
  },
  {
    path: '/groups/:groupId(d+)',
    component: StudentPage,
  }, */
  {
    path: '/lectures',
    component: LecturePage,
  },
  {
    path: '/lectures/:lectureId',
    component: AttendancePage,
  },
];
