import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	rootState: state => rootState(state).genomic || {},
    variantTypes: state => StateQuerist.rootState(state).variantTypes || [],
    genomicRegions: state => StateQuerist.rootState(state).genomicRegions || [],
});


export default StateQuerist;