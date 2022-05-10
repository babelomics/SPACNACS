import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
    active: VariantFilterQuerist.genomic.pipeline(state) !== null ,
});


const mapDispatchToProps = dispatch => ({
	onRemove: () => {
		dispatch(VariantFilterActions.genomic.pipeline.clean());
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);