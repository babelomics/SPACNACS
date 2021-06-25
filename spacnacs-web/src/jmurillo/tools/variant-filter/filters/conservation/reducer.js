import ActionTypes from './action-types';


const defaultState = [];


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SET_ALL:
			return action.scores || [];
		case ActionTypes.SET:
			{
				const index = state.findIndex(score => score.id === action.score.id);
				if (-1 === index) {
					return [...state, action.score];
				} else {
					const scores = [...state];
					scores.splice(index, 1, action.score);
					return scores;
				}
			}
		case ActionTypes.REMOVE:
			return !state.some(score => score.id === action.scoreName) ?
				state : state.filter(score => score.id !== action.scoreName);
		default:
			return state;
	}
};


export default reducer;
