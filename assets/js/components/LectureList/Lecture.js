import React from 'react';
import classNames from 'classnames';
import { Button, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  container: {
    width: '90%',
    maxWidth: 900,

    display: 'flex',
    alignItems: 'center',
  },
  time: {
    width: 120,
  },
  button: {
    height: 'auto',
    width: '100%',
    margin: 0,
    padding: 0,
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

const Lecture = ({classes, id, title, module, start, attendedStudents, totalStudents}) => (
    <div className={classes.container}>
      <Typography variant="headline" className={classNames(classes.time, classes.alignEnd)} color="primary">
        {parseTime(start)}
      </Typography>

      <Button className={classes.button} component={Link} to={`/lectures/${id}`}>
        <Card
            className={classes.card}
        >
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
      </Button>
    </div>
);

const parseTime = time => new Date(time)
    .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

export default withStyles(styles)(Lecture);
