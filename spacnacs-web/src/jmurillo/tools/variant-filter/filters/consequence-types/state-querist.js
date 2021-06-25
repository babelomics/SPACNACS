import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	consequenceTypes: state => rootState(state).consequenceTypes || [],
});


export default StateQuerist;