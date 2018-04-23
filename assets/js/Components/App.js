import React from 'react';
import AppToolbar from './AppToolbar';
import Drawer from './Drawer';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const App = () => (
  <div>
    <AppToolbar/>
    <Drawer/>
    <main>
    </main>
  </div>
);

export default App;