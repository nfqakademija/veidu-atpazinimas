import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = theme => ({
  button: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,

    '@media (max-width: 960px)': {
      bottom: theme.spacing.unit * 9,
    },
  },
});

const FloatingActionButton = ({classes, icon = <Add/>, onClick}) => (
  <Button
    variant="fab"
    color="primary"
    className={classes.button}
    onClick={onClick}
  >
    {icon}
  </Button>
);

export default withStyles(styles, { withTheme: true })(FloatingActionButton);
