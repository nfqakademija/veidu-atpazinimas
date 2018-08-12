import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  BottomNavigation,
  BottomNavigationAction,
  withStyles,
} from '@material-ui/core';

import { getLink, matchLink } from 'utils/helpers';

const styles = theme => ({
  paper: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    borderTop: '1px solid lightgrey',
  },
  icon: {
    color: theme.palette.primary.light,
  },
  selected: {
    color: theme.palette.common.white,
  },
  selectedIcon: {
    '&$selected': {
      color: theme.palette.common.white,
    },
  },
});

const BottomNav = ({ classes, history, location: { pathname }, nav }) => (
  <BottomNavigation
    value={getLink(nav.find(elem => matchLink(pathname, elem.link)).link)}
    onChange={(_, value) => history.push(value)}
    classes={{ root: classes.paper }}
    elevation={2}
  >
    {nav.map(elem => (
      <BottomNavigationAction
        key={getLink(elem.link)}
        value={getLink(elem.link)}
        label={elem.title}
        icon={elem.icon}
      />
    ))}
  </BottomNavigation>
);

export default withRouter(withStyles(styles)(BottomNav));
