import React from 'react';
import { withStyles, Typography } from 'material-ui';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  studentsComponent: {
    width: '100%'
  }
});

const Students = (props) => {

  const { classes } = props;
  return (
    <div className={classes.studentsComponent}>
      <Paper elevation={0}>
        <Typography>
          TO DO
          Students Modules
        </Typography>
      </Paper>
    </div >
  );
};

export default withStyles(styles)(Students);


