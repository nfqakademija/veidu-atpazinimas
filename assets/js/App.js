import React from 'react';

import { Hidden } from '@material-ui/core';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import { Desktop, Mobile } from './components/common/index';
import { Routes, theme, styles, navigation } from './config/index';

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