import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Paper, Zoom, List, ListItem, ListItemText, withStyles } from '@material-ui/core';

const styles = theme => ({
  paper: {
    
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const Module = ({classes, module}) => (
    <Zoom in={true}>
      <Paper elevation={4} className={classes.paper}>
          <List className={classes.root}>
            <ListItem>
              {/*<Typography variant="headline" component={Link} to={`/modules/${module.id}`}>*/}
              <ListItemText primary={module.title}/>
            </ListItem>
            <Divider/>
            <List component="nav">
              {Object.entries(module.groups)
                  .map(([id, group]) => (
                      <ListItem key={id} button component={Link} to={`/groups/${group.id}`}>
                        <ListItemText primary={group.title}/>
                      </ListItem>
                  ))}
            </List>
          </List>
      </Paper>
    </Zoom>
);

export default withStyles(styles)(Module);
