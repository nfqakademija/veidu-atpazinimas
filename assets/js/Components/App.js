import React from 'react';
import AppToolbar from './AppToolbar';
import Drawer from './Drawer';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#67daff',
      main: '#03a9f4',
      dark: '#007ac1',
      contrastText: '#000',
    },
    secondary: {
      light: '#76ffff',
      main: '#18ffff',
      dark: '#00cbcc',
      contrastText: '#000',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <AppToolbar/>
    <Drawer/>
    <main>
    </main>
  </MuiThemeProvider>
);

export default App;