import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}search.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
    CLEAN_ANNOTATION_FIELD: PREFIX + "clean-annotation-field",
    CLEAN_GENE: PREFIX + "clean-gene",

    SET: PREFIX + "set",
	ADD: PREFIX + "add",
	REMOVE: PREFIX + "remove",

    SET_SORT: PREFIX + "set-sort",
    ADD_SORT: PREFIX + "add-sort",
    REMOVE_SORT: PREFIX + "remove-sort",

});


export default ActionTypes;