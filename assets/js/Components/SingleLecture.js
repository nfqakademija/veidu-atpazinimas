import React from 'react';
import { withStyles, Typography } from 'material-ui';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import props from './Lectures'

const styles = theme => ({
	lecturesComponent: {
		width: '100%'
	},
	fab: {
		margin: theme.spacing.unit * 2,
	},
	absolute: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 3,
		overflow: 'hidden'
	},
	upload: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		opacity: 0
	}
});

const SingleLecture = (props) => {
	const { classes } = props;
	console.log(props);
	return (
		<div className={classes.helpComponent}>
			<Typography>
				TO DO
        single lecture
      </Typography>

			<Tooltip title="Add">
				<Button variant="fab"
					color="primary"
					className={classes.absolute}
					containerelement='label'
					label='My Label'>
					<input type="file" className={classes.upload} />
					<AddIcon />
				</Button>
			</Tooltip>
		</div>
	);
};

export default withStyles(styles)(SingleLecture);