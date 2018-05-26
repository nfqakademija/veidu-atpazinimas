import { Card, CardContent, List, ListItem, Typography, withStyles } from '@material-ui/core';
import React from 'react';

const styles = theme => ({
  card: {
    width: '90%',
    maxWidth: 700,
  },
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Lecture = withStyles(styles)(props => {
  const {classes} = props;

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline">
            {props.title}
          </Typography>
          <Typography variant="subheading" color="textSecondary">
            {props.start} - {props.end}
          </Typography>
        </CardContent>
      </Card>
  );
});

const LectureList = props => {
  const {classes} = props;
  const {error, isLoaded, lectures} = props;

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  } else if (!isLoaded) {
    return <Typography>Loading...</Typography>;
  } else {
    return (
        <List onChange={this.handleChange}>
          {lectures.map(lecture => (
              <ListItem key={lecture.id} className={classes.container}>
                <Lecture title={lecture.title} start={lecture.start} end={lecture.end}/>
              </ListItem>
          ))}
        </List>
    );
  }
};

export default withStyles(styles)(LectureList);
