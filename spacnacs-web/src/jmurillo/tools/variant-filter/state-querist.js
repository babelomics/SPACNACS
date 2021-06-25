import rootState from './root-state';
import clinicalQuerist from './filters/clinical/state-querist';
import consequenceTypesQuerist from './filters/consequence-types/state-querist';
import conservationQuerist from './filters/conservation/state-querist';
import deleteriousnessQuerist from './filters/deleteriousness/state-querist';
import genomicQuerist from './filters/genomic/state-querist';
import populationFrequencyQuerist from './filters/population-frequency/state-querist';
import samplesQuerist from './filters/samples/state-querist';
import optionsViewQuerist from './filters/optionsView/state-querist';
import vcfMetricsQuerist from './filters/vcf-metrics/state-querist';
import groupQuerist from './filters/group/state-querist';
import searchQuerist from './filters/search/state-querist';


const StateQuerist = Object.freeze({
	filter: rootState,
	clinical: clinicalQuerist,
	consequenceTypes: consequenceTypesQuerist,
	conservation: conservationQuerist,
	deleteriousness: deleteriousnessQuerist,
	genomic: genomicQuerist,
	populationFrequency: populationFrequencyQuerist,
	samples: samplesQuerist,
    optionsView: optionsViewQuerist,
	vcfMetrics: vcfMetricsQuerist,
    group: groupQuerist,
    search: searchQuerist,

});


export default StateQuerist;
