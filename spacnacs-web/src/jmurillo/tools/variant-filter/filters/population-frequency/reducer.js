import ActionTypes from './action-types';


/*
[{
	population,
	subpopulation,
	min,
	max,
}]
*/

const defaultState = [];


function removeFilter(filters, population, subpopulation) {
	return filters.filter(filter => filter.population !== population || filter.subpopulation !== subpopulation);
}

function addFilter(filters, filter) {
	if (!!filter.population && !!filter.subpopulation && (!isNaN(filter.min) || !isNaN(filter.max))) {
		const newFilters = removeFilter(filters, filter.population, filter.subpopulation);
		newFilters.push(filter);
		return newFilters;
	} else {
		return filters;
	}

}


function removePopulationFilters(filters, population) {
	return filters.filter(filter => filter.population !== population);
}


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SET_FILTER:
			return addFilter(state, action.filter);
		case ActionTypes.REMOVE_FILTER:
			return removeFilter(state, action.population, action.subpopulation);
		case ActionTypes.REMOVE_BY_POPULATION:
			return removePopulationFilters(state, action.population);
		default:
			return state;
	}
};


export default reducer;
