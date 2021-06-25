import ActionTypes from './action-types';


const defaultState = [];


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SET:
			return action.vcfMetrics || [];
		case ActionTypes.ADD:
			return state.includes(action.vcfMetric) ? state : [ ...state, action.vcfMetric ];
		case ActionTypes.REMOVE:
			return state.filter(metric => action.vcfMetric !== metric);
		default:
			return state;
	}
};


export default reducer;
