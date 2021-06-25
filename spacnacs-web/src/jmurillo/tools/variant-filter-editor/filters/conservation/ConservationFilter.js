import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography, InputBase } from '@material-ui/core';

const TextInput = props => (
	<Paper elevation={1} style={{ margin: "0.5em" }}>
		<InputBase {...props} />
	</Paper>
);


const containerStyle = { display: "flex", justifyContent: "flex-start", alignItems: "center", maxWidth: "21rem" };
const labelStyle = { marginLeft: "1em", flexGrow: 1 };
const boxStyle = { flexShrink: 0, width: "5em", marginLeft: "0.5em", marginRight: "0.5em" };

const ConservationScore = ({ label, filterScore, setFilterScore }) => {

	const filterScoreMin = (!!filterScore && filterScore.min) || undefined;
	const filterScoreMax = (!!filterScore && filterScore.max) || undefined;
	const onMinChange = event => {
		const value = event.target.value;
		setFilterScore(value, filterScoreMax);
	};
	const onMaxChange = event => {
		const value = event.target.value;
		setFilterScore(filterScoreMin, value);
	};
	return (
			<div style={containerStyle}>
				<Typography style={labelStyle}>{label}</Typography>
				<TextInput placeholder="min" value={filterScoreMin} onChange={onMinChange} style={boxStyle}/>
				&nbsp;&nbsp;
				<TextInput placeholder="max" value={filterScoreMax} onChange={onMaxChange} style={boxStyle}/>
			</div>
	);
};


const conservationScores = [
	{
		id: "phylop",
		label: "PhyloP",
	},
	{
		id: "phastCons",
		label: "PhastCons",
	},
	{
		id: "gerp",
		label: "Gerp",
	},
];


const ConservationFilter = props => (
		<div>
			{
				conservationScores.map(score => {
					const filterScore = props.filterScores.find(filterScore => filterScore.id === score.id);
					const setScore = scoreId => (min, max) => {
						if (!min && !max) {
							props.removeFilterScore(scoreId);
						} else {
							const score = { id: scoreId };
							if (!!min) {
								score.min = min;
							}
							if (!!max) {
								score.max = max;
							}
							props.setFilterScore(score);
						}
					};
					return (
						<ConservationScore key={score.id} label={score.label} filterScore={filterScore} setFilterScore={setScore(score.id)} />
					);
				})
			}
		</div>
);


ConservationFilter.propTypes = {
	filterScores: PropTypes.array.isRequired,
	setFilterScore: PropTypes.func.isRequired,
	removeFilterScore: PropTypes.func.isRequired,
};


export default ConservationFilter;