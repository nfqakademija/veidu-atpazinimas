import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

import Account from './Account';

const styles = theme => ({
  appBar: {
    background: '#fff',
  },
  flex: {
    flex: 1,
  },
});

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    account: PropTypes.bool,
  };

  static defaultProps = {
    account: true,
  };

  handleAccount() {}

  render() {
    const { classes } = this.props;
    const { title, account } = this.props;

    return (
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" noWrap className={classes.flex}>
            {title}
          </Typography>
          {account && <Account />}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
