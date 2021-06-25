import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	rootState: state => rootState(state).clinical || {},
	phenotypes: state => StateQuerist.rootState(state).phenotypes || [],
	clinvars: state => StateQuerist.rootState(state).clinvars || [],
});


export default StateQuerist;