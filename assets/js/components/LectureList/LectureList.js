import React from 'react';
import { List, ListItem, Typography, withStyles } from '@material-ui/core';

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

const LectureList = ({classes, lectures, loading}) => (
    <div>
      <Header title="Attendance"/>
      {loading ?
          <Typography>Loading...</Typography>
          :
          <List>
            {loading ?
                <Typography>Loading...</Typography>
                :
                lectures.map(lecture => (
                    <ListItem key={lecture.id} className={classes.container}>
                      <Lecture lecture={lecture}/>
                    </ListItem>
                ))}
          </List>
      }
    </div>
);

// LectureList.propTypes = {
//   lectures: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         title: PropTypes.string.isRequired,
//         start: PropTypes.string.isRequired,
//         end: PropTypes.string.isRequired,
//         attendedStudents: PropTypes.number,
//         totalStudents: PropTypes.number.isRequired,
//       }).isRequired,
//   ),
// };

export default withStyles(styles)(LectureList);
