import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({});

const Attendance = ({classes, student, attended}) => (
    <div>
      <Typography>{student.id}</Typography>
      <Typography>{student.name}</Typography>
      <Typography>{student.face}</Typography>
      <Typography>{attended}</Typography>
    </div>
);

export default withStyles(styles)(Attendance);
