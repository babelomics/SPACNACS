import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	groups: {
		clean: () => ({
			type: ActionTypes.groups.CLEAN,
		}),
		add: group => ({
			type: ActionTypes.groups.ADD,
            group: group,
		}),
		remove: group => ({
			type: ActionTypes.groups.REMOVE,
            group: group,
		}),
	},
});


export default Actions;
