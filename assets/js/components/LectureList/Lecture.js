import React from 'react';
import classNames from 'classnames';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  container: {
    width: '90%',
    maxWidth: 900,

    display: 'flex',
    alignItems: 'center',
  },
  time: {
    width: 110,
  },
  card: {
    flex: 4,
    cursor: 'pointer',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  alignEnd: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'end',
    padding: 10,
  },
});

const Lecture = ({classes, history, id, title, module, start, attendedStudents, totalStudents}) => (
    <div className={classes.container}>
      <Typography variant="headline" className={classNames(classes.time, classes.alignEnd)} color="primary">
        {parseTime(start)}
      </Typography>
      <Card className={classes.card} onClick={() => history.push(`/lectures/${id}`)}>
        <CardContent>
          <div className={classes.cardContent}>
            <div className={classes.details}>
              <Typography variant="headline" noWrap>
                {title}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {module.title}
              </Typography>
            </div>
            <Typography variant="headline" className={classes.alignEnd}>
              {attendedStudents}/{totalStudents}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
);

const parseTime = time => new Date(time)
    .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

export default withRouter(withStyles(styles)(Lecture));