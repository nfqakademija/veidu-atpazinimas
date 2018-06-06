import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  paper: {
    background: theme.palette.primary.main,
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  icon: {
    color: theme.palette.primary.light,
  },
  selected: {
    color: theme.palette.common.white,
  },
  selectedIcon: {
    '&$selected': {
      color: theme.palette.common.white,
    },
  },
});

class BottomNav extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.location.pathname,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
    this.props.history.push(value);
  }

  render() {
    const { classes } = this.props;
    const { nav } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        classes={{ root: classes.paper }}
      >
        {nav.map(elem => (
          <BottomNavigationAction
            key={elem.link}
            icon={elem.icon}
            label={elem.title}
            value={elem.link}
            classes={{
              iconOnly: classes.icon,
              selected: classes.selected,
              root: classes.selectedIcon,
            }}
          />
        ))}
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  nav: PropTypes.array.isRequired,
};

export default withRouter(withStyles(styles)(BottomNav));
