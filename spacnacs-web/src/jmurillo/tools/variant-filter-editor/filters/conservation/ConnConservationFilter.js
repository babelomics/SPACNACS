import { connect } from 'react-redux';

import ConservationFilter from './ConservationFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	filterScores: VariantFilterQuerist.conservation.scores(state),
});


const mapDispatchToProps = dispatch => ({
	setFilterScore: score => {
		dispatch(VariantFilterActions.conservation.setScore(score));
	},
	removeFilterScore: scoreName => {
		dispatch(VariantFilterActions.conservation.removeScore(scoreName));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(ConservationFilter);
