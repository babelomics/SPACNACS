import { connect } from 'react-redux';

import HpoSelector from './HpoSelector';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
    search: VariantFilterQuerist.samples.phenotypesSample(state),
    pageSize: 5,
    page: 0

});


const mapDispatchToProps = dispatch => ({
	addPhenotype: (hpTerm) => {
		dispatch(VariantFilterActions.samples.phenotypes.add(hpTerm));
	},
	removePhenotype: (hpTerm) => {
		dispatch(VariantFilterActions.samples.phenotypes.remove(hpTerm));
	},
});


const ConnHpoSelector = connect(mapStateToProps, mapDispatchToProps)(HpoSelector);


export default ConnHpoSelector;