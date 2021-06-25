import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';



const CaddScore = ({ label, filterScore, setFilterScore }) => {

	const filterScoreMin = (!!filterScore && filterScore.min) || undefined;
	const filterScoreMax = (!!filterScore && filterScore.max) || undefined;
	const handleMinChange = event => {
		const value = event.target.value;
		setFilterScore({ ...filterScore, min: value });
	};
	const handleMaxChange = event => {
		const value = event.target.value;
		setFilterScore({ ...filterScore, max: value });
	};
	return (
		<React.Fragment>
			<Grid item xs={4}>
				<Typography>{ label }</Typography>
			</Grid>
			<Grid item xs={4} style={{ padding: "1rem" }}>
				<TextField label="min" value={ filterScoreMin } variant="outlined" margin="dense" onChange={ handleMinChange } />
			</Grid>
			<Grid item xs={4} style={{ padding: "1rem" }}>
				<TextField label="max" value={ filterScoreMax } variant="outlined" margin="dense" onChange={ handleMaxChange } />
			</Grid>
		</React.Fragment>
	);
};


const CaddFilter = props => (
	<Grid container justify="center" alignItems="flex-start">
		<Grid item xs={12} sm={8} md={6} container justify="flex-start" alignItems="center">
			<CaddScore label="Scaled" filterScore={ props.filterCaddScaled } setFilterScore={ props.setFilterCaddScaled } />
			<CaddScore label="Raw" filterScore={ props.filterCaddRaw } setFilterScore={ props.setFilterCaddRaw } />
		</Grid>
	</Grid>
);


CaddFilter.propTypes = {
	filterCaddRaw: PropTypes.object.isRequired,
	filterCaddScaled: PropTypes.object.isRequired,
	setFilterCaddRaw: PropTypes.func.isRequired,
	setFilterCaddScaled: PropTypes.func.isRequired,
};


export default CaddFilter;