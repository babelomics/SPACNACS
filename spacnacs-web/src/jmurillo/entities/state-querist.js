const StateQuerist = Object.freeze({
	root: state => (!!state && state.entities) || {},
	entity: (state, type) => StateQuerist.root(state)[type] || null,
	entities: (state, type) => StateQuerist.root(state)[type] || [],
	analyses: state => StateQuerist.root(state).analyses || [],
});


export default StateQuerist;
