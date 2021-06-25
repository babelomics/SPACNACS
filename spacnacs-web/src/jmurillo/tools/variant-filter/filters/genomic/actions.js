import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
    variantTypes: {
        clean: () => ({
            type: ActionTypes.variantTypes.CLEAN,
        }),
        add: variantType => ({
            type: ActionTypes.variantTypes.ADD,
            variantType: variantType,
        }),
        remove: variantType => ({
            type: ActionTypes.variantTypes.REMOVE,
            variantType: variantType,
        }),
    },

    genomicRegions: {
        clean: () => ({
            type: ActionTypes.genomicRegions.CLEAN,
        }),
        add: region => ({
            type: ActionTypes.genomicRegions.ADD,
            region: region,
        }),
        remove: region => ({
            type: ActionTypes.genomicRegions.REMOVE,
            region: region,
        }),
    },
});


export default Actions;
