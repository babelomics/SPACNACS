import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}order.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	SET_FILTER: PREFIX + "set-filter",
	REMOVE_FILTER: PREFIX + "remove-filter",
	REMOVE_BY_ORDER: PREFIX + "remove-by-order",
});


export default ActionTypes;