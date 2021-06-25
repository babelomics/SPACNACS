import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import VariantFilterActions from '../../../variant-filter/actions';


const mapStateToProps = state => ({
	active:
	0 < VariantFilterQuerist.search.search(state).some(e => e.annotationField !== "all" && e.annotationField !="gene"),
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		//dispatch(VariantFilterActions.clinical.phenotypes.clean());
		dispatch(VariantFilterActions.search.cleanAnnotationField());
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);
