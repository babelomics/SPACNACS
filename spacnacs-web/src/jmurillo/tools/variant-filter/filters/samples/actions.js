import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),

		/*setSamples: samples => ({
		type: ActionTypes.SET_SAMPLES,
		samples: samples,
	}),
	addSample: sample => ({
		type: ActionTypes.ADD_SAMPLE,
		sample: sample,
	}),
	removeSample: (individualId, sampleId) => ({
		type: ActionTypes.REMOVE_SAMPLE,
		individualId: individualId,
		sampleId: sampleId,
	}),
	cleanSampleGenotypes: () => ({
		type: ActionTypes.CLEAN_SAMPLE_GENOTYPES,
	}),
	setDefaultSampleGenotypes: () => ({
		type: ActionTypes.SET_DEFAULT_SAMPLE_GENOTYPES,
	}),*/

    phenotypes:{
        set: (newSearch) => ({
            type: ActionTypes.SET_SAMPLE_PHENOTYPE,
            phenotype: newSearch
        }),
        add: (searchTerm) => ({
            type: ActionTypes.ADD_SAMPLE_PHENOTYPE,
            phenotype: searchTerm
        }),
        remove: (searchTerm) => ({
            type: ActionTypes.REMOVE_SAMPLE_PHENOTYPE,
            phenotype: searchTerm,
        }),
    },

    genders:{
        set: (gender) => ({
            type: ActionTypes.SET_SAMPLE_GENDER,
            gender: gender,
        }),
        add: (gender) => ({
            type: ActionTypes.ADD_SAMPLE_GENDER,
            gender: gender,
        }),
        remove: (gender) => ({
            type: ActionTypes.REMOVE_SAMPLE_GENDER,
            gender: gender,
        }),
    },


    subpopulations:{
        clear: (subpopulation) => ({
            type: ActionTypes.CLEAN_SAMPLE_SUBPOPULATION,
        }),
        set: (subpopulation) => ({
            type: ActionTypes.SET_SAMPLE_SUBPOPULATION,
            subpopulation: subpopulation,
        }),
        add: (subpopulation) => ({
            type: ActionTypes.ADD_SAMPLE_SUBPOPULATION,
            subpopulation: subpopulation,
        }),
        remove: (subpopulation) => ({
            type: ActionTypes.REMOVE_SAMPLE_SUBPOPULATION,
            subpopulation: subpopulation,
        }),
    },

});


export default Actions;
