import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

class LectureForm extends Component {
  state = {
    module: '',
    title: '',
    date: '',
    time: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const { create } = this.props;
    create(this.state.form);
  };

  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Lecture</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={this.state.title}
            type="text"
            onChange={this.handleChange('title')}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Module"
            value={this.state.module}
            type="number"
            onChange={this.handleChange('module')}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Date"
            type="date-local"
            value={this.state.date}
            InputLabelProps={{ shrink: true }}
            onChange={this.handleChange('start')}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Time"
            type="time-local"
            value={this.state.time}
            InputLabelProps={{ shrink: true }}
            onChange={this.handleChange('end')}
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="raised" color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LectureForm;
