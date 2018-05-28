import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

const styles = theme => ({
  appBar: {
    background: '#fff',
  },
  flex: {
    flex: 1,
  },
  icon: {
    fontSize: 36,
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

  handleAccount() {

  }

  render() {
    const {classes} = this.props;
    const {title, account} = this.props;

    return (
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" noWrap className={classes.flex}>
              {title}
            </Typography>
            {account && (
                <div>
                  <IconButton
                      onClick={this.handleAccount}
                      color="primary"
                  >
                    <AccountCircle className={classes.icon}/>
                  </IconButton>
                </div>
            )}
          </Toolbar>
        </AppBar>
    );
  }
}

export default withStyles(styles)(Header);