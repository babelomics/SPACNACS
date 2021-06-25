import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import populationFrequencyStudies from '../../../../common/population-frequency-studies';
import ConnSubpopulation from './ConnSubpopulation';


const PopulationPanel = props => {
	const population = populationFrequencyStudies.find(study => study.id === props.population);
	return (
		<div>
			{/* <Grid container justify="flex-start" alignItems="center"> */}
				{
					population.populations.map(subpopulation => (
						<ConnSubpopulation key={subpopulation} population={props.population} subpopulation={subpopulation} />
					))
				}
			{/* </Grid> */}
		</div>
	);
};


PopulationPanel.propTypes = {
	population: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(PopulationPanel);
