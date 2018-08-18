import React, { Fragment } from 'react';
import {
  Checkbox,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
} from '@material-ui/core';

import Avatar from 'components/Avatar';
import { getInitials } from 'utils/helpers';

const styles = theme => ({});

const Attendance = ({
  classes,
  student: { name, face },
  attended,
  onChange,
}) => (
  <>
    <Avatar
      src={face}
      fallback={getInitials(name)
        .join('')
        .toUpperCase()}
    />
    <ListItemText
      disableTypography
      primary={<Typography variant="headline">{name}</Typography>}
    />
    <ListItemSecondaryAction>
      <Checkbox checked={attended} onChange={onChange} color="primary" />
    </ListItemSecondaryAction>
  </>
);

export default withStyles(styles)(Attendance);
