import React from 'react';
import { withStyles, Typography } from 'material-ui';

const styles = theme => ({
  aboutComponent: {
    height: 200,
    width: 300
  }
});

const About = (props) => {
  const { classes } = props;
  return (
    <div className={classes.aboutComponent}>
        <Typography>
        TO DO
        About
      </Typography>
    </div>
  );
};

export default withStyles(styles)(About);