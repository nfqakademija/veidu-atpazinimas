import React from 'react';
import { Typography, withStyles, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    height: 72,
    width: '100%',
    margin: 0,
    padding: 0,
  },
  time: {
    width: 56,
    minWidth: 56,
    fontSize: 16,
  },
  content: {
    flex: 1,
    minWidth: 0,

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  count: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'end',

    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 16,
    paddingLeft: 16,
  },
});

const parseTime = time =>
  new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const LectureListItem = ({ classes, lecture }) => (
  <ListItem
    className={classes.button}
    button
    component={Link}
    to={`lectures/${lecture.id}`}
  >
    <Typography
      variant="title"
      color="primary"
      className={classes.time}
      align="center"
    >
      {parseTime(lecture.start)}
    </Typography>

    <div className={classes.content}>
      <Typography variant="title" noWrap>
        {lecture.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {lecture.module.title}
      </Typography>
    </div>

    <Typography variant="title" className={classes.count}>
      {lecture.attendedStudents}/{lecture.totalStudents}
    </Typography>
  </ListItem>
);

export default withStyles(styles)(LectureListItem);
