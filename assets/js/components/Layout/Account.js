import React, { Component, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, withStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import GoogleLogin from 'react-google-login';

const styles = theme => ({
  icon: {
    fontSize: 36,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    extends: Button
  },
});

class Account extends Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  responseGoogle = (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;
    const googleId = googleUser.getId();

    console.log({googleId});
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  };

  render() {
    const {classes} = this.props;

    const signedIn = false;
    return (
        <div>
          <IconButton
              color="primary"
              onClick={this.handleOpen}
          >
            <AccountCircle className={classes.icon}/>
          </IconButton>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
          >
            {signedIn ?
                <Fragment>
                  <DialogTitle id="form-dialog-title">Sign out?</DialogTitle>
                  <DialogActions>
                    <Button color="primary" onChange={this.handleClose}>Not now</Button>
                    <Button variant="raised" color="primary">Sign out</Button>
                  </DialogActions>
                </Fragment>
                :
                <Fragment>
                  <DialogTitle id="form-dialog-title">Login to your account...</DialogTitle>
                  <DialogActions>
                    <Button variant="outlined" color="primary">Register</Button>
                    <GoogleLogin clientId="952012669043-gbdk8ed8aogpm1vhastebqqdv3frt2ii.apps.googleusercontent.com"
                                 scope="profile"
                                 fetchBasicProfile={false}
                                 responseHandler={this.responseGoogle}
                                 onFailure={(a) => console.log(a)}
                                 onSuccess={(a) => console.log(a)}

                                 className={classes.button}
                    />
                  </DialogActions>
                </Fragment>
            }
          </Dialog>
        </div>
    );
  }
}

export default withStyles(styles)(Account);
