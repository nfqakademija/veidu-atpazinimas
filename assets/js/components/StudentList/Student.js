import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({});

const Student = ({student}) => (
    <Typography>{student.name}</Typography>
);

export default withStyles(styles)(Student);
