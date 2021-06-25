import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Paper from "@material-ui/core/es/Paper/Paper";
import StudyIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import HtmlTooltip from "./../../../../common/HtmlTooltip";

const boxes = [
	{
		id: "GroupStudy",
		name: "Group study",
        title: "Only CNVs with study and not control",
		ico: "Study"
	},
	{
		id: "GroupControl",
		name: "Group control",
        title: "Only CNVs with control and not study",
		ico: "Control"
	}
];

const getIcon = ico => ico === "Study" ? <StudyIcon /> : (ico === "Control" ? <GroupIcon /> : "");

const GroupFilter = ({ analysis, group, addSampleGroupView, removeSampleGroupView }) => {
	const handleChange = (event, checked) => {
		if (!!checked) {
			addSampleGroupView(event.target.value);
		} else {
			removeSampleGroupView(event.target.value);
		}
	};
	return (
		<React.Fragment>
			{
				boxes.map(box => (
					<HtmlTooltip title={box.title}>
					<FormControlLabel key={box.id} style={{ padding : 20 }}
						label={
							<Typography>
								{getIcon(box.ico)} {box.name} ({!!analysis && !!analysis.groupControl && analysis.groupControl.length} samples)
							</Typography>
						}
						control={
							<Checkbox value={box.id} checked={group.includes(box.id)} onChange={handleChange} />
						} >
					</FormControlLabel>
					</HtmlTooltip>
				))
			}
		</React.Fragment>)
};

/*

const GroupRow = ({ sample, addSampleGroupView, removeSampleGroupView }) => {
    const isChecked = typeGroup =>{
        return (sample.typeGroups || []).includes(typeGroup)

};
	const onChange = typeGroup => (_, checked) => {
		if (!!checked) {
			addSampleGroupView(sample.individualId, sample.sampleId, typeGroup);
		} else {
			removeSampleGroupView(sample.individualId, sample.sampleId, typeGroup);
		}
	};
	return (
		<React.Fragment>
			<Grid item xs={6}>
				<Typography style={{ textAlign: "left" }}>{sample.sampleId}</Typography>
			</Grid>
			<Grid item xs={2}>
				{sample.typeGroup === "S" && <Checkbox checked={isChecked("S")} onChange={onChange("S")} />}
			</Grid>
			<Grid item xs={2}>
                {sample.typeGroup === "C" && <Checkbox checked={isChecked("C")} onChange={onChange("C")} />}
			</Grid>
		</React.Fragment>
	);
};
*/

/*
const styles = theme => ({
	root: {
		width: "100%",
	},
});


const GroupFilter = ({ samples, addSampleGroupView, removeSampleGroupView }) => (
	<div style={{ maxWidth: "30rem", margin: "auto" }}>
		<Grid container alignItems="center" justify="flex-start" style={{ padding: "1rem" }}>
			<Grid item xs={6}><Typography style={{ textAlign: "left" }}><strong>Samples</strong></Typography></Grid>
			<Grid item xs={2}><Typography>Study</Typography></Grid>
			<Grid item xs={2}><Typography>Control</Typography></Grid>
			{
				(samples || []).map(sample => (
					<GroupRow key={sample.sampleId} sample={sample} addSampleGroupView={addSampleGroupView} removeSampleGroupView={removeSampleGroupView} />
				))
			}
		</Grid>
	</div>
);
*/

GroupFilter.propTypes = {
	group: PropTypes.array.isRequired,
	analysis: PropTypes.object.isRequired,
	addSampleGroupView: PropTypes.func.isRequired,
	removeSampleGroupView: PropTypes.func.isRequired,
};

export default GroupFilter;