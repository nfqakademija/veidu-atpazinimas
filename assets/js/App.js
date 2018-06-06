import React from 'react';

import { Hidden } from '@material-ui/core';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import { Desktop, Mobile } from './components/Layout';
import { Routes, theme, navigation } from './config';

const styles = theme => ({
  '@global': {
    body: {
      margin: 0,
      backgroundColor: theme.palette.background.default,
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Hidden mdUp>
        <Mobile content={<Routes />} nav={navigation} />
      </Hidden>
      <Hidden smDown>
        <Desktop content={<Routes />} nav={navigation} />
      </Hidden>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(App);
