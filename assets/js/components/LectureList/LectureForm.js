import React, { Component, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core';
import { School } from '@material-ui/icons';

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

class LectureForm extends Component {
  state = {
    open: false,
    form: {
      module: '',
      title: '',
      start: '',
      end: '',
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
    console.log(this.state.form);

    this.props.addLecture(this.state.form);
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button variant="fab" color="secondary" className={classes.button} onClick={this.handleOpen}>
          <School />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Add New Lecture</DialogTitle>
          <DialogContent>
            <TextField
              label="Lecture Title"
              value={this.state.form.title}
              type="text"
              onChange={this.handleChange('title')}
              fullWidth
            />
            <TextField
              label="Module Id"
              value={this.state.form.module}
              type="number"
              onChange={this.handleChange('module')}
              fullWidth
            />
            <TextField
              label="Start of lecture"
              type="datetime-local"
              value={this.state.form.start}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('start')}
              fullWidth
            />
            <TextField
              label="End of lecture"
              type="datetime-local"
              value={this.state.form.end}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('end')}
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

export default withStyles(styles)(LectureForm);
