import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}genomic.`;


const ActionTypes = Object.freeze({
    CLEAN: PREFIX + "clean",
    variantTypes: Object.freeze({
        CLEAN: PREFIX + "variantTypes.clean",
        ADD: PREFIX + "variantTypes.add",
        REMOVE: PREFIX + "variantTypes.remove",
    }),
    genomicRegions: Object.freeze({
        CLEAN: PREFIX + "genomicRegions.clean",
        ADD: PREFIX + "genomicRegions.add",
        REMOVE: PREFIX + "genomicRegions.remove",
    }),
});


export default ActionTypes;