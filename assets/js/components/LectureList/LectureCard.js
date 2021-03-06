import React from 'react';
import classNames from 'classnames';
import {
  Button,
  Card,
  CardContent,
  Fade,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  container: {
    paddingLeft: 0,
    width: '100%',
    maxWidth: 900,

    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  time: {
    width: 120,
    minWidth: 120,
    paddingRight: 12,
  },
  card: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContent: {
    flex: 1,
    minWidth: 0,
    
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const LectureCard = ({ classes, lecture }) => (
  <div className={classes.container}>
    <Typography
      variant="headline"
      color="primary"
      className={classes.time}
      align="right"
    >
      {parseTime(lecture.start)}
    </Typography>

    <Fade in={true}>
      <Button
        className={classes.button}
        component={Link}
        to={`/lectures/${lecture.id}`}
      >
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.content}>
              <div className={classes.leftContent}>
                <Typography variant="headline" noWrap>
                  {lecture.title}
                </Typography>
                <Typography variant="subheading" color="textSecondary">
                  {lecture.module.title}
                </Typography>
              </div>

              <Typography variant="headline">
                {lecture.attendedStudents}/{lecture.totalStudents}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Button>
    </Fade>
  </div>
);

const parseTime = time =>
  new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default withStyles(styles)(LectureCard);
