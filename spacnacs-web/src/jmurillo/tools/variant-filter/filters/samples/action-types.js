import FilterActionTypes from '../../action-types';


const PREFIX = `${FilterActionTypes.PREFIX}samples.`;


const ActionTypes = Object.freeze({
	CLEAN: PREFIX + "clean",
/*
    CLEAN_SAMPLE_GENOTYPES: PREFIX + "clean-sample-genotypes",
    SET_DEFAULT_SAMPLE_GENOTYPES: PREFIX + "set-default-sample-genotypes",*/

	SET_SAMPLE_PHENOTYPE: PREFIX + "set-sample-phenotype",
	ADD_SAMPLE_PHENOTYPE: PREFIX + "add-sample-phenotype",
	REMOVE_SAMPLE_PHENOTYPE: PREFIX + "remove-sample-phenotype",

	SET_SAMPLE_GENDER: PREFIX + "set-sample-gender",
	ADD_SAMPLE_GENDER: PREFIX + "add-sample-gender",
	REMOVE_SAMPLE_GENDER: PREFIX + "remove-sample-gender",


    CLEAN_SAMPLE_SUBPOPULATION: PREFIX + "clean-sample-subpopulation",
    SET_SAMPLE_SUBPOPULATION: PREFIX + "set-sample-subpopulation",
    ADD_SAMPLE_SUBPOPULATION: PREFIX + "add-sample-subpopulation",
    REMOVE_SAMPLE_SUBPOPULATION: PREFIX + "remove-sample-subpopulation",
});


export default ActionTypes;