import React from 'react';

import { Hidden } from '@material-ui/core';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import { Desktop, Mobile } from './components/layouts/*';
import Routes from 'components/Routes';
import theme from 'config/theme';
import routes from 'config/routes';
import navigation from 'config/navigation';

const styles = theme => ({
  '@global': {
    body: {
      margin: 0,
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Hidden mdUp>
      <Mobile content={<Routes routes={routes} />} nav={navigation} />
    </Hidden>
    <Hidden smDown>
      <Desktop content={<Routes routes={routes} />} nav={navigation} />
    </Hidden>
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
