import { connect } from 'react-redux';

import PopulationFrequencyFilter from './PopulationFrequencyFilter';
import ParentQuerist from '../../state-querist';
import populationFrequencyStudies from '../../../../common/population-frequency-studies';


const mapStateToProps = state => ({
	activeStudy: ParentQuerist.param(state, "frequenciesStudy") || populationFrequencyStudies[0].id,
});


const mapDispatchToProps = dispatch =>  ({
});


export default connect(mapStateToProps, mapDispatchToProps)(PopulationFrequencyFilter);