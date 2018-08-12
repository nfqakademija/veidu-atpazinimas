import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import {
  Drawer,
  ListItemIcon,
  MenuItem,
  MenuList,
  withStyles,
} from '@material-ui/core';

import { getLink, matchLink } from 'utils/helpers';

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
  menuItem: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  icon: {
    fontSize: 48,
  },
  selected: {
    color: theme.palette.common.white,
  },
});

const Sidebar = ({ classes, history, location, nav }) => (
  <div className={classes.container}>
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <MenuList>
        {nav.map(elem => (
          <MenuItem
            key={getLink(elem.link)}
            onClick={() => history.push(getLink(elem.link))}
            className={classes.menuItem}
          >
            <ListItemIcon
              children={elem.icon}
              className={classNames(
                classes.icon,
                matchLink(location.pathname, elem.link) ? classes.selected : null
              )}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Drawer>
  </div>
);

export default withRouter(withStyles(styles)(Sidebar));
