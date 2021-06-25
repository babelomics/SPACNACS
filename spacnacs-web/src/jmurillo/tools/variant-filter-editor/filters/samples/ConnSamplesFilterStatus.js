import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	active: VariantFilterQuerist.samples.phenotypesSample(state).length > 0 || VariantFilterQuerist.samples.genders(state).length > 0 || VariantFilterQuerist.samples.subpopulations(state).length > 0,
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		dispatch(VariantFilterActions.samples.clean());
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);