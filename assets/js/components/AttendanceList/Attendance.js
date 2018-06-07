import React, { Fragment } from 'react';
import {
  Checkbox,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import CustomAvatar from '../Layout/Avatar';


const styles = theme => ({});

const Attendance = ({ classes, student, attended }) => (
  <Fragment>
    <CustomAvatar face={student.face} name={student.name} />
    <ListItemText
      disableTypography
      primary={<Typography variant="headline">{student.name}</Typography>}
    />
    <ListItemSecondaryAction>
      <Checkbox checked={attended} onChange={() => (attended = false)} />
    </ListItemSecondaryAction>
  </Fragment>
);

export default withStyles(styles)(Attendance);
