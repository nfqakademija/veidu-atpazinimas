import React from 'react';
import {
  List,
  ListItem,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';

import { Header } from '../Layout';
import Student from './Student';

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

const StudentList = ({ classes, students, loading }) => (
  <div>
    <Header title={`Students`} />
    <div className={classes.root}>
      <Paper elevation={4} className={classes.container}>
        <List className={classes.root}>
          {loading ? (
            <Typography>loading...</Typography>
          ) : (
            students.map(student => (
              <ListItem key={student.id} className={classes.container}>
                <Student student={student} />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </div>
  </div>
);

export default withStyles(styles)(StudentList);
