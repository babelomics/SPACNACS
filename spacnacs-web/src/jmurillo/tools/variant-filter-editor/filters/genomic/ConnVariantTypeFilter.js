import { connect } from 'react-redux';

import VariantTypeFilter from './VariantTypeFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';

const mapStateToProps = state => ({
	filterVariantTypes: VariantFilterQuerist.genomic.variantTypes(state)
});


const mapDispatchToProps = dispatch => ({
    addFilterVariantTypes: variantTypes => {
        dispatch(VariantFilterActions.genomic.variantTypes.add(variantTypes));
    },
    removeFilterVariantTypes: variantTypes => {
        dispatch(VariantFilterActions.genomic.variantTypes.remove(variantTypes));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(VariantTypeFilter);