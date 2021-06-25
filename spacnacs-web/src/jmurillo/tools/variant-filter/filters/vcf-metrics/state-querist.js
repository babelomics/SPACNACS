import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	vcfMetrics: state => rootState(state).vcfMetrics || [],
	hasVcfMetric: (state, vcfMetric) => StateQuerist.vcfMetrics(state).includes(vcfMetric),
});


export default StateQuerist;