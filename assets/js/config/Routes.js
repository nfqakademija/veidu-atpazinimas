import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  AttendanceListContainer,
  LectureListContainer,
  ModuleListContainer,
  StudentListContainer,
} from '../containers';

const Routes = () => (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/lectures"/>)}/>
      <Route exact path="/modules" component={ModuleListContainer}/>
      <Route exact path="/modules/:moduleId(\d+)" component={StudentListContainer}/>
      <Route exact path="/groups/:groupId(\d+)" component={StudentListContainer}/>
      <Route exact path="/lectures" component={LectureListContainer}/>
      <Route exact path="/lectures/:lectureId(\d+)" component={AttendanceListContainer}/>
    </Switch>
);

export default Routes;
