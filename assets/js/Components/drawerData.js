import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { People, Face, DateRange, Settings, Info, Help } from '@material-ui/icons';

export const primaryNavigation = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <People/>
      </ListItemIcon>
      <ListItemText primary="Students"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Face/>
      </ListItemIcon>
      <ListItemText primary="Attendance"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DateRange/>
      </ListItemIcon>
      <ListItemText primary="Schedule"/>
    </ListItem>
  </div>
);

export const actionsNavigation = (
  <div>
    <ListItem button>
      <ListItemText primary="Export"/>
    </ListItem>
    <ListItem button>
      <ListItemText primary="Print"/>
    </ListItem>
  </div>
);

export const otherNavigation = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Settings/>
      </ListItemIcon>
      <ListItemText primary="Settings"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Help/>
      </ListItemIcon>
      <ListItemText primary="Help"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Info/>
      </ListItemIcon>
      <ListItemText primary="About"/>
    </ListItem>
  </div>
);