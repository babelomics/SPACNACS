import { connect } from 'react-redux';

import SequencingTypeFilter from './SequencingTypeFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';

const mapStateToProps = state => ({
	filterSequencingTypes: VariantFilterQuerist.genomic.sequencingTypes(state)
});


const mapDispatchToProps = dispatch => ({
    addFilterSequencingTypes: sequencingType => {
        dispatch(VariantFilterActions.genomic.sequencingTypes.add(sequencingType));
    },
    removeFilterSequencingTypes: sequencingType => {
        dispatch(VariantFilterActions.genomic.sequencingTypes.remove(sequencingType));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(SequencingTypeFilter);