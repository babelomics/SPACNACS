import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	/*active: VariantFilterQuerist.samples.samples(state).some(sample => !!sample.typeGroup && 0 < sample.typeGroup.length),*/
    active: 0 < VariantFilterQuerist.genomic.sequencingTypes(state).length,
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		dispatch(VariantFilterActions.genomic.sequencingTypes.clean());
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);