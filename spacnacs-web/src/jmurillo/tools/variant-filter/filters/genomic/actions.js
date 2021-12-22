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


    sequencingTypes: {
        clean: () => ({
            type: ActionTypes.sequencingTypes.CLEAN,
        }),
        add: sequencingType => ({
            type: ActionTypes.sequencingTypes.ADD,
            sequencingType: sequencingType,
        }),
        remove: sequencingType => ({
            type: ActionTypes.sequencingTypes.REMOVE,
            sequencingType: sequencingType,
        }),
    },

    pipeline: {
        clean: () => ({
            type: ActionTypes.pipeline.CLEAN,
        }),
        add: pipeline => ({
            type: ActionTypes.pipeline.ADD,
            pipeline: pipeline,
        }),
    },

});


export default Actions;
