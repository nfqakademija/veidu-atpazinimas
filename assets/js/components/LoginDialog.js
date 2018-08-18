import React, { Fragment } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  withStyles,
} from '@material-ui/core';

import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';

const clientId =
  '952012669043-gbdk8ed8aogpm1vhastebqqdv3frt2ii.apps.googleusercontent.com';

const styles = theme => ({
  button: {
    display: 'none',
  },
});

const onResponse = console.log;
// response => {
//   if (response.w3.U3) {
//     const postData = {
//       name: response.w3.ig,
//       provider: type,
//       email: response.w3.U3,
//       provider_id: response.El,
//       token: response.Zi.access_token,
//       provider_pic: response.w3.Paa,
//     };

//     login(postData).then(result => {
//       let responseJson = result;
//       sessionStorage.setItem('userData', JSON.stringify(responseJson));
//       this.setState({ redirect: true });
//     });
//   }
// };

const Login = ({ classes, open, onClose }) => {
  let googleLogin = React.createRef();

  const handleClick = () => googleLogin.current.click();

  return (
    <Dialog open={open} onClose={onClose}>
      {/* <>
        <DialogTitle id="form-dialog-title">Sign out?</DialogTitle>
        <DialogActions>
          <Button color="primary" onChange={onClose}>
            Not now
          </Button>
          <Button variant="raised" color="primary">
            Sign out
          </Button>
        </DialogActions>
      </> */}
      <DialogTitle id="form-dialog-title">Login to your account...</DialogTitle>
      <DialogActions>
        <Button variant="outlined" color="primary">
          Register
        </Button>
        <GoogleLogin
          className={classes.button}
          ref={googleLogin}
          clientId={clientId}
          scope="profile"
          onFailure={onResponse}
          onSuccess={onResponse}
        />
        <GoogleButton onClick={handleClick} />
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(Login);
