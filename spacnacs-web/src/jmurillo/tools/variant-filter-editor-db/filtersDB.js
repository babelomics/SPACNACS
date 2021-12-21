import React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import LocationOnIcon from '@material-ui/icons/LocationOn';

//import ConnStudyControlFilter from '../variant-filter-editor/filters/group/ConnGroupFilter';

//import ConnGenomicFilter from '../variant-filter-editor/filters/genomic/ConnGenomicFilter';
//import ConnGenomicFilter from '../variant-filter-editor/filters/genomic/ConnGenomicFilter';
import ConnPopulationFrequencyFilter from '../variant-filter-editor/filters/population-frequency/ConnPopulationFrequencyFilter';
//import ConnConservationFilter from '../variant-filter-editor/filters/conservation/ConnConservationFilter';
//import ConnClinicalFilter from '../variant-filter-editor/filters/clinical/ConnClinicalFilter';
// import ConnDeleteriousnessFilter from './filters/deleteriousness/ConnDeleteriousnessFilter';
// import ConnConsequenceTypeFilter from './filters/consequence-types/ConnConsequenceTypeFilter';
// import ConnOrderControlFilter from './filters/order/ConnOrderFilter';
// import PanelFilter from '../variant-filter-editor/filters/samples/ConnSamplesFilter';

//import DefaultFilterStatus from '../variant-filter-editor/filters/FilterStatus';
//import ConnConservationStatus from '../variant-filter-editor/filters/conservation/ConnConservationFilterStatus';
// import ConnDeleteriousnessStatus from '../variant-filter-editor/filters/deleteriousness/ConnDeleteriousnessFilterStatus';

//import ConnStudyControlStatus from '../variant-filter-editor/filters/group/ConnGroupFilterStatus';

// import ConnConsequenceTypeStatus from '../variant-filter-editor/filters/consequence-types/ConnConsequenceTypeFilterStatus';
//import ConnOrderControlStatus from './filters/order/ConnOrderStatus';

// showNumSample --> { 0 == All, 1=only 1 sample, 2=multisample)


import ConnGenomicStatus from '../variant-filter-editor/filters/genomic/ConnGenomicFilterStatus';
import ConnGenomicRegionsFilter from '../variant-filter-editor/filters/genomic/ConnGenomicRegionsFilter';
import ConnAnnotationGeneSelector from '../variant-filter-editor/filters/genomic/ConnAnnotationGeneSelector';
import ConnVariantTypeStatus from '../variant-filter-editor/filters/genomic/ConnVariantTypeStatus';
import ConnVariantTypeFilter from '../variant-filter-editor/filters/genomic/ConnVariantTypeFilter';

import ConnSequencingTypeStatus from '../variant-filter-editor/filters/genomic/ConnSequencingTypeStatus';
import ConnSequencingTypeFilter from '../variant-filter-editor/filters/genomic/ConnSequencingTypeFilter';


import ConnClinicalStatus from '../variant-filter-editor/filters/clinical/ConnFilterStatus';
import ConnClinicalSignificance from '../variant-filter-editor/filters/clinical/ConnClinicalSignificance';
import ConnClinicalAnnotationStatus from '../variant-filter-editor/filters/clinical/ConnAnnotationStatus';
import ConnAnnotationSelector from '../variant-filter-editor/filters/clinical/ConnAnnotationSelector';

import ConnPopulationFrequencyStatus from '../variant-filter-editor/filters/population-frequency/ConnFilterStatus';

import ConnSamplesFilter from '../variant-filter-editor/filters/samples/ConnSamplesFilter';
import ConnSamplesStatus from '../variant-filter-editor/filters/samples/ConnSamplesFilterStatus';

const filtersDB = {

    genomic: {
        short: "Ge",
        label: "Locus",
        icon: <FavoriteIcon />,
       // Component: ConnGenomicFilter,
        StatusIndicator: ConnGenomicStatus, //DefaultFilterStatus,
        sections : [
            {
                label: "Region",
                Component: ConnGenomicRegionsFilter,
                sectionId: "region"
            },
            {
                label: "Gene",
                Component: ConnAnnotationGeneSelector,
                sectionId: "gene"
            },
        ]
    },

    variantType: {
        short: "Va",
        label: "Variant type",
        icon: <FavoriteIcon />,
        // Component: ConnGenomicFilter,
        StatusIndicator: ConnVariantTypeStatus, //DefaultFilterStatus,
        sections : [
            {
                label: "Variant type",
                Component: ConnVariantTypeFilter,
                sectionId: "variant-type"
            }
        ]
    },

    /*
    clinical: {
            short: "Cl",
            label: "Clinical signif.",
            icon: <RestoreIcon />,
            //Component: ConnClinicalFilter,
            StatusIndicator: ConnClinicalStatus,
            sections : [
                {
                    label: "Clincal significance",
                    Component: ConnClinicalSignificance,
                    sectionId: "clinvar-significance"
                }
            ]
     },*/

    term: {
        short: "Te",
        label: "Annotations",
        icon: <RestoreIcon />,
        //Component: ConnClinicalFilter,
        StatusIndicator: ConnClinicalAnnotationStatus,
        sections : [
            {
                label: "Terms",
                Component: ConnAnnotationSelector,
                sectionId: "terms"
            }
        ]
    },


    /* conservation: {
        short: "Co",
        label: "Conservation",
        icon: <LocationOnIcon />,
        Component: ConnConservationFilter,
        StatusIndicator: ConnConservationStatus
    },*/

    frequency: {
        short: "PF",
        label: "Frequency",
        icon: <RestoreIcon />,
        Component: ConnPopulationFrequencyFilter,
        StatusIndicator: ConnPopulationFrequencyStatus
    },


    sample: {
        short: "Samples",
        label: "Samples",
        icon: <RestoreIcon />,
        Component: ConnSamplesFilter,
        StatusIndicator: ConnSamplesStatus
    },

    sequencingType: {
    short: "se",
        label: "Sequencing type",
        icon: <RestoreIcon />,
        StatusIndicator: ConnSequencingTypeStatus,
        sections : [
        {
            label: "Sequencing type",
            Component: ConnSequencingTypeFilter,
            sectionId: "Sequencing-type"
        }
    ]
    },

/*
panel: {
    short: "Pa",
    label: "Panel",
    icon: <RestoreIcon />,
    Component: PanelFilter,
    StatusIndicator: DefaultFilterStatus,
},
consequences: {
    short: "CT",
    label: "Consequences",
    icon: <LocationOnIcon />,
    Component: ConnConsequenceTypeFilter,
    StatusIndicator: ConnConsequenceTypeStatus,
},
deleteriousness: {
    short: "De",
    label: "Deleteriousness",
    icon: <FavoriteIcon />,
    Component: ConnDeleteriousnessFilter,
    StatusIndicator: ConnDeleteriousnessStatus,
},*/
};


export default filtersDB;