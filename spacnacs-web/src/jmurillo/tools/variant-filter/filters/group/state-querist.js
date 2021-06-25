import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	rootState: state => rootState(state).groups || {},
	groups: state => StateQuerist.rootState(state).groups || [],
});


export default StateQuerist;