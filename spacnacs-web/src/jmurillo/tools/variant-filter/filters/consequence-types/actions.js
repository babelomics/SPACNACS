import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	set: consequences => ({
		type: ActionTypes.SET,
		consequences: consequences.map(consequence => consequence.trim()),
	}),
	add: consequence => ({
		type: ActionTypes.ADD,
		consequence: consequence.trim(),
	}),
	remove: consequence => ({
		type: ActionTypes.REMOVE,
		consequence: consequence.trim(),
	}),
});


export default Actions;
