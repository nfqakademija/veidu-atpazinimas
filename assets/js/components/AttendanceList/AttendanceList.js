import React from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: -1 * (28 + theme.spacing.unit),
    right: theme.spacing.unit * 2,
  },
  heading: {
    padding: theme.spacing.unit,
    paddingTop: 60,
    height: 120,
    position: 'relative',
  },
  input: {
    display: 'none',
  },
});

class AttendanceList extends React.Component {
  // submitPhoto() {
  //   console.log('to do upload');
  //
  //   // window.post = function(url, data) {
  //   //   return fetch(url, {method: "POST", body: JSON.stringify(data)});
  //   // }
  //
  //   // // ...
  //
  //   // post("post/data/here", data);
  // };

  render() {
    const {classes} = this.props;
    const lectureId = this.props.match.params.lectureId;

    return (
        <div className={classes.heading}>
          <Typography>TO DO single lecture</Typography>

          <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
          <label htmlFor="icon-button-file">
            <Button variant="fab" color="secondary" className={classes.button} component="span">
              <AddAPhoto/>
            </Button>
          </label>
        </div>
    );
  }
}

export default withStyles(styles)(AttendanceList);
