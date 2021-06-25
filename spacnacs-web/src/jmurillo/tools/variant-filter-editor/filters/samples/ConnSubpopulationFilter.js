import { connect } from 'react-redux';

import SubpopulationFilter from './SubpopulationFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';

const mapStateToProps = state => ({
    filterSubpopulation: VariantFilterQuerist.samples.subpopulations(state)
});


const mapDispatchToProps = dispatch => ({
    addFilterSubpopulation: subpopulation => {
        dispatch(VariantFilterActions.samples.subpopulations.add(subpopulation));
    },
    removeFilterSubpopulation: subpopulation => {
        dispatch(VariantFilterActions.samples.subpopulations.remove(subpopulation));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(SubpopulationFilter);