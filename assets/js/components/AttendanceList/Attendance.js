import React, { Fragment } from 'react';
import { Avatar, Checkbox, ListItemSecondaryAction, ListItemText, withStyles } from '@material-ui/core';

const styles = theme => ({});

const Attendance = ({classes, student, attended}) => (
    <Fragment>
      <Avatar src={`/uploads/${student.face}`}/>
      <ListItemText primary={student.name}/>
      <ListItemSecondaryAction>
        <Checkbox
            checked={attended}
        />
      </ListItemSecondaryAction>
    </Fragment>
);

export default withStyles(styles)(Attendance);
