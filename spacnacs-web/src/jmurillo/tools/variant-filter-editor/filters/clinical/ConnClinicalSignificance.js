import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import { Typography, FormControlLabel, Paper, Checkbox } from '@material-ui/core';



const boxes = [
	{
		id: "Pathogenic",
	},
	{
		id: "Likely pathogenic",
	},
	{
		id: "Likely benign",
	},
	{
		id: "Benign",
	},
    {
        id: "Others",
    }
];


const ClinicalSignificance = ({ clinvarSignificances, addClinVarSignificance, removeClinVarSignificance }) => {
	const handleChange = (event, checked) => {
		if (!!checked) {
			addClinVarSignificance(event.target.value);
		} else {
			removeClinVarSignificance(event.target.value);
		}
	};
	return (
		<div>
			{
				boxes.map(box => (
					<div>
					<FormControlLabel key={box.id}
									  label={<Typography>{box.id}</Typography>} control={
						<Checkbox value={box.id} checked={clinvarSignificances.includes(box.id)} onChange={handleChange} />
					} />
					</div>
				))
		}
		</div>
	);
};


ClinicalSignificance.propTypes = {
	clinvarSignificances: PropTypes.array.isRequired,
	addClinVarSignificance: PropTypes.func.isRequired,
	removeClinVarSignificance: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	clinvarSignificances: VariantFilterQuerist.clinical.clinvars(state),
});


const mapDispatchToProps = dispatch => ({
	addClinVarSignificance: clinvar => {
		dispatch(VariantFilterActions.clinical.clinvars.add(clinvar));
	},
	removeClinVarSignificance: clinvar => {
		dispatch(VariantFilterActions.clinical.clinvars.remove(clinvar));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(ClinicalSignificance);
