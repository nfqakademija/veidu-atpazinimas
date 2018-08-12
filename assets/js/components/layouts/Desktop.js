import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Sidebar from './Sidebar';

const styles = theme => ({
  '@global': {
    body: {
      background: theme.palette.background.default,
    },
  },
  container: {
    display: 'flex',
  },
  content: {
    flexGrow: 2,
  },
});

const Layout = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Sidebar className={classes.aside} nav={props.nav} />
      <main className={classes.content}>{props.content}</main>
    </div>
  );
};

export default withStyles(styles)(Layout);
