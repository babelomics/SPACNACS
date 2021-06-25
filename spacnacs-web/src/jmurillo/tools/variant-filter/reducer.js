import { combineReducers } from 'redux';


import clinicalReducer from './filters/clinical/reducer';
import consequenceTypesReducer from './filters/consequence-types/reducer';
import conservationReducer from './filters/conservation/reducer';
import deleteriousnessReducer from './filters/deleteriousness/reducer';
import genomicReducer from './filters/genomic/reducer';
import populationFrequencyReducer from './filters/population-frequency/reducer';
import samplesReducer from './filters/samples/reducer';
import optionsViewReducer from './filters/optionsView/reducer';
import vcfMetricsReducer from './filters/vcf-metrics/reducer';
import groupsReducers from './filters/group/reducer';
import searchReducers from './filters/search/reducer';


/*
filter:
	samples: [{ sampleId, individualId, genotypes }]
	genes: [string]
	transcripts: [string]
	regions: [chrom(:start-end)?]
	geneBiotypes: [string]
	xrefs: [string]
	consequenceTypes: [id]
	vcfMetrics: [string]
*/


const reducer = combineReducers({
	clinical: clinicalReducer,
	consequenceTypes: consequenceTypesReducer,
	conservationScores: conservationReducer,
	deleteriousness: deleteriousnessReducer,
	genomic: genomicReducer,
	populationFrequency: populationFrequencyReducer,
	samples: samplesReducer,
	optionsView: optionsViewReducer,
	vcfMetrics: vcfMetricsReducer,
	groups: groupsReducers,
	search: searchReducers,
});


export default reducer;