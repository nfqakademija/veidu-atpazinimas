import React, { Fragment } from 'react';
import {
  Hidden,
  List,
  ListItem,
  Typography,
  withStyles,
  Divider,
} from '@material-ui/core';
import { Header } from '../Layout';
import LectureCard from './LectureCard';
import LectureListItem from './LectureListItem';
import LectureForm from './LectureForm';

const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LectureList = ({ classes, lectures, loading, addLecture }) => (
  <div>
    <Header title="Attendance" />
    <List>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        lectures.map(lecture => (
          <Fragment key={lecture.id}>
            <Hidden smDown>
              <ListItem className={classes.container}>
                <LectureCard lecture={lecture} />
              </ListItem>
            </Hidden>
            <Hidden mdUp>
              <LectureListItem lecture={lecture} />
              <Divider />
            </Hidden>
          </Fragment>
        ))
      )}
    </List>
    <LectureForm addLecture={addLecture} />
  </div>
);

export default withStyles(styles)(LectureList);
