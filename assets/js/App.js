import React from 'react';

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Layout from 'components/layouts/Layout';
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
      <Layout routes={routes} nav={navigation} />
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
