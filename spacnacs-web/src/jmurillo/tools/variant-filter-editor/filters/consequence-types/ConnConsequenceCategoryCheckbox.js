import { connect } from 'react-redux';

import FilterActions from '../../../variant-filter/actions';
import ConsequenceCategoryCheckbox from './ConsequenceCategoryCheckbox';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import ensemblCalculatedVariantConsequences from '../../../../models/ensembl-calculated-variant-consequences';


const mapStateToProps = category => state => {
	const filterConsequenceTypes = VariantFilterQuerist.consequenceTypes.consequenceTypes(state);
	const categoryConsequenceTypes = ensemblCalculatedVariantConsequences
		.filter(consequenceType => consequenceType.categories.includes(category))
		.map(consequenceType => consequenceType.id);
	const checked = categoryConsequenceTypes.every(consequenceType => filterConsequenceTypes.includes(consequenceType));
	const indeterminate = !checked && categoryConsequenceTypes.some(consequenceType => filterConsequenceTypes.includes(consequenceType));
	return {
		checked: checked,
		indeterminate: indeterminate,
	};
};


const mapDispatchToProps = category => dispatch => ({
	onChange: (_, checked) => {
		const categoryConsequenceTypes = ensemblCalculatedVariantConsequences
			.filter(consequenceType => consequenceType.categories.includes(category))
			.map(consequenceType => consequenceType.id);
		if (!!checked) {
			for (const consequenceType of categoryConsequenceTypes) {
				dispatch(FilterActions.consequenceTypes.add(consequenceType));
			}
		} else {
			for (const consequenceType of categoryConsequenceTypes) {
				dispatch(FilterActions.consequenceTypes.remove(consequenceType));
			}
		}
	},

});


const ConnConsequenceCategoryCheckbox = category => connect(mapStateToProps(category), mapDispatchToProps(category))(ConsequenceCategoryCheckbox);


export default ConnConsequenceCategoryCheckbox;