import React from 'react';
import PropTypes from 'prop-types';
//import Grid from '@material-ui/core/Grid';
//import Checkbox from '@material-ui/core/Checkbox';
//import Typography from '@material-ui/core/Typography';
import ConnHpoSelector from "./ConnHpoSelector";
import ConnGenderFilter from "./ConnGenderFilter";
import ConnSubpopulationFilter from "./ConnSubpopulationFilter";

/*
const SampleRow = ({ sample, addSampleGenotype, removeSampleGenotype }) => {
	const isChecked = genotype => (sample.genotypes || []).includes(genotype);
	const onChange = genotype => (_, checked) => {
		if (!!checked) {
			addSampleGenotype(sample.individualId, sample.sampleId, genotype);
		} else {
			removeSampleGenotype(sample.individualId, sample.sampleId, genotype);
		}
	};
	return (
		<div>
			<label style={{ color:"#666"}}>Hpo:</label>

			<ConnHpoSelector></ConnHpoSelector>

			<label style={{ color:"#666"}}>Gender:</label>


			<label style={{ color:"#666"}}>ICD10:</label>


		</div>
	);
};
*/





const SamplesFilter = ({ samples, addSampleGenotype, removeSampleGenotype }) => (
    <div>
		<div>
			<ConnHpoSelector></ConnHpoSelector>
		</div>
		<div style={{paddingTop:"1em"}}>
            <ConnGenderFilter/>
		</div>
		<div style={{paddingTop:"1em"}}>
			<ConnSubpopulationFilter/>
		</div>
	</div>
);


SamplesFilter.propTypes = {
	samples: PropTypes.array.isRequired,
	addSampleGenotype: PropTypes.func.isRequired,
	removeSampleGenotype: PropTypes.func.isRequired,
};


export default SamplesFilter;