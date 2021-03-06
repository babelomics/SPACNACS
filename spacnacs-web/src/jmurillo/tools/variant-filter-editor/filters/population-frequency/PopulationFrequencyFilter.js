import React from 'react';

import ConnMenuBar from './ConnMenuBar';
import ConnPopulationPanel from './ConnPopulationPanel';
import populationFrequencyStudies from '../../../../common/population-frequency-studies';

const PopulationFrequencyFilter = props => (
	<div>
		<ConnMenuBar />
		{
			populationFrequencyStudies.map(study => (
					<ConnPopulationPanel population={study.id} />
			))
		}
	</div>
);


export default PopulationFrequencyFilter;