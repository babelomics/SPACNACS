import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@material-ui/core';

import ConnMenuBar from './ConnMenuBar';
import ConnGenomicRegionsFilter from './ConnGenomicRegionsFilter';
import ConnVariantTypeFilter from './ConnVariantTypeFilter';
// import ConnGeneBiotypeFilter from './ConnGeneBiotypeFilter';

const genomicFilterSections = [
	{
		label: "Genomic regions",
		Component: ConnGenomicRegionsFilter,
		sectionId: "regions"
	},
	{
		label: "Variant type",
		Component: ConnVariantTypeFilter,
		sectionId: "variant-type"
	},
	/*{
		label: "Gene biotype",
		Component: ConnGeneBiotypeFilter,
		sectionId: "biotype"
	},
	{
		label: "Feature",
		Component: ConnGenomicRegionsFilter,
		sectionId: "feature"
	}*/
];


const GenomicFilter = props => (

	<React.Fragment>
		<ConnMenuBar />
		{
			genomicFilterSections.map(section => {
				const SectionComponent = section.Component;
				return (
					<Collapse key={section.sectionId} in={section.sectionId === props.activeSubfilter} mountOnEnter unmountOnExit>
						<SectionComponent />
					</Collapse>
				);
			})
		}
	</React.Fragment>
);


GenomicFilter.propTypes = {
	activeSubfilter: PropTypes.string.isRequired,
	regions: PropTypes.array.isRequired,
	variantType: PropTypes.array.isRequired,
	geneBiotypes: PropTypes.array.isRequired,
	setRegions: PropTypes.func.isRequired,
	setVariantTypes: PropTypes.func.isRequired,
	setGeneBiotypes: PropTypes.func.isRequired,

};


export default GenomicFilter;