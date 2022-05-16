import React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ConnPopulationFrequencyFilter from '../variant-filter-editor/filters/population-frequency/ConnPopulationFrequencyFilter';


import ConnGenomicStatus from '../variant-filter-editor/filters/genomic/ConnGenomicFilterStatus';
import ConnGenomicRegionsFilter from '../variant-filter-editor/filters/genomic/ConnGenomicRegionsFilter';
import ConnAnnotationGeneSelector from '../variant-filter-editor/filters/genomic/ConnAnnotationGeneSelector';
import ConnVariantTypeStatus from '../variant-filter-editor/filters/genomic/ConnVariantTypeStatus';
import ConnVariantTypeFilter from '../variant-filter-editor/filters/genomic/ConnVariantTypeFilter';

import ConnSequencingTypeStatus from '../variant-filter-editor/filters/genomic/ConnSequencingTypeStatus';
import ConnSequencingTypeFilter from '../variant-filter-editor/filters/genomic/ConnSequencingTypeFilter';
import ConnPipelineStatus from '../variant-filter-editor/filters/genomic/ConnPipelineStatus';
import ConnPipelineFilter from '../variant-filter-editor/filters/genomic/ConnPipelineFilter';

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
        StatusIndicator: ConnGenomicStatus,
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
        StatusIndicator: ConnVariantTypeStatus,
        sections : [
            {
                label: "Variant type",
                Component: ConnVariantTypeFilter,
                sectionId: "variant-type"
            }
        ]
    },


    term: {
        short: "Te",
        label: "Annotations",
        icon: <RestoreIcon />,
        StatusIndicator: ConnClinicalAnnotationStatus,
        sections : [
            {
                label: "Terms",
                Component: ConnAnnotationSelector,
                sectionId: "terms"
            }
        ]
    },

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

    pipeline: {
        short: "pl",
            label: "Pipeline",
            icon: <RestoreIcon />,
            StatusIndicator: ConnPipelineStatus,
            sections : [
            {
                label: "Pipeline",
                Component: ConnPipelineFilter,
                sectionId: "pipe-line"
            }
        ]
    },
};


export default filtersDB;