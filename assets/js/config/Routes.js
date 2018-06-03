import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  AttendanceListContainer,
  LectureListContainer,
  // ModuleListContainer,
  // StudentListContainer,
} from '../containers';

const Routes = () => (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/lectures"/>)}/>
      {/*<Route path="/modules" component={ModuleListContainer}/>*/}
      {/*<Route path="/modules/:moduleId" component={StudentListContainer}/>*/}
      <Route exact path="/lectures" component={LectureListContainer}/>
      <Route exact path="/lectures/:lectureId" component={AttendanceListContainer}/>
    </Switch>
);

export default Routes;
