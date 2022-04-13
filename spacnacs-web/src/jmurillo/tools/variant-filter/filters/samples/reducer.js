import ActionTypes from './action-types';
/*
function addSample(samples, sample) {
	const s = samples.find(s => sample.individualId === s.individualId || sample.sampleId === s.sampleId);
	if (undefined === s) {
		return [...samples, sample];
	} else {
		return samples.map(x => x !== s ? x : sample);
	}
}

function removeSample(samples, individualId, sampleId) {
	return samples.filter(sample => sample.individualId !== individualId || sample.sampleId !== sampleId);
}

function setSampleGenotypes(samples, individualId, sampleId, genotypes) {
	const sample = samples.find(sample => sample.individualId === individualId || sample.sampleId === sampleId);
	return samples.map(s => s !== sample ? s : { ...sample, genotypes: genotypes });
}

function addSampleGenotype(samples, individualId, sampleId, genotype) {
	const sample = samples.find(sample => sample.individualId === individualId || sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGenotypes = sample.genotypes || [];
		if (sampleGenotypes.includes(genotype)) {
			return samples;
		} else {
			const newSampleGenotypes = [...sampleGenotypes, genotype];
			return samples.map(s => sample !== s ? s : { ...sample, genotypes: newSampleGenotypes });
		}
	} else {
		return samples;
	}
}

function removeSampleGenotype(samples, individualId, sampleId, genotype) {
	const sample = samples.find(sample => sample.individualId === individualId || sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGenotypes = sample.genotypes || [];
		if (sampleGenotypes.includes(genotype)) {
			const newSampleGenotypes = sampleGenotypes.filter(gt => gt !== genotype);
			return samples.map(s => sample !== s ? s : { ...sample, genotypes: newSampleGenotypes });
		} else {
			return samples;
		}
	} else {
		return samples;
	}
}

function cleanSampleGenotypes(samples) {
	return samples.map(sample => {
		const { genotypes, ...rest } = sample;
		return rest;
	});
}

function setDefaultSampleGenotypes(samples) {
	const defaultGenotypes = ["R/A", "A/A"];
	return samples.map(sample => {
		const { genotypes, ...rest } = sample;
		return { ...rest, genotypes: defaultGenotypes };
	});
}

function addSampleGroupView(samples, individualId, sampleId, typeGroup) {
	const sample = samples.find(sample => sample.individualId === individualId && sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGroupViews = sample.typeGroups || [];
		if (sampleGroupViews.includes(typeGroup)) {
			return samples;
		} else {
			const newSampleViewGroups = [...sampleGroupViews, typeGroup];
			return samples.map(s => sample !== s ? s : { ...sample, typeGroups: newSampleViewGroups });
		}
	} else {
		return samples;
	}
}

function removeSampleGroupView(samples, individualId, sampleId, typeGroup) {
	const sample = samples.find(sample => sample.individualId === individualId && sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGroupViews = sample.typeGroups || [];
		if (sampleGroupViews.includes(typeGroup)) {
			const newSampleViewGroups = sampleGroupViews.filter(gt => gt !== typeGroup);
			return samples.map(s => sample !== s ? s : { ...sample, typeGroups: newSampleViewGroups });
		} else {
			return samples;
		}
	} else {
		return samples;
	}
}
*/
// function cleanSampleGroupView(samples) {
//     return samples.map(sample => {
//         const { typeGroups, ...rest } = sample;
//         return rest;
//     });
// }

