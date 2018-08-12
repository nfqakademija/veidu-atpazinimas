import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Routes = ({ routes }) => (
  <Switch>
    {routes.map(
      (route, i) =>
        route.redirect ? (
          <Route
            key={i}
            exact
            path={route.path}
            render={() => <Redirect to={route.redirect} />}
          />
        ) : (
          <Route key={i} exact path={route.path} component={route.component} />
        )
    )}
  </Switch>
);

export default Routes;
