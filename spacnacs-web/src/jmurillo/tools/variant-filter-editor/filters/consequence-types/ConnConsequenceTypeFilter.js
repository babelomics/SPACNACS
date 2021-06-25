import { connect } from 'react-redux';

import ConsequenceTypeFilter from './ConsequenceTypeFilter';
import ParentQuerist from '../../state-querist';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';




const mapStateToProps = state => ({
	activeCategory: ParentQuerist.param(state, "consequenceTypesCategory") || "LOSS_OF_FUNCTION",
	filterConsequenceTypes: VariantFilterQuerist.consequenceTypes.consequenceTypes(state),
});


const mapDispatchToProps = dispatch => ({
	addFilterConsequenceType: consequenceType => {
		dispatch(VariantFilterActions.consequenceTypes.add(consequenceType));
	},
	removeFilterConsequenceType: consequenceType => {
		dispatch(VariantFilterActions.consequenceTypes.remove(consequenceType));
	},
});


const ConnConsequenceTypeFilter = connect(mapStateToProps, mapDispatchToProps)(ConsequenceTypeFilter);


export default ConnConsequenceTypeFilter;