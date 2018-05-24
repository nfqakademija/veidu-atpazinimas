import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    background: theme.palette.primary.main,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  icon: {
    color: theme.palette.primary.light,
  },
  selected: {
    color: '#fff',
  },
  selectedIcon: {
    '&$selected': {
      color: '#fff',
    },
  },
});

class BottomNav extends Component {
  state = {
    value: '/modules',
  };

  handleChange(event, value) {
    this.setState({value});
    // TODO Fix Routing with Redux connect()
    // this.props.history.push(value);
  };

  render() {
    const {classes} = this.props;
    const {nav} = this.props;
    const {value} = this.state;

    return (
        <BottomNavigation value={value} onChange={this.handleChange} classes={{root: classes.paper}}>
          {nav.map(elem =>
              <BottomNavigationAction
                  classes={{iconOnly: classes.icon, selected: classes.selected, root: classes.selectedIcon}}
                  key={elem.link}
                  label={elem.title}
                  value={elem.link}
                  icon={elem.icon}
              />,
          )}
        </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  nav: PropTypes.array.isRequired,
};

export default withStyles(styles)(BottomNav);