import ActionTypes from './action-types';


/*
{
	proteinSubstitutionScores: {
		sift: {
			min,
			max,
			type in {tolerated, benign}
		},
		polyphen: {
			min,
			max,
			type in {benign, unknown, possibly-damaging, probably-damaging}
		},
	},
	cadd: {
		raw: {
			min,
			max,
		},
		scaled: {
			min,
			max,
		},
	},

}
*/

const defaultState = {
	proteinSubstitutionScores: {
		sift: {},
		polyphen: {},
	},
	cadd: {
		raw: {},
		scaled: {},
	},
};


function reducer(state = defaultState, action) {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SET_SIFT:
			return {
				...state,
				proteinSubstitutionScores: {
					...state.proteinSubstitutionScores,
					sift: action.value,
				},
			};
		case ActionTypes.SET_POLYPHEN:
			return {
				...state,
				proteinSubstitutionScores: {
					...state.proteinSubstitutionScores,
					polyphen: action.value,
				},
			};
		case ActionTypes.SET_CADD_RAW:
			return {
				...state,
				cadd: {
					...state.cadd,
					raw: action.value,
				},
			};
		case ActionTypes.SET_CADD_SCALED:
			return {
				...state,
				cadd: {
					...state.cadd,
					scaled: action.value,
				},
			};
		default:
			return state;
	}
};


export default reducer;
