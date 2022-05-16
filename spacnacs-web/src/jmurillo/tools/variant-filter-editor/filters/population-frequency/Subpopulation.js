import React from 'react';
import PropTypes from 'prop-types';
import { InputBase, Paper } from '@material-ui/core';


const containerStyle = { display: "flex", justifyContent: "flex-start", alignItems: "center", maxWidth: "10rem", paddingLeft:"2rem" };
const boxStyle = { flexShrink: 0, width: "5em", marginLeft: "0.5em", marginRight: "0.5em" };


const TextInput = props => (
	<Paper elevation={1} style={{ margin: "0.5em" }}>
		<InputBase {...props} />
	</Paper>
);


const Subpopulation = props => {
	const handleMinChange = event => {
		const value = event.target.value;
		props.setFilter(value, props.filter.max);
	};
	const handleMaxChange = event => {
		const value = event.target.value;
		props.setFilter(props.filter.min, value);
	};
	return (
		<div>
			{/*<label style={{ color:"#666"}}>{props.population}:</label>*/}
		<div style={containerStyle}>
			{/*<Typography style={labelStyle}>{props.subpopulation}</Typography>*/}

			<label style={{ color:"#666"}}>Min:</label> &nbsp;<TextInput placeholder="min" value={props.filter.min || ""} onChange={handleMinChange} style={boxStyle} />



		</div>
			<div style={containerStyle}>

				<label style={{ color:"#666"}}>Max:</label>
				<TextInput placeholder="max" value={props.filter.max || ""} onChange={handleMaxChange} style={boxStyle} />
			</div>
		</div>
	);
};


Subpopulation.propTypes = {
	population: PropTypes.string.isRequired,
	subpopulation: PropTypes.string.isRequired,
	filter: PropTypes.object.isRequired,
	setFilter: PropTypes.func.isRequired,
};


export default Subpopulation;