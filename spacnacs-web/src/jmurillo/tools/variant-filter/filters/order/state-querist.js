import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	filters: state => rootState(state).populationFrequency || [],
	active: state => 0 < StateQuerist.filters(state).length,
	populationFilters: (state, population) => StateQuerist.filters(state).filter(filter => filter.population === population),
	subpopulationFilter: (state, population, subpopulation) => StateQuerist.filters(state).find(filter => filter.population === population && filter.subpopulation === subpopulation) || {},
});


export default StateQuerist;