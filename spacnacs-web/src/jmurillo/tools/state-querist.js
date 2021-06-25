const StateQuerist = Object.freeze({
    baseState: state => (!!state && state.tool) || {},
	name: state => StateQuerist.baseState(state).name || "",
});


export default StateQuerist;