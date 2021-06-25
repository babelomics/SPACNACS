import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OrderFilter from './OrderFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = (state, ownProps) => ({
    filter: VariantFilterQuerist.order.orderFilter(state, ownProps.order),
});


const mapDispatchToProps = (dispatch, ownProps) => ({
    setFilter: (min, max) => {
        if (!isNaN(min) || !isNaN(max)) {
            const filter = { order: ownProps.order };
            if (!isNaN(min)) {
                filter.min = min;
            }
            if (!isNaN(max)) {
                filter.max = max;
            }
            dispatch(VariantFilterActions.order.setFilter(filter));
        } else {
            dispatch(VariantFilterActions.order.removeFilter(ownProps.order));
        }
    },
});

OrderFilter.propTypes = {
    order: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilter);