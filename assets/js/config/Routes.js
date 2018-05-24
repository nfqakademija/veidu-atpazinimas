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
      <Route path="/" exact render={() => (<Redirect to="/attendance"/>)}/>
      <Route path="/modules/:moduleId" component={StudentListContainer}/>
      <Route path="/modules" component={ModuleListContainer}/>
      <Route path="/attendance/:lectureId" component={AttendanceListContainer}/>
      <Route path="/attendance" component={LectureListContainer}/>
    </Switch>
);

export default Routes;