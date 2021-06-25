import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}frequency.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	SET_FILTER: PREFIX + "set-filter",
	REMOVE_FILTER: PREFIX + "remove-filter",
	REMOVE_BY_POPULATION: PREFIX + "remove-by-population",
});


export default ActionTypes;