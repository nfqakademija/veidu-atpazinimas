import React, { Component } from 'react';
import { Button, List, ListItem, Typography, withStyles } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

import { Header } from '../Layout';
import Attendance from './Attendance';

const styles = theme => ({
  root: {
    margin: 'auto, 0',
    maxWidth: 900,
    paddingBottom: theme.spacing.unit * 16,
  },
  container: {
    display: 'flex',
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
  static submitPhoto() {
    console.log('to do upload');

    // window.post = function(url, data) {
    //   return fetch(url, {method: "POST", body: JSON.stringify(data)});
    // }

    // // ...

    // post("post/data/here", data);
  }

  render() {
    const {classes, lecture, loading} = this.props;

    return (
        <div>
          <Header title="Lecture"/>
          <List className={classes.root}>
            {loading ?
                <Typography>Loading...</Typography>
                :
                lecture.attendances
                    .map(attendance =>
                        <ListItem key={attendance.id} dense className={classes.container}>
                          <Attendance
                              student={attendance.student}
                              attended={attendance.attended}
                          />
                        </ListItem>,
                    )
            }
          </List>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
          <label htmlFor="icon-button-file">
            <Button variant="fab" color="secondary" className={classes.button} component="span">
              <AddAPhoto/>
            </Button>
          </label>
        </div>
    );
  }
}

export default withStyles(styles)(AttendanceList);
