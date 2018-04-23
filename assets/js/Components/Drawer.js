import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, Divider, withStyles } from 'material-ui';
import { primaryNavigation, otherNavigation, actionsNavigation } from './drawerData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

class PermanentDrawer extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}/>
        <Divider/>
        <List>{primaryNavigation}</List>
        <Divider/>
        <List>{actionsNavigation}</List>
        <Divider/>
        <List>{otherNavigation}</List>
      </Drawer>
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
