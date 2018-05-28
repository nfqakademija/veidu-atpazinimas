import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  // AttendanceList,
  LectureListContainer,
  // ModuleList,
  // StudentList,
} from '../containers';

const Routes = () => (
    <Switch>
      {/*<Route exact path="/" render={() => (<Redirect to="/attendance"/>)}/>*/}
      {/*<Route path="/modules" component={ModuleList}/>*/}
      {/*<Route path="/modules/:moduleId" component={StudentList}/>*/}
      <Route path="/attendance" component={LectureListContainer}/>
      {/*<Route path="/attendance/:lectureId" component={AttendanceList}/>*/}
    </Switch>
);

export default Routes;