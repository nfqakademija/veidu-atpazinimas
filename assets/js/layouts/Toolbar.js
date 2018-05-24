import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    background: '#fff',
  },
});

const AppToolbar = props => {
  const {classes} = props;
  return (
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" noWrap>
            Automated Attendance System
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

AppToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppToolbar);