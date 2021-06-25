import rootState from './root-state';

const StateQuerist = Object.freeze({
	activeEditor: state => rootState(state).activeEditor || "",
	params: (state, paramName) => rootState(state).params[paramName],
	param: (state, paramName) => rootState(state).params[paramName],
});


export default StateQuerist;