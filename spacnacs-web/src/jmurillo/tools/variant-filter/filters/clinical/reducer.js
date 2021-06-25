import ActionTypes from "./action-types";


const defaultState = {
	phenotypes: [],
	//clinvars: ['Pathogenic','Likely pathogenic','Likely benign','Benign','Others'],
	clinvars:[]
};


const reducer = (state = defaultState, action) => {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.phenotypes.CLEAN:
			return {
				...state,
				phenotypes: state.phenotypes.filter(phenotype => phenotype.annotationField !== "gene"),
			};
		case ActionTypes.phenotypes.ADD:
			return state.phenotypes.includes(action.hpTermId) ? state : {
				...state,
				phenotypes: [...state.phenotypes, action.hpTermId],
			};
		case ActionTypes.phenotypes.REMOVE:
			return !state.phenotypes.includes(action.hpTermId) ? state : {
				...state,
				phenotypes: state.phenotypes.filter(phenotype => phenotype !== action.hpTermId),
			};


		case ActionTypes.clinvars.CLEAN:
			return {
				...state,
				clinvars: [],
			};
		case ActionTypes.clinvars.ADD:
			return state.clinvars.includes(action.clinvar) ? state : {
				...state,
				clinvars: [...state.clinvars, action.clinvar],
			};
		case ActionTypes.clinvars.REMOVE:
			return !state.clinvars.includes(action.clinvar) ? state : {
				...state,
				clinvars: state.clinvars.filter(clinvar => clinvar !== action.clinvar),
			};


		default:
			return state;
	}
	// return state;
};

export default reducer;