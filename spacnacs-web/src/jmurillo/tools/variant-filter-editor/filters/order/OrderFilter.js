import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import { InputBase, Paper, TextField, Typography } from '@material-ui/core';


const containerStyle = { display: "flex", justifyContent: "flex-start", alignItems: "center", maxWidth: "30rem" };
const labelStyle = { flexGrow: 1 };
const boxStyle = { flexShrink: 0, width: "5em", marginLeft: "0.5em", marginRight: "0.5em" };


const TextInput = props => (
	<Paper elevation={1} style={{ margin: "0.5em" }}>
		<InputBase {...props}/>
	</Paper>
);


const OrderFilter = props => {
    const handleMinChange = event => {
        const value = event.target.value;
        props.setFilter(value, props.filter.max);
    };
    const handleMaxChange = event => {
        const value = event.target.value;
        props.setFilter(props.filter.min, value);
    };
    return (
		<div style={containerStyle}>
			<Typography style={labelStyle}>{props.order}</Typography>
			<TextInput placeholder="min" value={props.filter.min || ""} onChange={handleMinChange} style={boxStyle} />
			&nbsp;&nbsp;
			<TextInput placeholder="max" value={props.filter.max || ""} onChange={handleMaxChange} style={boxStyle} />
		</div>
    );
};


OrderFilter.propTypes = {
    order: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
};


export default OrderFilter;