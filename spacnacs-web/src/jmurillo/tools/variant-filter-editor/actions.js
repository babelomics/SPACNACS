import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	selectActiveEditor: editorName => ({
		type: ActionTypes.SELECT_ACTIVE_EDITOR,
		editor: editorName,
	}),
	setParam: (paramName, paramValue) => ({
		type: ActionTypes.SET_PARAM,
		paramName: paramName,
		paramValue: paramValue,
	}),
});


export default Actions;
