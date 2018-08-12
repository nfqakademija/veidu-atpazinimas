import React, { Component, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons';

const styles = theme => ({
  button: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,

    '@media (max-width: 960px)': {
      bottom: theme.spacing.unit * 9,
    },
  },
  input: {
    display: 'none',
  },
});

class StudentForm extends Component {
  state = {
    open: false,
    form: {
      face: null,
      name: '',
    },
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleChange = name => event => {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [name]: event.target.value,
      }),
    });
  };

  handleSubmit = () => {
    this.props.addStudent(this.state.form);
  };

  uploadImage = file => {
    this.setState({
      form: Object.assign({}, this.state.form, {
        face: file,
      }),
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button variant="fab" color="secondary" className={classes.button} onClick={this.handleOpen}>
          <Person />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Add new student</DialogTitle>
          <DialogContent>
            <input
              type="file"
              accept="image/*"
              onChange={e => this.uploadImage(e.target.files[0])}
              className={classes.input}
              id="upload-photo"
            />
            <label htmlFor="upload-photo">
              <Button component="span">Image</Button>
            </label>
            <TextField
              label="Student's Name"
              value={this.state.form.name}
              type="text"
              onChange={this.handleChange('name')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button variant="raised" color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(StudentForm);
