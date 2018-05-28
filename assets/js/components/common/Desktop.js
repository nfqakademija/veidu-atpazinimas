import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Drawer } from './index';

const styles = theme => ({
  container: {
    display: 'flex',
  },
  content: {
    flexGrow: 2,
  },
});

const Layout = props => {
  const {classes} = props;

  return (
      <div className={classes.container}>
        <Drawer className={classes.aside} nav={props.nav}/>
        <main className={classes.content}>
          {props.content}
        </main>
      </div>
  );
};

export default withStyles(styles)(Layout);