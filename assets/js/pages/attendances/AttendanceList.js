import React, { Component } from 'react';
import {
  List,
  ListItem,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';

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
});

class AttendanceList extends Component {
  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps.lecture.attendances };
  }

  handleChange = id => {
    this.setState({ [id]: !this.state[id].attended });
  };

  render() {
    const { classes, attendances, loading } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.container}>
          <List>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              attendances.map(attendance => (
                <ListItem key={attendance.id} dense>
                  <Attendance
                    student={attendance.student}
                    attended={attendance.attended}
                    onChange={() => this.handleChange(attendance.id)}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AttendanceList);
