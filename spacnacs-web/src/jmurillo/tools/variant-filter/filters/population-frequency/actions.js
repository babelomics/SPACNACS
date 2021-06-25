import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	setFilter: filter => ({
		type: ActionTypes.SET_FILTER,
		filter: filter,
	}),
	removeFilter: (population, subpopulation) => ({
		type: ActionTypes.REMOVE_FILTER,
		population: population,
		subpopulation: subpopulation,
	}),
	removeByPopulation: population => ({
		type: ActionTypes.REMOVE_BY_POPULATION,
		population: population,
	}),
});


export default Actions;
