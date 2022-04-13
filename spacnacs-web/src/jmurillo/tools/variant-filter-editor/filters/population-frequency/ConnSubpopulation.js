import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Subpopulation from './Subpopulation';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = (state, ownProps) => ({
	filter: VariantFilterQuerist.populationFrequency.subpopulationFilter(state, ownProps.population, ownProps.subpopulation),
});


const mapDispatchToProps = (dispatch, ownProps) => ({
	setFilter: (min, max) => {
		if (!isNaN(min) || !isNaN(max)) {
			const filter = { population: ownProps.population, subpopulation: ownProps.subpopulation };

			if(min === "" && max === ""){
                dispatch(VariantFilterActions.populationFrequency.removeFilter(ownProps.population, ownProps.subpopulation));
			} else {
                if (!isNaN(min)) {
                    filter.min = min;
                }
                if (!isNaN(max)) {
                    filter.max = max;
                }
                dispatch(VariantFilterActions.populationFrequency.setFilter(filter));
            }
		} else {
			dispatch(VariantFilterActions.populationFrequency.removeFilter(ownProps.population, ownProps.subpopulation));
		}
	},
});


Subpopulation.propTypes = {
	population: PropTypes.string.isRequired,
	subpopulation: PropTypes.string.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Subpopulation);