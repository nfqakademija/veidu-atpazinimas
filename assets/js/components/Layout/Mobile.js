import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { BottomNav } from './index';

const styles = theme => ({
  container: {
    background: theme.palette.background.default,
  },
});

const Layout = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      {props.content}
      <BottomNav nav={props.nav} />
    </div>
  );
};

export default withStyles(styles)(Layout);
