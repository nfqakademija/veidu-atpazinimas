import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({});

const Module = ({classes, module}) => (
    <Card>
      <CardContent>
        {/*<Typography variant="headline" component={Link} to={`/modules/${module.id}`}>*/}
        <Typography variant="headline">
          {module.title}
        </Typography>
        <Divider/>
        <List component="nav">
          {Object.entries(module.groups)
              .map(([id, group]) => (
                  <ListItem key={id} button component={Link} to={`/groups/${group.id}`}>
                    <ListItemText primary={group.title}/>
                  </ListItem>
              ))}
        </List>
      </CardContent>
    </Card>
);

export default withStyles(styles)(Module);
