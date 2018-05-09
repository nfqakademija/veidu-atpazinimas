import React from 'react';
import AppToolbar from './AppToolbar';
import Drawer from './Drawer';
import {withStyles} from 'material-ui';

const styles = theme => ({

});

const App = (props) => {
  const { classes } = props;
  return (
  <div>
    <AppToolbar/>
    <Drawer/>
    <main>
    </main>

  </div>
  );
};

export default withStyles(styles)(App);