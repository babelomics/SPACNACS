import { connect } from 'react-redux';

import VcfMetricsFilter from './VcfMetricsFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	vcfMetrics: VariantFilterQuerist.vcfMetrics.vcfMetrics(state) || [],
});


const mapDispatchToProps = dispatch => ({

	addVcfMetric: metric => {
		dispatch(VariantFilterActions.vcfMetrics.add(metric));
	},
	removeVcfMetric: metric => {
		dispatch(VariantFilterActions.vcfMetrics.remove(metric));
	},

});


export default connect(mapStateToProps, mapDispatchToProps)(VcfMetricsFilter);
