import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import VariantFilterActions from '../../../variant-filter/actions';


const mapStateToProps = state => ({
	active: 0 < VariantFilterQuerist.conservation.scores(state).length &&
		VariantFilterQuerist.conservation.scores(state).some(score => !!score.min || 0 === score.min || !!score.max || 0 === score.max),
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		dispatch(VariantFilterActions.conservation.clean());
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);
