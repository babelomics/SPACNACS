import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import VariantFilterActions from '../../../variant-filter/actions';


const mapStateToProps = state => ({
	active: 0 < VariantFilterQuerist.vcfMetrics.vcfMetrics(state).length,
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		dispatch(VariantFilterActions.vcfMetrics.clean());
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);
