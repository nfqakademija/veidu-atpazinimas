import React from 'react';

import { Hidden } from '@material-ui/core';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import theme from './config/Theme';
import { Desktop, Mobile } from './layouts/index';
import { Routes } from './config/index';
import { Face, People } from '@material-ui/icons';

const styles = theme => ({
  '@global': {
    body: {
      margin: 0,
      backgroundColor: theme.palette.background.default,
    },
  },
});

const navigation = [
  {
    title: 'Students',
    link: '/modules',
    icon: <People/>,
  },
  {
    title: 'Attendance',
    link: '/attendance',
    icon: <Face/>,
  },
];

const App = () => {
  return (
      <MuiThemeProvider theme={theme}>
        <Hidden mdUp>
          <Mobile content={<Routes/>} nav={navigation}/>
        </Hidden>
        <Hidden smDown>
          <Desktop content={<Routes/>} nav={navigation}/>
        </Hidden>
      </MuiThemeProvider>
  );
};

export default withStyles(styles)(App);