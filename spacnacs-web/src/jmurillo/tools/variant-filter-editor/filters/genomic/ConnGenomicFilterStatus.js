import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	/*active: VariantFilterQuerist.samples.samples(state).some(sample => !!sample.typeGroup && 0 < sample.typeGroup.length),*/
    active: 0 < VariantFilterQuerist.genomic.genomicRegions(state).length + VariantFilterQuerist.search.search(state).some(t => t.annotationField === "gene")
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		dispatch(VariantFilterActions.genomic.genomicRegions.clean());
		dispatch(VariantFilterActions.search.cleanGene());
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);