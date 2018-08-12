import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import Module from './Module';

const styles = theme => ({
  grid: {
    display: 'flex',
    padding: 50,
  },
});

const ModuleList = ({ classes, modules, loading }) => (
  <div className={classes.grid}>
    {loading ? (
      <Typography>Loading...</Typography>
    ) : (
      modules.map(module => <Module key={module.id} module={module} />)
    )}
  </div>
);

export default withStyles(styles)(ModuleList);
