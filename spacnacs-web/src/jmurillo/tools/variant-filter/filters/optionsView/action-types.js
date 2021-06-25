import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}optionsView.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	SET_SELECTED_VIEW: PREFIX + "set-selected-view",
    ADD_HIDDEN: PREFIX + "add-hidden",
    REMOVE_HIDDEN: PREFIX + "remove-hidden",
});


export default ActionTypes;