const defaultState = {
    phenotypes:[],
    genders:[ {
            id: "XY",
            label: "Male",
        },
        {
            id: "XX",
            label: "Female",
        }],
    subpopulations:[
        /*{
            description : "I Certain infectious and parasitic diseases",
            id : 1,
            label: "I" },*/
        {
            description : "II Neoplasms",
            id : 2,
            label: "II" },
        /*{
            description : "III Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism",
            id : 3,
            label: "III" },*/
        {
            description : "IV Endocrine, nutritional and metabolic diseases",
            id : 4,
            label: "IV" },
        {
            description : "V Mental and behavioural disorders",
            id : 5,
            label: "V" },
        {
            description : "VI Diseases of the nervous system",
            id : 6,
            label: "VI" },
        {
            description : "VII Diseases of the eye and adnexa",
            id : 7,
            label: "VII" },
        {
            description : "VIII Diseases of the ear and mastoid process",
            id : 8,
            label: "VIII" },
        {
            description : "IX Diseases of the circulatory system",
            id : 9,
            label: "IX" },
        {
            description : "X Diseases of the respiratory system",
            id : 10,
            label: "X" },
        /*{
            description : "XI Diseases of the digestive system",
            id : 11,
            label: "XI" },
        {
            description : "XII Diseases of the skin and subcutaneous tissue",
            id : 12,
            label: "XII" },*/
        {
            description : "XIII Diseases of the musculoskeletal system and connective tissue",
            id : 13,
            label: "XIII" },
        /* {
             description : "XIV Diseases of the genitourinary system",
             id : 14,
             label: "XIV" },
         {
             description : "XV Pregnancy, childbirth and the puerperium",
             id : 15,
             label: "XV" },*/
        {
            description : "XVI Certain conditions originating in the perinatal period",
            id : 16,
            label: "XVI" },
        {
            description : "XVII Congenital malformations, deformations and chromosomal abnormalities",
            id : 17,
            label: "XVII" },
        {
            description : "XVIII Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified",
            id : 18,
            label: "XVII" },
        /* {
             description : "XIX Injury, poisoning and certain other consequences of external causes",
             id : 19,
             label: "XIX" },
         {
             description : "XX External causes of morbidity and mortality",
             id : 20,
             label: "XX" },
         {
             description : "XXI Factors influencing health status and contact with health services",
             id : 21,
             label: "XXI" },
         {
             description : "XXII Codes for special purposes",
             id : 22,
             label: "XXII" },

         {
             description : "MGP (267 healthy controls, Solid 5500)",
             id : 23,
             label: "MGP" },
         {
             description : "MGP (healthy controls, Solid 4)",
             id : 24,
             label: "MGP" },
         {
             description : "IBS (107 Spanish individuals from 1000genomes)",
             id : 25,
             label: "IBS" },
         {
             description : "Healthy controls",
             id : 26,
             label: "Healthy controls" },
         {
             description : "I Certain infectious and parasitic diseases (controls)",
             id : 27,
             label: "I (controls)" },
         {
             description : "II Neoplasms (controls)",
             id : 28,
             label: "II (controls)" },*/
        {
            description : "III Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism (controls)",
            id : 29,
            label: "III (controls)" },
        {
            description : "IV Endocrine, nutritional and metabolic diseases (controls)",
            id : 30,
            label: "IV (controls)" },
        {
            description : "V Mental and behavioural disorders (controls)",
            id : 31,
            label: "V (controls)" },
        {
            description : "IV Diseases of the nervous system (controls)",
            id : 32,
            label: "IV (controls)" },
        {
            description : "VII Diseases of the eye and adnexa (controls)",
            id : 33,
            label: "VII (controls)" },
        {
            description : "VIII Diseases of the ear and mastoid process (controls)",
            id : 34,
            label: "VIII (controls)" },
        {
            description : "IX Diseases of the circulatory system (controls)",
            id : 35,
            label: "IX (controls)" },
        {
            description : "X Diseases of the respiratory system (controls)",
            id : 36,
            label: "X (controls)" },
        /*{
            description : "XI Diseases of the digestive system (controls)",
            id : 37,
            label: "XI (controls)" },
        {
            description : "XII Diseases of the skin and subcutaneous tissue (controls)",
            id : 38,
            label: "XII (controls)" },*/

        {
            description : "XIII Diseases of the musculoskeletal system and connective tissue (controls)",
            id : 39,
            label: "XIII (controls)" },
        /*{
            description : "XIV Diseases of the genitourinary system (controls)",
            id : 40,
            label: "XIV (controls)" },

        {
            description : "XV Pregnancy, childbirth and the puerperium (controls)",
            id : 41,
            label: "XV (controls)" },

        {
            description : "XVI Certain conditions originating in the perinatal period (controls)",
            id : 42,
            label: "XVI (controls)" },*/
        {
            description : "XVII Congenital malformations, deformations and chromosomal abnormalities (controls)",
            id : 43,
            label: "XVII(controls)" },

        {
            description : "XVIII Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (controls)",
            id : 44,
            label: "XVIII (controls)" },
        /*{
            description : "XIX Injury, poisoning and certain other consequences of external causes (controls)",
            id : 45,
            label: "XIX (controls)" },
        {
            description : "XX External causes of morbidity and mortality (controls)",
            id : 46,
            label:"XX (controls)" },
        {
            description : "XXI Factors influencing health status and contact with health services (controls)",
            id : 47,
            label: "XXI (controls)" }
        {
            description : "XXII Codes for special purposes (controls)",
            id : 48,
            label: "XXII (controls)" },*/
    ]
};


