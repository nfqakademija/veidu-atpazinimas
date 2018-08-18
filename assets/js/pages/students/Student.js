import React, { Fragment } from 'react';
import { ListItemText, withStyles } from '@material-ui/core';

import Avatar from 'components/Avatar';
import { getInitials } from 'utils/helpers';

const styles = theme => ({});

const Student = ({ name, face, group }) => (
  <>
    <Avatar
      src={face}
      fallback={getInitials(name)
        .join('')
        .toUpperCase()}
    />
    <ListItemText primary={name} secondary={group.title} />
  </>
);

export default withStyles(styles)(Student);
