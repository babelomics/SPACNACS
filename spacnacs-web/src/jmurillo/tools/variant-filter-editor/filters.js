import React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ConnStudyControlFilter from './filters/group/ConnGroupFilter';
import ConnSamplesFilter from './filters/samples/ConnSamplesFilter';
import ConnGenomicFilter from './filters/genomic/ConnGenomicFilter';
import ConnPopulationFrequencyFilter from './filters/population-frequency/ConnPopulationFrequencyFilter';
import ConnConservationFilter from './filters/conservation/ConnConservationFilter';
import ConnClinicalFilter from './filters/clinical/ConnClinicalFilter';
// import ConnDeleteriousnessFilter from './filters/deleteriousness/ConnDeleteriousnessFilter';
// import ConnConsequenceTypeFilter from './filters/consequence-types/ConnConsequenceTypeFilter';
// import ConnOrderControlFilter from './filters/order/ConnOrderFilter';
// import PanelFilter from './filters/samples/ConnSamplesFilter';

import DefaultFilterStatus from './filters/FilterStatus';
import ConnGenomicStatus from './filters/genomic/ConnGenomicFilterStatus';
import ConnConservationStatus from './filters/conservation/ConnConservationFilterStatus';
// import ConnDeleteriousnessStatus from './filters/deleteriousness/ConnDeleteriousnessFilterStatus';
//import ConnSamplesStatus from './filters/samples/ConnSamplesFilterStatus';
import ConnStudyControlStatus from './filters/group/ConnGroupFilterStatus';
import ConnClinicalStatus from './filters/clinical/ConnFilterStatus';
// import ConnConsequenceTypeStatus from './filters/consequence-types/ConnConsequenceTypeFilterStatus';
import ConnPopulationFrequencyStatus from './filters/population-frequency/ConnFilterStatus';
//import ConnOrderControlStatus from './filters/order/ConnOrderStatus';

// showNumSample --> { 0 == All, 1=only 1 sample, 2=multisample)
const filters = {
    /*orderControl: {
        short: "Or",
        label: "Order",
        icon: <RestoreIcon />,
        Component: ConnOrderControlFilter,
        StatusIndicator: ConnOrderControlStatus,
    },*/

    studyControl: {
        short: "SC",
        label: "Study/Control",
        icon: <RestoreIcon />,
        Component: ConnStudyControlFilter,
        StatusIndicator: ConnStudyControlStatus,
        showNumSample: 2,
    },
    genomic: {
        short: "Ge",
        label: "Genomic",
        icon: <FavoriteIcon />,
        Component: ConnGenomicFilter,
        StatusIndicator: ConnGenomicStatus, //DefaultFilterStatus,
    },

    clinical: {
        short: "Cl",
        label: "Annotations",
        icon: <RestoreIcon />,
        Component: ConnClinicalFilter,
        StatusIndicator: ConnClinicalStatus
    },

    conservation: {
        short: "Co",
        label: "Conservation",
        icon: <LocationOnIcon />,
        Component: ConnConservationFilter,
        StatusIndicator: ConnConservationStatus
    },

    frequency: {
        short: "PF",
        label: "Frequency",
        icon: <RestoreIcon />,
        Component: ConnPopulationFrequencyFilter,
        StatusIndicator: ConnPopulationFrequencyStatus
    },


    /*samples: {
        short: "Sa",
        label: "Samples",
        icon: <RestoreIcon />,
        Component: ConnSamplesFilter,
        StatusIndicator: ConnSamplesStatus,
    },*/
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


export default filters;