import { connect } from 'react-redux';

import SamplesFilter from './SamplesFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	samples: VariantFilterQuerist.samples.samples(state),
});


const mapDispatchToProps = dispatch => ({
	addSampleGenotype: (individualId, sampleId, genotype) => {
		dispatch(VariantFilterActions.samples.addSampleGenotype(individualId, sampleId, genotype));
	},
	removeSampleGenotype: (individualId, sampleId, genotype) => {
		dispatch(VariantFilterActions.samples.removeSampleGenotype(individualId, sampleId, genotype));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(SamplesFilter);