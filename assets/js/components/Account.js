import React from 'react';

import { IconButton, withStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const styles = theme => ({
  icon: {
    fontSize: 36,
  },
});

const Account = ({ classes, color, onClick }) => (
  <IconButton color={color} onClick={onClick}>
    <AccountCircle className={classes.icon} />
  </IconButton>
);

export default withStyles(styles)(Account);
