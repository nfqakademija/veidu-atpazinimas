import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import merge from 'lodash/merge';

import { Header } from '../Layout';
import Module from './Module';

const styles = theme => ({
  grid: {
    display: 'flex',
    padding: 50,
  },
});

const ModuleList = ({classes, modules, loading}) => {
  return (
      <div>
        <Header title="Modules"/>
        <div className={classes.grid}>
          {loading ?
              <Typography>Loading...</Typography>
              :
              modules.map(module => (
                  <Module key={module.id} module={module}/>
              ))}
        </div>
      </div>
  );
};

export default withStyles(styles)(ModuleList);


