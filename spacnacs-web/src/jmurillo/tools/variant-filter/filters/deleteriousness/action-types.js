import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}deleteriousness.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
	SET_SIFT: PREFIX + "pss.set-sift",
	REMOVE_SIFT: PREFIX + "pss.remove-sift",
	SET_POLYPHEN: PREFIX + "pss.set-polyphen",
	REMOVE_POLYPHEN: PREFIX + "pss.remove-polyphen",
	SET_CADD_RAW: PREFIX + "cadd.raw.set",
	SET_CADD_SCALED: PREFIX + "cadd.scaled.set",
});


export default ActionTypes;