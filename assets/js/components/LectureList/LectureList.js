import React from 'react';
import {
  Hidden,
  List,
  ListItem,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Header } from '../Layout';
import LectureCard from './LectureCard';
import LectureListItem from './LectureListItem';

const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LectureList = ({ classes, lectures, loading }) => (
  <div>
    <Header title="Attendance" />
    <List>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        lectures.map(lecture => (
          <ListItem key={lecture.id} className={classes.container}>
            <Hidden smDown>
              <LectureCard lecture={lecture} />
            </Hidden>
            <Hidden mdUp>
              <LectureListItem lecture={lecture} />
            </Hidden>
          </ListItem>
        ))
      )}
    </List>
  </div>
);

export default withStyles(styles)(LectureList);
