import React from 'react';
import { withStyles, Typography } from 'material-ui';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Switch, Route, Link, withRouter, BrowserRouter } from 'react-router-dom';
import SingleLecture from './SingleLecture';

const styles = theme => ({
  lecturesComponent: {
    width: '100%'
  },
  singleLecture: {
    margin: '10px',
    width: '70%',
    height: '90px'
  },
  lectureBox: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

// const Lectures = (props) => {

//   var submitPhoto = function () {
//     console.log('to do upload');

//     // window.post = function(url, data) {
//     //   return fetch(url, {method: "POST", body: JSON.stringify(data)});
//     // }

//     // // ...

//     // post("post/data/here", data);
//   };


class Lectures extends React.Component {
  constructor() {
    super()
    this.state = { lectures: [],
    
    }
  }

  componentDidMount() {
    var myRequest = new Request('/api/lectures');
    let lectures = [];

    fetch(myRequest)
      .then(res => res.json())
      .then(lectures =>
        this.setState({ lectures })
      );

  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.lecturesComponent}>
        <Paper elevation={0}>
          {this.state.lectures.length && this.state.lectures.slice(0, 6).map(lecture => {

            return (

              <Paper elevation={0} className={classes.lectureBox} key={lecture.id}>

                <Paper className={classes.singleLecture}>
                  <Link to="/singlelecture">
                    <List >
                      <ListItem >
                        <ListItemText primary={lecture.title} secondary={lecture.start}/>
                        <Typography>   </Typography>
                      </ListItem>
                    </List>
                  </Link>
                </Paper>
              </Paper>
            )
          })}
          {console.log('lectures ul', this.state.lectures)}
        </Paper>
      </div >
    )
  }
};

export default withStyles(styles)(Lectures);