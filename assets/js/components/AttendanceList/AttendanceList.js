import React, { Component } from 'react';
import {
  Button,
  List,
  ListItem,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

import { Header } from '../Layout';
import Attendance from './Attendance';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 16,
  },
  container: {
    maxWidth: 700,
    width: '100%',
  },
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

class AttendanceList extends Component {
  render() {
    const { classes, lecture, loading } = this.props;

    return (
      <div>
        <Header title="Lecture" />
        <div className={classes.root}>
          <Paper elevation={4} className={classes.container}>
            <List>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                lecture.attendances.map(attendance => (
                  <ListItem key={attendance.id} dense>
                    <Attendance
                      student={attendance.student}
                      attended={attendance.attended}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={e => this.props.upload(e.target.files[0])}
          className={classes.input}
          id="upload-photo"
        />
        <label htmlFor="upload-photo">
          <Button
            component="span"
            variant="fab"
            color="secondary"
            className={classes.button}
          >
            <AddAPhoto />
          </Button>
        </label>
      </div>
    );
  }
}

export default withStyles(styles)(AttendanceList);
