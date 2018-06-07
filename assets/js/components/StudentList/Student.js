import React, { Fragment } from 'react';
import {ListItemText, withStyles } from '@material-ui/core';
import CustomAvatar from '../Layout/Avatar';

const styles = theme => ({});

const Student = ({ student }) => (
  <Fragment>
    <CustomAvatar face={student.face} name={student.name} />
    <ListItemText primary={student.name} secondary={student.group.title} />
  </Fragment>
);

export default withStyles(styles)(Student);
