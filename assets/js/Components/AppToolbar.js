import React from 'react';
import { AppBar, Toolbar, Typography, withStyles } from 'material-ui';
import ContentBox from './ContentBox';

const drawerWidth = 240;

const styles = theme => ({
  rightSide: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: '70px'

  },
  // contentElement: {
  //   marginTop: '70px'
  // }
  // toolbar: theme.mixins.toolbar,
});

const ContentRight = (props) => {
  const { classes } = props;
  return (
    <div className={classes.rightSide}>
      <AppBar
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Face Recognition
        </Typography>
        </Toolbar>
      </AppBar>

      <ContentBox />
    </div>
  );
};


export default withStyles(styles)(ContentRight);