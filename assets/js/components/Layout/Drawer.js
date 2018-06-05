import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Drawer, ListItemIcon, MenuItem, MenuList, withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    width: theme.spacing.unit * 10,
  },
  drawerPaper: {
    background: theme.palette.primary.main,
    position: 'fixed',
    width: theme.spacing.unit * 10,

    justifyContent: 'center',
  },
  menuItem: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  icon: {
    fontSize: 48,
  },
  selected: {
    color: theme.palette.common.white,
  },
});

class AppDrawer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    // TODO Reactive navigation buttons
    this.state = {
      selected: this.props.location.pathname,
    };
  }

  handleChange(selected) {
    this.setState({selected});
    this.props.history.push(selected);
  }

  render() {
    const {classes} = this.props;
    const {nav} = this.props;
    return (
        <div className={classes.container}>
          <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
          >
            <MenuList>
              {nav && nav.map(elem =>
                  <MenuItem
                      key={elem.link}
                      onClick={() => this.handleChange(elem.link)}
                      className={classes.menuItem}>
                    <ListItemIcon
                        children={elem.icon}
                        className={classNames(
                            classes.icon,
                            this.state.selected === elem.link ? classes.selected : null,
                        )}/>
                  </MenuItem>,
              )}
            </MenuList>
          </Drawer>
        </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  nav: PropTypes.array.isRequired,
};

export default withRouter(withStyles(styles)(AppDrawer));
