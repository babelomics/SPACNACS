import { connect } from 'react-redux';

import ProteinSubstitutionScoreFilter from './ProteinSubstitutionScoreFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	filterValue: VariantFilterQuerist.deleteriousness.sift(state),
});


const mapDispatchToProps = dispatch => ({
	setFilterValue: value => {
		dispatch(VariantFilterActions.deleteriousness.setSift(value));
	},
});


const siftClasses = [
	{ id: "tolerated", label: "Tolerated" },
	{ id: "deleterious", label: "Deleterious" },
];


const SiftFilter = ProteinSubstitutionScoreFilter(siftClasses);


export default connect(mapStateToProps, mapDispatchToProps)(SiftFilter);