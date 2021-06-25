import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { withStyles, Paper } from '@material-ui/core';


const allVcfMetrics = [
	{ label: "PASS", id: "PASS" },
	{ label: "QualByDepth", id: "QualByDepth" },
	{ label: "FisherStrand", id: "FisherStrand" },
	{ label: "RMSMappingQuality", id: "RMSMappingQuality" },
	{ label: "MappingQualityRankSumTest", id: "MappingQualityRankSumTest" },
	{ label: "ReadPosRankSumTest", id: "ReadPosRankSumTest" },
	{ label: "StrandOddsRatio", id: "StrandOddsRatio" },
];


const VcfMetricsFilter = ({ classes, vcfMetrics, addVcfMetric, removeVcfMetric }) => {
	const hasMetric = metric => vcfMetrics.includes(metric);
	const handleChange = vcfMetric => (_, checked) => {
		(!!checked ? addVcfMetric : removeVcfMetric)(vcfMetric);
	};
	return (
		<Paper className={classes.container}>
			<FormControl margin="dense" fullWidth>
				<FormGroup>
					{
						allVcfMetrics.map(metric => (
							<FormControlLabel key={metric.id} label={<Typography>{metric.label}</Typography>} control={
								<Checkbox checked={hasMetric(metric.id)} onChange={handleChange(metric.id)} value={metric.value} />
							} />))
					}
				</FormGroup>
			</FormControl>
		</Paper>
	);
};


VcfMetricsFilter.propTypes = {
	classes: PropTypes.object.isRequired,
	vcfMetrics: PropTypes.array.isRequired,
	addVcfMetric: PropTypes.func.isRequired,
	removeVcfMetric: PropTypes.func.isRequired,
};


const styles = theme => ({
	container: {
		...theme.mixins.gutters(),
	},
});


export default withStyles(styles)(VcfMetricsFilter);