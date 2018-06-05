import React from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    height: 'auto',
    width: '100%',
    margin: 0,
    padding: 0,

    display: 'flex',
  },
  time: {
    textAlign: 'center',
    width: 64,
    minWidth: 64,
  },
  details: {
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
    padding: 10,
  },
});

const LectureListItem = ({classes, lecture}) => (
    <Button className={classes.button} component={Link} to={`/lectures/${lecture.id}`}>
      <Typography variant="title" className={classes.time} color="primary">
        {parseTime(lecture.start)}
      </Typography>

      <div className={classes.details}>
        <Typography variant="body1" noWrap>
          {lecture.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {lecture.module.title}
        </Typography>
      </div>

      <Typography variant="title" className={classes.count}>
        {lecture.attendedStudents}/{lecture.totalStudents}
      </Typography>
    </Button>
);

const parseTime = time => new Date(time)
    .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

export default withStyles(styles)(LectureListItem);
