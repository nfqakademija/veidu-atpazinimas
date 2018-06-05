import React, { Component } from 'react';
import { IconButton, Button, Modal, Typography, withStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const styles = theme => ({
  icon: {
    fontSize: 36,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    
    display: 'flex',
    alignItems: 'flex-end'
  }
});

class Account extends Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  render() {
    const {classes} = this.props;

    return (
        <div>
          <IconButton
              color="primary"
              onClick={this.handleOpen}
          >
            <AccountCircle className={classes.icon}/>
          </IconButton>
          <Modal
              open={this.state.open}
              onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <Button variant="raised" color="primary">Login</Button>
            </div>
          </Modal>
        </div>
    );
  }
}

export default withStyles(styles)(Account);
