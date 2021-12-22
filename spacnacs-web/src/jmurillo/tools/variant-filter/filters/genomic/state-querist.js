import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	rootState: state => rootState(state).genomic || {},
    variantTypes: state => StateQuerist.rootState(state).variantTypes || [],
    genomicRegions: state => StateQuerist.rootState(state).genomicRegions || [],
    sequencingTypes: state => StateQuerist.rootState(state).sequencingTypes || [],
    pipeline: state => StateQuerist.rootState(state).pipeline || null,
});


export default StateQuerist;