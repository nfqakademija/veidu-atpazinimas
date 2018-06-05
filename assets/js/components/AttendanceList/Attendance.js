import React, { Fragment } from 'react';
import { Avatar, Checkbox, Typography, ListItemSecondaryAction, ListItemText, withStyles } from '@material-ui/core';

const styles = theme => ({});

const Attendance = ({classes, student, attended}) => (
    <Fragment>
      <Avatar src={`/uploads/${student.face}`}/>
      <ListItemText disableTypography primary={<Typography variant="headline">{student.name}</Typography>}/>
      <ListItemSecondaryAction>
        <Checkbox
            checked={attended}
            onChange={() => attended = false}
        />
      </ListItemSecondaryAction>
    </Fragment>
);

export default withStyles(styles)(Attendance);
