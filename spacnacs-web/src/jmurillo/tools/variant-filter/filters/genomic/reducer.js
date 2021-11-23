import ActionTypes from './action-types';

const defaultState = {
    variantTypes: ['DUP','DEL'],
    genomicRegions: [],
};

const reducer = (state = defaultState, action) => {
    switch (!!action && action.type) {
        case ActionTypes.CLEAN:
            return defaultState;


        case ActionTypes.variantTypes.CLEAN:
            return {
                ...state,
                variantTypes: [],
            };
        case ActionTypes.variantTypes.ADD:
            return state.variantTypes.includes(action.variantType) ? state : {
                ...state,
                variantTypes: [...state.variantTypes, action.variantType],
            };
        case ActionTypes.variantTypes.REMOVE:
            return !state.variantTypes.includes(action.variantType) ? state : {
                ...state,
                variantTypes: state.variantTypes.filter(variantType => variantType !== action.variantType),
            };


        case ActionTypes.genomicRegions.CLEAN:
            return {
                ...state,
                genomicRegions: [],
            };
        case ActionTypes.genomicRegions.ADD:
            /*return state.genomicRegions.some(region => region.chromosome === action.region.chromosome &&
                region.start === action.region.start &&
                region.end === action.region.end) ? state : {
                    ...state,
                    genomicRegions: [...state.genomicRegions, action.region],
                };*/
            // return only one
            return {
                ...state,
                genomicRegions:[action.region]
            };

        case ActionTypes.genomicRegions.REMOVE:
            return !state.genomicRegions.includes(action.region) ? state : {
                ...state,
                genomicRegions: state.genomicRegions.filter(region => region.chromosome !== action.region.chromosome ||
                    region.start !== action.region.start ||
                    region.end !== action.region.end),
            };


        default:
            return state;
    }
};


export default reducer;
