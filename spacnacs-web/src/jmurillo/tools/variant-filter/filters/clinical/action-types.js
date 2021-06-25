import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}clinical.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	phenotypes: Object.freeze({
		CLEAN: PREFIX + "phenotypes.clean",
		ADD: PREFIX + "phenotypes.add",
		REMOVE: PREFIX + "phenotypes.remove",
	}),
	clinvars: Object.freeze({
		CLEAN: PREFIX + "clinvars.clean",
		ADD: PREFIX + "clinvars.add",
		REMOVE: PREFIX + "clinvars.remove",
	}),


});


export default ActionTypes;