import React from 'react';
import { withStyles, Typography } from 'material-ui';

const styles = theme => ({
    helpComponent: {
    height: 200,
    width: 300
  }
});

const Help = (props) => {
  const { classes } = props;
  return (
    <div className={classes.helpComponent}>
        <Typography>
        TO DO
        Help
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Help);