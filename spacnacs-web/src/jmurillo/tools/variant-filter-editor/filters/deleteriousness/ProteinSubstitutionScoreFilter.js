import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import { Paper, Typography, withStyles } from '@material-ui/core';



const styles = theme => ({
	container: {
		...theme.mixins.gutters(),
		textAlign: "left",
	},
});


const ProteinSubstitutionScoreFilter = scoreClasses => withStyles(styles)(({ classes, filterValue, setFilterValue }) => {
	const selectedValue = filterValue.type || "range";
	const handleMinChange = event => {
		const value = event.target.value;
		const { type, ...rest } = filterValue;
		setFilterValue({ ...rest, min: value });
	};
	const handleMaxChange = event => {
		const value = event.target.value;
		const { type, ...rest } = filterValue;
		setFilterValue({ ...rest, max: value });
	};
	const handleTypeChange = event => {
		const value = event.target.value;
		if ("range" === value) {
			const { type, ...rest } = filterValue;
			setFilterValue(rest);
		} else {
			const { min: rangeMin, max: rangeMax, ...rest } = filterValue;
			setFilterValue({ ...rest, type: value });
		}
	};
	const rangeActive = "range" === selectedValue;
	const minValue = !!filterValue.min || 0 === filterValue.min ? filterValue.min : "";
	const maxValue = !!filterValue.max || 0 === filterValue.max ? filterValue.max : "";
	return (
		<Paper className={classes.container}>
			<FormControl>
				<RadioGroup value={selectedValue} onChange={handleTypeChange}>
					{
						scoreClasses.map(classValue => (
							<FormControlLabel key={classValue.id} value={classValue.id} control={<Radio />} label={classValue.label} />
						))
					}
					<FormControlLabel value="range" control={<Radio />} label="Score" />
				</RadioGroup>
			</FormControl>
			<Typography>Range: </Typography>
			<TextField label="min" value={minValue} variant="outlined" margin="dense" onChange={handleMinChange} disabled={!rangeActive} />
			<TextField label="max" value={maxValue} variant="outlined" margin="dense" onChange={handleMaxChange} disabled={!rangeActive} />
		</Paper>
	);
});


export default ProteinSubstitutionScoreFilter;