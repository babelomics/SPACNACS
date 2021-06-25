import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	samples: state => rootState(state).samples || [],
	/*sample: (state, individualId, sampleId) => (
		StateQuerist.samples(state).find(sample => sample.individualId === individualId && sample.sampleId === sampleId) || ({ individualId: individualId, sampleId: sampleId })
	),
	sampleGenotypes: (state, individualId, sampleId) => (
		StateQuerist.sample(state, individualId, sampleId).genotypes || []
	),*/

    phenotypesSample: (state) => (
        StateQuerist.samples(state).phenotypesSample || []
    ),
    subpopulations:(state) =>(
        StateQuerist.samples(state).subpopulations || []
    ),
    genders: (state) => (
        StateQuerist.samples(state).genders || []
    ),

});


export default StateQuerist;