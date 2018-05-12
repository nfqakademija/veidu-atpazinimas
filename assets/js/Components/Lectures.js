import React from 'react';
import { withStyles, Typography } from 'material-ui';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  lecturesComponent: {
    width: '100%'
  },
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    overflow: 'hidden'
  },
  upload: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    opacity: 0
  }
});

const Lectures = (props) => {

  var submitPhoto = function () {
    console.log('to do upload');
  };

  const { classes } = props;
  return (
    <div className={classes.lecturesComponent}>
      <Paper elevation={0}>
        <Typography>
          TO DO
          Lectures
        </Typography>


        <Tooltip title="Add">
          <Button variant="fab"
            color="primary"
            className={classes.absolute}
            containerelement='label'
            label='My Label'>
            <input type="file" className={classes.upload} onChange={submitPhoto} />
            <AddIcon />
          </Button>
        </Tooltip>
      </Paper>
    </div >
  );
};

export default withStyles(styles)(Lectures);