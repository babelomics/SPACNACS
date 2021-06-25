import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}vcf-metrics.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	SET: PREFIX + "set",
	ADD: PREFIX + "add",
	REMOVE: PREFIX + "remove",
});


export default ActionTypes;