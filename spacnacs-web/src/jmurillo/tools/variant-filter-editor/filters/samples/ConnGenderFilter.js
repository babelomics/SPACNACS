import { connect } from 'react-redux';

import GenderFilter from './GenderFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';

const mapStateToProps = state => ({
	filterGender: VariantFilterQuerist.samples.genders(state)
});


const mapDispatchToProps = dispatch => ({
    addFilterGender: gender => {
        dispatch(VariantFilterActions.samples.genders.add(gender));
    },
    removeFilterGender: gender => {
        dispatch(VariantFilterActions.samples.genders.remove(gender));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(GenderFilter);