function reducer(state = defaultState, action) {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return   {
            ...state,
            genders:[],
            phenotypesSample: [],
            subpopulations:[]
        };
		/*case ActionTypes.SET_SAMPLES:
			return action.samples || [];*/
	/*	case ActionTypes.ADD_SAMPLE:
			return addSample(state, action.sample);
		case ActionTypes.REMOVE_SAMPLE:
			return removeSample(state, action.individualId, action.sampleId);
		case ActionTypes.CLEAN_SAMPLE_GENOTYPES:
			return cleanSampleGenotypes(state);
		case ActionTypes.SET_DEFAULT_SAMPLE_GENOTYPES:
			return setDefaultSampleGenotypes(state);
		case ActionTypes.SET_SAMPLE_GENOTYPES:
			return setSampleGenotypes(state, action.individualId, action.sampleId, action.genotypes);
		case ActionTypes.ADD_SAMPLE_GENOTYPE:
			return addSampleGenotype(state, action.individualId, action.sampleId, action.genotype);
		case ActionTypes.REMOVE_SAMPLE_GENOTYPE:
			return removeSampleGenotype(state, action.individualId, action.sampleId, action.genotype);


		case ActionTypes.CLEAN_SAMPLE_GROUP_VIEW:
			return cleanSampleGenotypes(state);
		case ActionTypes.ADD_SAMPLE_GROUP_VIEW:
			return addSampleGroupView(state, action.individualId, action.sampleId, action.typeGroup);
		case ActionTypes.REMOVE_SAMPLE_GROUP_VIEW:
			return removeSampleGroupView(state, action.individualId, action.sampleId, action.typeGroup);
*/

        case ActionTypes.SET_SAMPLE_PHENOTYPE:
            return {
                ...state,
                phenotypesSample: [action.phenotype],
            };
        case ActionTypes.ADD_SAMPLE_PHENOTYPE:
            /*return state.genomicRegions.some(region => region.chromosome === action.region.chromosome &&
                region.start === action.region.start &&
                region.end === action.region.end) ? state : {
                    ...state,
                    genomicRegions: [...state.genomicRegions, action.region],
                };*/
            return {
                ...state,
                phenotypesSample:[action.phenotype]
            }
        case ActionTypes.REMOVE_SAMPLE_PHENOTYPE:
            return !state.phenotypesSample.includes(action.phenotype) ? state : {
                ...state,
                phenotypesSample: state.phenotypesSample.filter(term => term.id !== action.phenotype.id),
            };


        case ActionTypes.SET_SAMPLE_GENDER:
            return {
                ...state,
                genders: [action.gender],
            };



        case ActionTypes.ADD_SAMPLE_GENDER:
            return state.genders.some(g => g.id === action.gender.id) ? state : {
                    ...state,
                genders: [...state.genders, action.gender],
                };
        case ActionTypes.REMOVE_SAMPLE_GENDER:
            return !state.genders.find(g => g.id === action.gender.id) ? state : {
                ...state,
                genders: state.genders.filter(g => g.id !== action.gender.id),
            };



        case ActionTypes.CLEAN_SAMPLE_SUBPOPULATION:
            return {
                ...state,
                subpopulations: [],
            };

        case ActionTypes.SET_SAMPLE_SUBPOPULATION:
            return {
                ...state,
                subpopulations: [action.subpopulation],
            };
        case ActionTypes.ADD_SAMPLE_SUBPOPULATION:
            return state.subpopulations.find(s => s.id === action.subpopulation.id) ? state : {
                    ...state,
                subpopulations: [...state.subpopulations, action.subpopulation],
                };

        case ActionTypes.REMOVE_SAMPLE_SUBPOPULATION:
            return !state.subpopulations.find(s => s.id === action.subpopulation.id) ? state : {
                ...state,
                subpopulations: state.subpopulations.filter(s => s.id !== action.subpopulation.id),
            };

		default:
			return state;
	}
};

export default reducer;
