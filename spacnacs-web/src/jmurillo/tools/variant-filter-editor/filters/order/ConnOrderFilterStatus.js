import { connect } from 'react-redux';

import FilterStatus from '../FilterStatus';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import VariantFilterActions from '../../../variant-filter/actions';


const mapStateToProps = state => ({
    active: VariantFilterQuerist.populationFrequency.active(state),
});


const mapDispatchToProps = dispatch => ({
    onRemove: () => {
        dispatch(VariantFilterActions.populationFrequency.clean());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);