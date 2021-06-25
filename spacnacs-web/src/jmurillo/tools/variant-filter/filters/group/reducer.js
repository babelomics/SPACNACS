import ActionTypes from "./action-types";


const defaultState = {
	groups: [],
};


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.groups.CLEAN:
			return {
				...state,
				groups: [],
			};
		case ActionTypes.groups.ADD:
			return state.groups.includes(action.group) ? state : {
				...state,
				groups: [...state.groups, action.group],
			};
		case ActionTypes.groups.REMOVE:
			return !state.groups.includes(action.group) ? state : {
				...state,
				groups: state.groups.filter(group => group !== action.group),
			};
		default:
			return state;
	}

	// return state;
};


export default reducer;