
const StateQuerist = Object.freeze({
	rootState: state => (!!state && state.interactiveInterpretator) || {},
	//analysis: state => EntitiesQuerist.entity(state, "analysis") || null,
	pages: state => StateQuerist.rootState(state).pages || [],
	expanded: state => StateQuerist.rootState(state).expanded || [],

	error: state => StateQuerist.rootState(state).error || "",
	showFilterPanel: state => !!(StateQuerist.rootState(state).showFilterPanel),

    expandedInfoGene: state => StateQuerist.rootState(state).expanded.info || [],

    expandedViewer: state => StateQuerist.rootState(state).expandedViewer ,

	// Locus IGVS
    locusVariant: state => StateQuerist.rootState(state).locusVariant || "",
});

export default StateQuerist;