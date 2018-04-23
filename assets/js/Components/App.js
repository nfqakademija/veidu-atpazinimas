import React from 'react';
import { withStyles } from 'material-ui';
import AppToolbar from './AppToolbar';
import Drawer from './Drawer';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const App = (props) => {
  const {classes} = props;
  
  return (
    <div>
      <AppToolbar/>
      <Drawer/>
      <main className={classes.content}>
      
      </main>
    </div>
  );
};

export default withStyles(styles)(App);