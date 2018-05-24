import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, withStyles } from '@material-ui/core';

const styles = theme => ({
  container: {
    width: theme.spacing.unit * 10,
  },
  drawerPaper: {
    background: theme.palette.primary.main,
    position: 'fixed',
    width: theme.spacing.unit * 10,

    justifyContent: 'center',
  },
});

const AppDrawer = props => {
  const {classes} = props;
  const {nav} = props;

  return (
      <div className={classes.container}>
        <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
        >
          <List>
            {nav.map(elem =>
                <ListItem button key={elem.link} component={Link} to={elem.link}>
                  <ListItemIcon children={elem.icon} style={{fontSize: 36}}/>
                </ListItem>,
            )}
          </List>
        </Drawer>
      </div>
  );
};

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  nav: PropTypes.array.isRequired,
};

export default withStyles(styles, {withTheme: true})(AppDrawer);