import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { Switch, Route, Link, withRouter, BrowserRouter as Router } from 'react-router-dom';
import About from './About';
import HelpComponent from './Help';
import StudentsComponent from './Students';
import LecturesComponent from './Lectures';
import SheduleComponent from './Shedule';
import SingleLecture from './SingleLecture';

const drawerWidth = 240;

const styles = theme => ({
  content: theme.mixins.gutters({
    boxSizing: 'border-box',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: '70px',
    height: 'calc(100vh - 70px)',
    paddingTop: '30px'
  }),
  contentElement: {
    marginTop: '70px'
  }
});

function ContentBox(props) {
  const { classes } = props;
  return (
    <div className={classes.contentElement}>
      <Paper className={classes.content} elevation={1}>
        <React.Fragment>
          <Switch>
            <Route path='/students' component={StudentsComponent} />
            <Route path='/lectures' component={LecturesComponent} />
            <Route path='/singlelecture' component={SingleLecture} />
            <Route path='/shedule' component={SheduleComponent} />
            <Route path='/about' component={About} />
            <Route path='/help' component={HelpComponent} />
          </Switch>
        </React.Fragment>
      </Paper>
    </div>
  );
}

ContentBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentBox);