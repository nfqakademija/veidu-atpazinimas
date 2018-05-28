import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, Typography, withStyles } from '@material-ui/core';

import Lecture from './Lecture';

const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LectureList = ({classes, lectures, error, isFetching}) => {
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  } else if (isFetching) {
    return <Typography>Loading...</Typography>;
  } else {
    return (
        <div>
          <List onChange={this.handleChange}>
            {lectures.map(lecture => (
                <ListItem key={lecture.id} className={classes.container}>
                  <Lecture {...lecture}/>
                </ListItem>
            ))}
          </List>
        </div>
    );
  }
};

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        attendedStudents: PropTypes.number,
        totalStudents: PropTypes.number.isRequired,
      }).isRequired,
  ),
};

export default withStyles(styles)(LectureList);
