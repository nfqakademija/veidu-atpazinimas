import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { People, Face, DateRange, Settings, Info, Help } from '@material-ui/icons';
import { Switch, Route, Link, withRouter, BrowserRouter as Router } from 'react-router-dom';

export const primaryNavigation = (
  <div>
    <Link to="/students">
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
    </Link>
    <Link to="/lectures">
      <ListItem button>
        <ListItemIcon>
          <Face />
        </ListItemIcon>
        <ListItemText primary="Lectures" />
      </ListItem>
    </Link>
    <Link to="/shedule">
      <ListItem button>
        <ListItemIcon>
          <DateRange />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>
    </Link>
  </div>
);

export const actionsNavigation = (
  <div>
    <ListItem button>
      <ListItemText primary="Export" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Print" />
    </ListItem>
  </div>
);

export const otherNavigation = (
  <div>

    <ListItem button>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <Link to="/help">
      <ListItem button>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItem>
    </Link>
    <Link to="/about">
      <ListItem button>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </Link>
  </div>
);