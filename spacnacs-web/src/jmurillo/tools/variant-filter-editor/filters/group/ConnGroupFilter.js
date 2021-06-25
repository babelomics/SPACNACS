import { connect } from 'react-redux';

import GroupFilter from './GroupFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import EntitiesQuerist from '../../../../entities/state-querist';

const mapStateToProps = state => ({
	group: VariantFilterQuerist.group.groups(state),
    analysis: EntitiesQuerist.entity(state, "analysis") || null,
});


const mapDispatchToProps = dispatch => ({
    addSampleGroupView: typeGroup => {
        dispatch(VariantFilterActions.group.groups.add(typeGroup));
    },
    removeSampleGroupView: typeGroup => {
        dispatch(VariantFilterActions.group.groups.remove(typeGroup));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(GroupFilter);