import React from 'react';
import { AppBar, Toolbar, Typography, withStyles } from 'material-ui';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

const AppToolbar = (props) => {
  const {classes} = props;
  return (
    <AppBar
      position="absolute"
      className={classes.appBar}
    >
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          Permanent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(AppToolbar);