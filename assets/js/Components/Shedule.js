import React from 'react';
import { withStyles, Typography } from 'material-ui';

const styles = theme => ({
  shduleComponent: {

  }
});

const Shedule = (props) => {
  const { classes } = props;
  return (
    <div className={classes.sheduleComponent}>
        <Typography>
        TO DO
        Shedule
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Shedule);