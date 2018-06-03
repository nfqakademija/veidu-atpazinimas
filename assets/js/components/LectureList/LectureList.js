import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Typography, withStyles } from '@material-ui/core';

import _ from 'lodash';

import Lecture from './Lecture';
import { Header } from '../Layout';

const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LectureList = ({classes, lectures}) => {
  return (
      <div>
        <Header title="Attendance"/>
        {_.isEmpty(lectures) ?
            <Typography>Loading...</Typography>
            :
            <div>
              <List>
                {Object.entries(lectures)
                    .map(([id, lecture]) => (
                        <ListItem key={id} className={classes.container}>
                          <Lecture {...lecture}/>
                        </ListItem>
                    ))}
              </List>
            </div>
        }
      </div>
  );
};

LectureList.propTypes = {
  lectures: PropTypes.shape(
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
