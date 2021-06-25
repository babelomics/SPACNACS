import { connect } from 'react-redux';

import ProteinSubstitutionScoreFilter from './ProteinSubstitutionScoreFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	filterValue: VariantFilterQuerist.deleteriousness.polyphen(state),
});


const mapDispatchToProps = dispatch => ({
	setFilterValue: value => {
		dispatch(VariantFilterActions.deleteriousness.setPolyphen(value));
	},
});


const polyphenClasses = [
	{ id: "unknown", label: "Unknown" },
	{ id: "benign", label: "Benign" },
	{ id: "possibly+damaging", label: "Possibly damaging" },
	{ id: "probably+damaging", label: "Probably damaging" },
];


const PolyphenFilter = ProteinSubstitutionScoreFilter(polyphenClasses);


export default connect(mapStateToProps, mapDispatchToProps)(PolyphenFilter);