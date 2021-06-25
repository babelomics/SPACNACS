import clinicalActions from './filters/clinical/actions';
import consequenceTypesActions from './filters/consequence-types/actions';
import conservationActions from './filters/conservation/actions';
import deleteriousnessActions from './filters/deleteriousness/actions';
import genomicActions from './filters/genomic/actions';
import populationFrequencyActions from './filters/population-frequency/actions';
import samplesActions from './filters/samples/actions';
import optionsViewActions from './filters/optionsView/actions';
import vcfMetricsActions from './filters/vcf-metrics/actions';
import groupActions from './filters/group/actions';

import searchActions from './filters/search/actions';

const Actions = Object.freeze({
	clinical: clinicalActions,
	consequenceTypes: consequenceTypesActions,
	conservation: conservationActions,
	deleteriousness: deleteriousnessActions,
	genomic: genomicActions,
	populationFrequency: populationFrequencyActions,
	samples: samplesActions,
	optionsView: optionsViewActions,
	vcfMetrics: vcfMetricsActions,
	group: groupActions,

	// search
	search: searchActions,
});


export default Actions;