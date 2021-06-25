import ActionTypes from './action-types';


const defaultState = {
	activeEditor: 'genomic',
	params: {},
};


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SELECT_ACTIVE_EDITOR:
			return state.activeEditor === action.editor ? state : {
				...state,
				activeEditor: action.editor,
			};
		case ActionTypes.SET_PARAM:
			{
				const params = { ...(state.params || {}) };
				params[action.paramName] = action.paramValue;
				return {
					...state,
					params: params,
				};
			}
		default:
			return state;
	}
};


export default reducer;