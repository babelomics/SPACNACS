import { connect } from 'react-redux';

import HpoSelector from './HpoSelector';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	phenotypes: VariantFilterQuerist.clinical.phenotypes(state),
});


const mapDispatchToProps = dispatch => ({
	addPhenotype: (hpTerm) => {
		dispatch(VariantFilterActions.clinical.phenotypes.add(hpTerm.id));
	},
	removePhenotype: (hpTerm) => {
		dispatch(VariantFilterActions.clinical.phenotypes.remove(hpTerm.id));
	},
});


const ConnHpoSelector = connect(mapStateToProps, mapDispatchToProps)(HpoSelector);


export default ConnHpoSelector;