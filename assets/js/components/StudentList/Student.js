import React, { Fragment } from 'react';
import { Avatar, ListItemText, withStyles } from '@material-ui/core';

const styles = theme => ({});

const Student = ({student}) => (
    <Fragment>
      <Avatar src={`/uploads/${student.face}`}/>
      <ListItemText primary={student.name}/>
    </Fragment>
);

export default withStyles(styles)(Student);
