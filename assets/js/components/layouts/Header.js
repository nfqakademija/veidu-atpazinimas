import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

import Account from 'components/Account';
import LoginDialog from 'components/LoginDialog';

const styles = theme => ({
  appBar: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    '@media (max-width: 960px)': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
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

  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { classes, title, account } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <Typography
              className={classes.flex}
              variant="title"
              noWrap
              color="inherit"
            >
              {title}
            </Typography>
            {account && <Account color="default" onClick={this.handleOpen} />}
          </Toolbar>
        </AppBar>
        <LoginDialog open={open} onClose={this.handleClose} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Header);
