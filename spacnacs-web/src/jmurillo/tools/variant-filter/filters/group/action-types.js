import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}group.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
    groups: Object.freeze({
		CLEAN: PREFIX + "groups.clean",
		ADD: PREFIX + "groups.add",
		REMOVE: PREFIX + "groups.remove",
	}),
});


export default ActionTypes;