import React, { Fragment } from 'react';
import {
  Hidden,
  List,
  ListItem,
  Typography,
  withStyles,
  Divider,
} from '@material-ui/core';
import LectureCard from './LectureCard';
import LectureListItem from './LectureListItem';

const styles = theme => ({
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LectureList = ({ classes, lectures, loading }) => (
  <Fragment>
    <List>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        lectures.map(lecture => (
          <Fragment key={lecture.id}>
            <Hidden smDown>
              <ListItem className={classes.card}>
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
  </Fragment>
);

export default withStyles(styles)(LectureList);
