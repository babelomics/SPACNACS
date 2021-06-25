import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	setSelectedView: selectedView => ({
		type: ActionTypes.SET_SELECTED_VIEW,
        selectedView: selectedView,
	}),
    addHidden: column => ({
        type: ActionTypes.ADD_HIDDEN,
        column: column,
    }),
    removeHidden: column => ({
        type: ActionTypes.REMOVE_HIDDEN,
        column: column,
    }),

});


export default Actions;
