import ActionTypes from './action-types';


const defaultState = [];


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SET:
			return action.consequences || [];
		case ActionTypes.ADD:
			return state.includes(action.consequence) ? state : [...state, action.consequence];
		case ActionTypes.REMOVE:
			return !state.includes(action.consequence) ? state : state.filter(consequence => consequence !== action.consequence);
		default:
			return state;
	}
};


export default reducer;
