import React from 'react';
import { List, Paper, ListItem, Typography, withStyles } from '@material-ui/core';

import { Header } from '../Layout';
import Student from './Student';

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 16,
  },
  container: {
    display: 'flex',
    width: '100%',
  },
});

const StudentList = ({classes, students, loading}) => (
    <div>
      <Header title={`Students`}/>
      <Paper>
      <List className={classes.root}>
        {loading ?
            <Typography>loading...</Typography>
            :
            students.map(student => (
                <ListItem key={student.id} className={classes.container}>
                  <Student student={student}/>
                </ListItem>
            ))
        }
      </List>
      </Paper>
    </div>
);

export default withStyles(styles)(StudentList);
