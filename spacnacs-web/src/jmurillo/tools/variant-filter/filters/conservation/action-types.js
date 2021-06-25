import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}conservation.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	SET_ALL: PREFIX + "set-all",
	SET: PREFIX + "set",
	REMOVE: PREFIX + "remove",
});


export default ActionTypes;